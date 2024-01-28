import BasketProduct from "../Utilities/BasketProduct";
import { useBasket } from "../Context/BasketContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
export default function Basket() {
  const { basketItems, formatCurrency, basketTotal, basketQuantity } =
    useBasket();
  const { setTrigger, isLoggedIn } = useAuth();
  const redirect = useNavigate();
  const handleCheckout = () => {
    if (isLoggedIn) {
      redirect("/checkout");
      setTrigger((prev) => !prev);
    } else {
      redirect("/login");
    }
  };

  return (
    <div
      className="offcanvas offcanvas-start basket"
      data-bs-scroll="true"
      tabIndex="-1"
      id="offcanvas-basket"
      aria-labelledby="offcanvas-basket-label"
    >
      <div className="offcanvas-header basket__header justify-content-end">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="basket__title-box text-center">
        <h5
          className="offcanvas-title basket__title"
          id="offcanvas-basket-label"
        >
          basket
        </h5>
      </div>
      <div className="offcanvas-body">
        {(basketItems ?? []).map((items) => (
          <BasketProduct key={items.product_id} product={items} />
        ))}
      </div>
      <div className="basket__footer">
        <div className="d-flex justify-content-between basket__totals mb-3">
          <span className="basket__totalQuantity">
            Subtotal ({basketQuantity} items)
          </span>
          <span className="basket__totalPrice">
            {formatCurrency(basketTotal)}
          </span>
        </div>
        <span className="basket__text mb-2">
          Taxes, shipping & promos calculated at checkout
        </span>
        <div className="basket__checkout d-flex flex-column">
          <button
            onClick={handleCheckout}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            className="basket__checkout-btn"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
