import { Link } from "react-router-dom";
import iconPath from "../Assets/Icons/right-arr-icon.svg";

export default function Collections() {
  return (
    <section className="container-fluid collections">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 collections__item">
            <div className="collections__bg collections__bg--1">
              <div className="d-flex flex-column justify-content-center align-items-center text-center collections__body">
                <Link to="tc" className="heading-secondary collections__title">
                  Timeless Craftsmanship
                </Link>
                <Link to="tc" className="collections__icon-wrapper">
                  <img src={iconPath} alt="" className="collections__icon" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 collections__item">
            <div className="collections__bg collections__bg--2">
              <div className="d-flex flex-column justify-content-center align-items-center text-center collections__body">
                <Link to="eus" className="heading-secondary collections__title">
                  Elegance Unveiled Series
                </Link>
                <Link to="eus" className="collections__icon-wrapper">
                  <img src={iconPath} alt="" className="collections__icon" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 collections__item">
            <div className="collections__bg collections__bg--3">
              <div className="d-flex flex-column justify-content-center align-items-center text-center collections__body">
                <Link to="npe" className="heading-secondary collections__title">
                  Nature's Palette Ensemble
                </Link>
                <Link to="npe" className="collections__icon-wrapper">
                  <img src={iconPath} alt="" className="collections__icon" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 collections__item">
            <div className="collections__bg collections__bg--4">
              <div className="d-flex flex-column justify-content-center align-items-center text-center collections__body">
                <Link to="gas" className="heading-secondary collections__title">
                  Global Artisan Showcase
                </Link>
                <Link to="gas" className="collections__icon-wrapper">
                  <img src={iconPath} alt="" className="collections__icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
