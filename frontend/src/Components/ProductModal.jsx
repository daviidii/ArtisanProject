import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";

const Product = ({ product }) => {
  // const imagePath = `../Assets/ProductImages/${product.product_img}`;
  return (
    <div className="modal-body product-modal__body">
      <div className="row">
        <div className="col-lg-6">
          <div className="d-flex h-100 product-modal__box">
            <div className="d-flex">
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <h2 className="product-modal__title">
                    {product.product_name}
                  </h2>
                  <span className="product-modal__stock">
                    Items in stock: {product.product_quantity}
                  </span>
                </div>

                <p className="product-modal__description">
                  {product.product_details}
                </p>

                <span className="product-modal__price">
                  {"\u20B1"}
                  {product.product_price.toFixed(2)}php
                </span>

                <div className="d-flex mt-auto">
                  <button className="product-modal__btn product-modal__buy">
                    Buy now
                  </button>
                  <button className="product-modal__btn product-modal__add">
                    Add to basket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="product-modal__img-box">
            <img
              src={product.product_img}
              alt={product.product_name}
              className="product-modal__img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Error = () => (
  <div className="modal-body product-modal__body">
    <div className="row">
      <div className="col-lg-6">
        <div className="d-flex">
          <div className="d-flex">
            <div className="d-flex flex-column">
              <h2 className="product-modal__title">No Selected Product</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">No Selected Product</div>
    </div>
  </div>
);

export default function ProductModal() {
  const { selectedProduct } = useContext(ProductContext);
  //   const imagePath = `../Assets/ProductImages/${selectedProduct.product_img}`;
  return (
    <div
      className="modal fade product-modal"
      id="product-modal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered product-modal__dialog">
        <div className="modal-content product-modal__content">
          <div className="modal-header product-modal__header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {selectedProduct ? <Product product={selectedProduct} /> : <Error />}
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
}
