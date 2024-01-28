import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="container-fluid mw-1440">
      <div className="row footer">
        <div className="col-xl-6 col-sm-12 footer__headline">
          <div className="d-flex flex-column h-100">
            <h2 className="footer__title">artisan</h2>

            <div className="d-md-flex mt-auto">
              <Link to="/" className="footer__terms">
                terms and conditions
              </Link>
              <span className="footer__copy ms-md-5">
                {"\u00A9"} Artisan. All rights reserved
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-xl-2 col-sm-12 footer__map mt-xxl-0 mt-5">
          <h3 className="footer__header">map</h3>
          <ul className="d-flex flex-column footer__list">
            <li className="footer__item">
              <Link className="footer__link" to="/">
                Shop
              </Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/">
                Blogs
              </Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/">
                Collection
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-4 col-xl-2 col-sm-12 footer__socials mt-xxl-0 mt-5">
          <h3 className="footer__header">socials</h3>
          <ul className="d-flex flex-column footer__list">
            <li className="footer__item">
              <Link className="footer__link" to="/">
                Tiktok
              </Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/">
                Instagram
              </Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/">
                Facebook
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-4 col-xl-2 col-sm-12 footer__contacts mt-xxl-0 mt-5">
          <h3 className="footer__header">contacts</h3>
          <ul className="d-flex flex-column footer__list">
            <li className="footer__item">
              <Link className="footer__link" to="tel:639065905034">
                +63 906-590-5034
              </Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="mailto:ahc@ahc.com">
                ahc@ahc.com
              </Link>
            </li>
            <li className="footer__item">
              <address>Caloocan city, Metro Manila, 1425</address>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
