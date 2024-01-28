// import { useState } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Newsletter() {
  const [email, setEmail] = useState({
    newsletter_email: "",
  });

  const handleChange = (e) => {
    setEmail({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.get(
        "http://localhost:8800/newsletter/check/" + email
      );

      if (res.data.IsEmailExist) {
        console.log(email);
        console.log("exist");
      } else {
        await axios.post("http://localhost:8800/newsletter", email);
        setEmail({ newsletter_email: "" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="container-fluid mw-1440">
      <div className="newsletter">
        <div className="newsletter__body d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column h-100 justify-content-around">
            <div className="d-flex newsletter__top">
              <h2 className="newsletter__title">
                exclusive news {"\u0026"} offers
              </h2>
              <div className="newsletter__inquries">
                <h3 className="heading-tertiary newsletter__inq">
                  for any inquiries, contact us:
                </h3>
                <ul className="d-flex flex-column newsletter__list">
                  <li className="newsletter__info-item">
                    <Link to="mailto:ahc@artisan.com">ahc@artisan.com</Link>
                  </li>
                  <li className="newsletter__info-item">
                    <Link to="tel:+639065905034" className="newsletter__phone">
                      +63 906-590-5034
                    </Link>
                  </li>
                  <li className="newsletter__info-item">
                    <address>Caloocan city, Metro Manila, 1425</address>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-flex flex-column newsletter__bottom">
              <h2 className="newsletter__subheading">
                Subscribe to our newsletter
              </h2>
              <form
                onSubmit={handleSubmit}
                className="input-group newsletter__form"
              >
                <input
                  type="email"
                  className="form-control newsletter__input"
                  placeholder="email address"
                  onChange={handleChange}
                  value={email.newsletter_email}
                  name="newsletter_email"
                  required
                ></input>
                <button className="newsletter__submit" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
