import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../Utilities/ProductCard";

export default function Hero() {
  axios.defaults.withCredentials = true;
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const fetchAllFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:8800/favorites");
        setFavorites(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllFavorites();
  }, []);

  return (
    <section className="container-fluid hero">
      <div className="container-fluid">
        <div className="row hero__heading">
          <div className="col d-flex flex-column text-center align-items-center hero__body">
            <h2 className="hero__header">craftsmanship meets inspirations</h2>
            <h3 className="hero__subheader">everypiece is a masterpiece</h3>

            <Link to="/shop" className="btn-oval hero__link">
              shop all
            </Link>
          </div>
        </div>
        <div className="row favorites">
          <div className="col-xl-3 col-lg-6 favorites__card">
            <div className="d-flex flex-column favorites__body">
              <h3 className="favorites__title">favorites</h3>
              <p className="favorites__subtitle">
                We have made a selection of our customers favorite products
              </p>

              <div className="link-btn favorites__link-btn">
                <Link to="/shop" className="favorites__link">
                  See All
                </Link>
              </div>
            </div>
          </div>
          {favorites.map((fav) => (
            <ProductCard key={fav.product_id} product={fav} />
          ))}
        </div>
      </div>
    </section>
  );
}
