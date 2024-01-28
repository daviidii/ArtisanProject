import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { BasketContext, useBasket } from "../Context/BasketContext";

export default function ProductCard({ product }) {
  const { formatCurrency } = useBasket();
  const { setProduct } = useContext(ProductContext);
  const { addToBasket } = useContext(BasketContext);

  const handleClick = () => {
    setProduct(product);
  };

  const handleAddToBasket = () => {
    addToBasket(product);
  };

  // const imagePath = `../Assets/ProductImages/${product.product_img}`;
  return (
    <div className="col-xl-3 col-sm-6 d-flex flex-column product-item mb-5">
      <button
        data-bs-toggle="modal"
        data-bs-target="#product-modal"
        className="product-item__img-box mb-3"
        onClick={handleClick}
      >
        <img
          className="product-item__img"
          src={product.product_img}
          alt={product.product_name}
        />
      </button>

      <div className="product-item__body d-flex flex-column">
        <button
          data-bs-toggle="modal"
          data-bs-target="#product-modal"
          className="product-item__name"
          onClick={handleClick}
        >
          {product.product_name}
        </button>
        <span className="product-item__price">
          {formatCurrency(product.product_price)}
        </span>
        <div>
          <button
            onClick={handleAddToBasket}
            className="product-item__btn btn-text mt-3"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvas-basket"
            aria-controls="offcanvas-basket"
          >
            Add to basket
          </button>
        </div>
      </div>
    </div>
  );
}
