import { useBasket } from "../Context/BasketContext";

export default function OrderSummary({ product }) {
  const { formatCurrency } = useBasket();
  // const imagePath = `../Assets/ProductImages/${product.product_img}`;
  return (
    <div className="row order-item ">
      <div className="col-6 order-item__img-box">
        <img
          src={product.product_img}
          alt={product.product_name}
          className="order-item__img"
        />
      </div>
      <div className="col order-item__content d-flex justify-content-between">
        <div className="d-flex flex-column ms-3">
          <h3 className="order-item__product-name">{product.product_name}</h3>
          <p className="order-item__product-collection">
            {product.product_collection}
          </p>
        </div>
        <div className="d-flex flex-column">
          <p className="order-item__price mb-0">
            {formatCurrency(product.item_totalprice)}
          </p>
          <span className="order-item__count">
            Quantity x{product.item_quantity}
          </span>
        </div>
      </div>
    </div>
  );
}
