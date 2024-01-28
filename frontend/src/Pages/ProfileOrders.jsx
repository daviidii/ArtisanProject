import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import OrderProducts from "../Utilities/OrderProducts";
import OrderSummary from "../Utilities/OrderSummary";
import { useBasket } from "../Context/BasketContext";

export default function ProfileOrders() {
  const { user } = useAuth();
  const { formatCurrency } = useBasket();
  const [userOrders, setUserOrders] = useState([]);
  useEffect(() => {
    // Fetch user orders when the component mounts
    const fetchUserOrders = async () => {
      try {
        const userId = user.user_id;
        const response = await axios.get(
          `http://localhost:8800/user/transactions/${userId}`
        );
        setUserOrders(response.data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserOrders();
  }, [user.user_id]);

  const groupedOrders = userOrders.reduce((groups, order) => {
    const orderId = order?.order_id;
    if (orderId) {
      groups[orderId] = groups[orderId] || [];
      groups[orderId].push(order);
    }
    return groups;
  }, {});

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // Dynamic options object
    const dateOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    // Format the date using toLocaleDateString with dynamic options
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);

    return formattedDate;
  };

  return (
    <div className="container-fluid d-flex flex-column profile-orders">
      {Object.entries(groupedOrders).map(([orderId, orders]) => (
        <div key={orderId} className=" d-flex flex-column order-history mb-5">
          <div className="order-history__heading w-100 px-5 py-4 text-end d-flex justify-content-between align-items-center">
            <span className="order-history__date">
              {formatTimestamp(orders[0].created_at)}
            </span>
            <span className="order-history__status">Completed</span>
          </div>
          <div className="container-fluid order-history__list px-5">
            {orders.map((order) => (
              <OrderSummary product={order} key={order.product_id} />
            ))}
          </div>

          <div className="order-history__footer align-self-end text-end w-100 px-5 py-4">
            <p className="order-history__footer-details">
              Order Quantity(x{orders[0].order_quantity})
            </p>
            <p className="order-history__footer-details">
              Order Total:{" "}
              <strong>
                <span className="order-history__totalprice">
                  {formatCurrency(orders[0].order_totalprice)}
                </span>
              </strong>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
