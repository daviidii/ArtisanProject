import iconPath from "../Assets/Icons/right-arr-icon.svg";
export default function Categories() {
  return (
    <section className="container-fluid categories cont">
      <div className="row categories__wrapper">
        <div className="col-xl-4 col-xs-12 categories__cat-1">
          <div className="d-flex flex-column categories__body">
            <h2 className="heading-secondary categories__title">Vases</h2>
            <a href="/" className="categories__icon-wrapper">
              <img src={iconPath} alt="" className="categories__icon" />
            </a>
          </div>
        </div>
        <div className="col-xl-4 col-xs-12 categories__cat-2">
          <div className="d-flex flex-column categories__body">
            <h2 className="heading-secondary categories__title">Candles</h2>
            <a href="/" className="categories__icon-wrapper">
              <img src={iconPath} alt="" className="categories__icon" />
            </a>
          </div>
        </div>
        <div className="col-xl-4 col-xs-12 categories__cat-3">
          <div className="d-flex flex-column categories__body">
            <h2 className="heading-secondary categories__title">Ceramics</h2>
            <a href="/" className="categories__icon-wrapper">
              <img src={iconPath} alt="" className="categories__icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
