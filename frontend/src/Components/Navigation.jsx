import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import { useBasket } from "../Context/BasketContext";
// import axios from "axios";

export default function Navigation() {
  const { isLoggedIn } = useAuth();
  const { setBasketTrigger } = useBasket();
  const [isSticky, setSticky] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingUp = currentScrollPos < prevScrollPos;

      if (currentScrollPos > 113) {
        setSticky(true);

        if (scrollingUp) {
          setIsScrollingUp(true);
          // console.log(isScrollingUp);
        } else {
          setIsScrollingUp(false);
          // console.log(isScrollingUp);
        }
      } else {
        setSticky(false);
      }

      setPrevScrollPos(currentScrollPos);
      // console.log(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, isSticky, isScrollingUp]);

  const handleBasketClick = () => {
    setBasketTrigger((prev) => !prev);
  };
  return (
    <header
      className={`container-fluid navigation ${isSticky ? "offset" : ""}`}
    >
      <div className="navigation__heading text-center">
        <h1 className="heading-primary navigation__title">artisan</h1>
      </div>
      <nav
        className={`container-fluid navbar navbar-expand-lg navigation__navbar ${
          isSticky ? "sticky" : ""
        } ${isScrollingUp && isSticky ? "hidden" : "visible"}`}
      >
        <div className="d-flex flex-column navigation__wrapper">
          <div className="w-100 mw-1440">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#nav-offcanvas"
              aria-controls="nav-offcanvas"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse navigation__collapse-nav mw-1440">
              <ul className="navbar-nav navigation__list">
                <li className="nav-item navigation__item">
                  <NavLink to="/" className="nav-link navigation__link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item navigation__item">
                  <NavLink
                    to="collections"
                    className="nav-link navigation__link"
                  >
                    Collections
                  </NavLink>
                </li>
                <li className="nav-item navigation__item">
                  <NavLink to="shop" className="nav-link navigation__link">
                    Shop
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav navigation__list">
                <li className="nav-item navigation__item">
                  <NavLink
                    to={isLoggedIn ? "profile/information" : "login"}
                    className="nav-link navigation__link"
                  >
                    {isLoggedIn ? "Account" : "Login"}
                  </NavLink>
                </li>
                <li className="nav-item navigation__item">
                  <button
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvas-basket"
                    aria-controls="offcanvas-basket"
                    className="nav-link navigation__link"
                    onClick={handleBasketClick}
                  >
                    Basket
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
