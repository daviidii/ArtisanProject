import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState();
  const [basketTotal, setBasketTotal] = useState(0);
  const [basketQuantity, setBasketQuantity] = useState(0);

  const [basketTrigger, setBasketTrigger] = useState(false);
  // SET BASKET TOTAL AMOUNT
  useEffect(() => {
    setBasketTotal(
      (basketItems ?? []).reduce(
        (total, item) => total + item.item_totalprice,
        0
      )
    );
  }, [basketItems]);

  // SET BASKET QUANTITY
  useEffect(() => {
    setBasketQuantity(
      (basketItems ?? []).reduce((count, item) => count + item.item_quantity, 0)
    );
  }, [basketItems]);

  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
    });
  };

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const res = await axios.get("http://localhost:8800/basket/get");
        setBasketItems(res.data.basket);
        console.log("useEffect on basket");
      } catch (error) {
        console.log(error);
      }
    };
    fetchBasket();
  }, [basketTrigger]);

  const addToBasket = async (item) => {
    try {
      const product = {
        ...item,
        item_quantity: 1,
        item_totalprice: item.product_price,
      };

      // console.log(product);
      const res = await axios.post("http://localhost:8800/basket/add", product);

      if (res.data.added) {
        console.log("added to session");
        setBasketTrigger((prev) => !prev);
      } else if (!res.data.added) {
        console.log("not added to session");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (id, newCount) => {
    try {
      // Call your backend to update the item_quantity
      const res = await axios.put(`http://localhost:8800/basket/update/${id}`, {
        item_quantity: newCount,
      });

      if (res.data.updated) {
        console.log(`Item ${id} quantity updated to ${newCount}`);
        setBasketTrigger((prev) => !prev);
      } else {
        console.log(`Failed to update item ${id} quantity`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromBasket = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8800/basket/delete/${id}`
      );

      if (res.data.deleted) {
        console.log(`Successfully deleted product ${id}`);
        setBasketTrigger((prev) => !prev);
      } else {
        console.log(`Unable to delete product ${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BasketContext.Provider
      value={{
        addToBasket,
        basketItems,
        basketTotal,
        basketQuantity,
        removeFromBasket,
        updateItem,
        formatCurrency,
        setBasketItems,
        setBasketTrigger,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  return useContext(BasketContext);
};
