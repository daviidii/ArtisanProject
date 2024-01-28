import { useBasket } from "../Context/BasketContext";
import OrderSummary from "../Utilities/OrderSummary";

export default function CheckoutBasket() {
  const { basketItems } = useBasket();

  return (
    <div className="checkout__basket my-5">
      <div className="checkout__basket-header">
        <h2 className="checkout__basket-title">Products Ordered</h2>
      </div>
      <div className="container-fluid checkout__basket-items">
        {basketItems.map((item) => (
          <OrderSummary key={item.product_id} product={item} />
        ))}
      </div>
    </div>
  );
}
