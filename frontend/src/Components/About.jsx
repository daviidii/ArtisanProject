import AboutImage from "../Assets/LandingImages/about-img.jpg";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <section className="container-fluid about cont">
      <div className="row about__row">
        <div className="col-xl-4 about__main-content">
          <div className="d-flex flex-column about__main-content-wrapper">
            <h2 className=" about__heading">about us</h2>
            <p className="about__main-text">
              At Artisan, we believe in the power of craftsmanship to elevate
              the everyday. Born out of a passion for timeless artistry and a
              commitment to curated excellence, Artisan is your gateway to a
              world of handcrafted wonders. We traverse the globe to unearth
              unique vases, scented candles, and artisanal creations that
              reflect the skill and imagination of master craftsmen.
            </p>
            <div className="link-btn about__link-btn">
              <Link to="/shop" className="about__link">
                See All
              </Link>
            </div>
          </div>
        </div>
        <div className="col-xl-8 about__img-container">
          <img src={AboutImage} alt="pottery" className="about__img" />
        </div>
      </div>
      <div className="row about__row">
        <div className="col-xl-4">
          <div className="d-flex flex-column about__body">
            <h2 className=" about__heading">curated exellence</h2>
            <p className="about__text">
              Each piece is selected for its exceptional craftsmanship, unique
              design, and the story it brings to your living space. Our
              commitment to quality ensures that every item in our catalog
              reflects the highest standards of artistry and aesthetic appeal.{" "}
            </p>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="d-flex flex-column about__body">
            <h2 className=" about__heading">artisanal stories</h2>
            <p className="about__text">
              Every product at Artisan comes with a narrative — a tale of the
              skilled artisans who poured their passion into creating it.
              Discover the stories behind the creations and connect with the
              rich traditions and creativity embedded in each piece.
            </p>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="d-flex flex-column about__body">
            <h2 className=" about__heading">transformative elegance</h2>
            <p className="about__text">
              Our handpicked collection is designed to enhance your
              surroundings, adding a touch of sophistication to your home.
              Artisan provides the key to elevating your interior decor with
              pieces that go beyond mere functionality – they are expressions of
              style and refinement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
