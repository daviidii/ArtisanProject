import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";
import cookieParser from "cookie-parser";
import MySQLStore from "express-mysql-session";

const store = MySQLStore(session);

const app = express();

// MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.listen(8800, () => {
  console.log("listening to port 8800");
});

// ENABLE ACCESS POINT TO DB
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Saltyshima12!!",
  database: "marketplace",
});

const sessionStore = new store(
  {
    expiration: 604800000,
    createDatabaseTable: true,
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "sesssion_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  db
);

app.use(
  session({
    secret: "samdalri",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 604800000, // 1 day in milliseconds
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    },
  })
);

app.get("/", (req, res) => {
  if (req.session.user) {
    return res.json({
      isSessionValid: true,
      user: req.session.user,
    });
  } else {
    return res.json({
      isSessionValid: false,
    });
  }
});

// FETCH ALL DATA FROM favorites TABLE
app.get("/favorites", (req, res) => {
  const q =
    "SELECT f.fav_id, f.product_id, p.product_name, p.product_quantity, p.product_details, p.product_price, p.product_img FROM favorites f JOIN products p ON f.product_id = p.product_id ORDER BY RAND() LIMIT 3";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// FETCH ALL DATA FROM blog TABLE
app.get("/blogs", (req, res) => {
  const q = "SELECT * FROM blogs ORDER BY RAND() LIMIT 2";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

//CHECK IF THE EMAIL EXISTS IN THE NEWSLETTER TABLE
app.get("/newsletter/check/:email", (req, res) => {
  const email = req.params.email;
  const q =
    "SELECT EXISTS (SELECT 1 FROM newsletter WHERE newsletter_email = ?) AS email_exists";

  db.query(q, [email], (err, data) => {
    if (err) return res.json(err);

    const IsEmailExist = data[0].email_exists > 0;
    return res.json({ IsEmailExist });
  });
});

// SUBMIT USER EMAIL INPUT TO DATABASE
app.post("/newsletter", (req, res) => {
  const q = "INSERT INTO newsletter(`newsletter_email`) VALUES (?)";
  const values = [req.body.newsletter_email];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/products/all", (req, res) => {
  const q = "SELECT * FROM products";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// FETCH ALL DATA FROM products TABLE depending on their collection
app.get("/products/:collection", (req, res) => {
  const { collection } = req.params;
  const q = "SELECT * FROM products WHERE product_collection = ?";

  db.query(q, [collection], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// INSERT USER DATA FOR REGISTRATION
app.post("/register", async (req, res) => {
  const checkEmailquery =
    "SELECT COUNT (*) AS count FROM users WHERE user_email = ?";

  const q =
    "INSERT INTO users (`user_fname`,`user_lname`,`user_email`,`user_passwordHash`) VALUES (?)";
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    hashedPassword,
  ];

  db.query(checkEmailquery, values[2], (err, data) => {
    if (err) return res.json(err);

    const isEmailExists = data[0].count > 0;
    if (isEmailExists) {
      return res.json({ isEmailExists });
    } else {
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    }
  });
});

// LOGIN
app.post("/login", (req, res) => {
  const q = "SELECT * FROM users WHERE user_email = ?";
  const values = [req.body.email];
  const passwordInput = req.body.password;

  db.query(q, values, async (err, data) => {
    if (err) return res.json(err);

    if (data.length === 0) return res.json({ error: "Account doesn't exist" });

    const storedPassword = data[0].user_passwordHash;
    const isPasswordValid = await bcrypt.compare(passwordInput, storedPassword);

    if (isPasswordValid) {
      const returnData = {
        user_id: data[0].user_id,
        user_fname: data[0].user_fname,
        user_lname: data[0].user_lname,
        user_email: data[0].user_email,
      };
      req.session.user = returnData;
      return res.json({ success: true, user: returnData });
    } else {
      return res.json({ error: "Incorrect email or password" });
    }
  });
});

//LOGOUT
app.use("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.json({ logout: true });
    }
  });
});

app.put("/user/update/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const newUser = req.body;

  const columns = Object.keys(newUser).map((column) => {
    return `${column} = ?`;
  });
  const q = `UPDATE users SET ${columns.join(", ")} WHERE user_id = ?`;
  const values = [...Object.values(newUser), userId];

  db.query(q, values, (err, data) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        return res
          .status(400)
          .json({ error: "Duplicate entry. Email or phone already exists." });
      }
      return res.json(err);
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    //Apply changes to the session.
    req.session.user = { ...newUser, user_id: userId };

    return res.json({
      success: true,
      updatedInfo: { ...newUser, userId },
    });
  });
});

app.get("/address/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const q = "SELECT * FROM addresses WHERE user_id = ?";

  db.query(q, user_id, (err, data) => {
    if (err) return res.json(err);

    data.forEach((row) => {
      row.is_default = Boolean(row.is_default && row.is_default.readUInt8(0));
    });

    return res.json(data);
  });
});

// ADD ADDRESS
app.post("/address/add/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const data = req.body;
  const q =
    "INSERT INTO addresses(`user_id`, `addr_street`, `addr_barangay`, `addr_city`, `addr_province`, `addr_zip`, `addr_country`) VALUES (?)";
  const values = [
    user_id,
    data.addr_street,
    data.addr_barangay,
    data.addr_city,
    data.addr_province,
    data.addr_zip,
    data.addr_country,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);

    return res.json({ AddedToDb: true });
  });
});

app.put("/address/update/:user_id/:addr_id", (req, res) => {
  const user_id = req.params.user_id;
  const addr_id = req.params.addr_id;
  const data = req.body;
  const columns = Object.keys(data).map((column) => {
    return `${column} = ?`;
  });
  const q = `UPDATE addresses SET ${columns.join(
    ", "
  )} WHERE user_id = ? AND addr_id = ?`;
  const values = [...Object.values(data), user_id, addr_id];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);

    return res.json({ updated: true });
  });
});

app.delete("/address/delete/:user_id/:addr_id", (req, res) => {
  const user_id = req.params.user_id;
  const addr_id = req.params.addr_id;

  const q = "DELETE FROM addresses WHERE addr_id = ? AND user_id = ?";

  db.query(q, [addr_id, user_id], (err, data) => {
    if (err) return res.json(err);

    return res.json({ deleted: true });
  });
});

// PRODUCT PROCESS
app.post("/basket/add", (req, res) => {
  req.session.userBasket = req.session.userBasket || [];
  const product = req.body;

  const productExist = req.session.userBasket.find(
    (item) => item.product_id === product.product_id
  );

  if (productExist) {
    return res.json({ added: false });
  } else {
    req.session.userBasket.push(product);
    return res.json({ added: true });
  }
});

app.get("/basket/get", (req, res) => {
  return res.json({ basket: req.session.userBasket });
});

app.put("/basket/update/:id", (req, res) => {
  const productId = req.params.id;
  const newCount = req.body.item_quantity;
  const productIndex = req.session.userBasket.findIndex(
    (item) => item.product_id == productId
  );

  if (productIndex !== -1) {
    req.session.userBasket[productIndex].item_quantity = newCount;
    req.session.userBasket[productIndex].item_totalprice =
      req.session.userBasket[productIndex].product_price * newCount;
    return res.json({ updated: true });
  } else {
    return res.json({ updated: false });
  }
});

app.delete("/basket/delete/:id", (req, res) => {
  const productId = req.params.id;

  const productIndex = req.session.userBasket.findIndex(
    (item) => item.product_id == productId
  );

  if (productIndex !== -1) {
    req.session.userBasket.splice(productIndex, 1);
    return res.json({ deleted: true });
  } else {
    return res.json({ deleted: false });
  }
});

app.post("/basket/checkout", (req, res) => {
  const address = req.body.address;
  const userId = req.session.user ? req.session.user.user_id : null;
  const { basketTotal, basketQuantity } = req.body;
  if (userId) {
    const orderQuery =
      "INSERT INTO order_details(`user_id`, `addr_id`, `order_quantity`, `order_totalprice`) VALUES (?)";
    const itemQuery =
      "INSERT INTO order_items(`product_id`,`order_id`,`item_quantity`,`item_totalprice`) VALUES (?)";

    const orderValues = [userId, address.addr_id, basketQuantity, basketTotal];
    db.query(orderQuery, [orderValues], (err, orderResponse) => {
      if (err) return res.json(err);

      const order_id = orderResponse.insertId;
      req.session.userBasket.forEach((product) => {
        const itemValues = [
          product.product_id,
          order_id,
          product.item_quantity,
          product.item_totalprice,
        ];
        db.query(itemQuery, [itemValues], (err, data) => {
          if (err) return res.json(err);
        });
      });
      req.session.userBasket = [];
      return res.json({ checkout: true });
    });
  } else {
    return res.status(401).json({ error: "User not authenticated" });
  }
});

app.get("/user/transactions/:user_id", (req, res) => {
  const userId = req.params.user_id;

  const query = `
    SELECT
    od.user_id,
    od.order_totalprice,
    od.order_quantity,
    od.created_at,
    od.addr_id,
    oi.order_id,
    oi.item_id,
    oi.product_id,
    oi.item_quantity,
    oi.item_totalprice,
    p.product_name,
    p.product_img
FROM
    order_details od
JOIN
    order_items oi ON od.order_id = oi.order_id
JOIN
    products p ON oi.product_id = p.product_id
WHERE
    od.user_id = ?;
  `;

  db.query(query, [userId], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: err });
    }
    return res.json(data);
  });
});
