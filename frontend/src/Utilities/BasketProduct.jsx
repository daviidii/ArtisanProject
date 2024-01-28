import { useBasket } from "../Context/BasketContext";

export default function BasketProduct({ product }) {
  const { removeFromBasket, updateItem, formatCurrency } = useBasket();
  // const imagePath = `../Assets/ProductImages/${product.product_img}`;

  const handleDecrement = () => {
    if (product.item_quantity > 1) {
      // Call the updateItem function to decrement item_quantity
      updateItem(product.product_id, product.item_quantity - 1);
    }
  };
  const handleIncrement = () => {
    updateItem(product.product_id, product.item_quantity + 1);
    console.log(product.item_quantity + 1);
  };

  const handleRemoveItem = () => {
    removeFromBasket(product.product_id);
  };

  return (
    <div className="container-fluid bsk-item">
      <div className="row bsk-item__body">
        <div className="col-3 bsk-item__img-box">
          <img
            src={product.product_img}
            alt={product.product_name}
            className="bsk-item__img"
          />
        </div>
        <div className="col-6 bsk-item__content d-flex flex-column">
          <h3 className="bsk-item__product-name">{product.product_name}</h3>
          <p className="bsk-item__price mb-0 mt-auto">
            {formatCurrency(product.item_totalprice)}
          </p>
        </div>
        <div className="col-3 bsk-item__buttons d-flex flex-column">
          <button
            onClick={handleRemoveItem}
            className="bsk-item__btn bsk-item__rmv align-self-end"
          >
            <img
              className="bsk-item__rmv-icon"
              src="../Assets/Icons/trash-icon.svg"
              alt="remove"
            />
          </button>
          <div className="d-flex bsk-item__counter mt-auto">
            <button
              onClick={handleDecrement}
              className="bsk-item__btn text-center"
            >
              -
            </button>
            <div className="bsk-item__count text-center">
              {product.item_quantity}
            </div>
            <button
              onClick={handleIncrement}
              className="bsk-item__btn text-center"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
