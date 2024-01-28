import { useState } from "react";
import CheckoutBasket from "../Components/CheckoutBasket";
import { useAuth } from "../Context/AuthContext";
import { useBasket } from "../Context/BasketContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { userAddres } = useAuth();
  const { basketTotal, basketQuantity, formatCurrency } = useBasket();

  const redirect = useNavigate();
  const shippingFee = 150;
  const total = basketTotal + shippingFee;
  const defaultAddress = userAddres.find((address) => address.is_default);
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress || {});
  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
  };

  const handleCheckout = async () => {
    try {
      console.log(total);
      const res = await axios.post("http://localhost:8800/basket/checkout", {
        address: selectedAddress,
        basketTotal: total,
        basketQuantity: basketQuantity,
      });

      if (res.data.checkout) {
        alert("Checkout successful");
        redirect("/");
      } else if (res.data.status === 401) {
        alert("User not authenticated");
        redirect("/login");
      } else {
        alert("Checkout failed");
        redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid checkout mw-1440">
      <div className="checkout__left d-flex flex-column align-items-center px-5">
        <div className="checkout__heading text-center mt-5 w-100">
          <h2 className="checkout__title">artisan</h2>
        </div>
        <div className="delivery w-100 p-5 mt-3">
          <div className="delivery__header mb-2">
            <span>Delivery Address</span>
          </div>
          <div className="d-md-flex justify-content-between align-items-center">
            <div className="delivery__addresses">
              <span className="delivery__address">
                {selectedAddress.addr_street},{" "}
              </span>
              <span className="delivery__address">
                {selectedAddress.addr_barangay},{" "}
              </span>
              <span className="delivery__address">
                {selectedAddress.addr_city},{" "}
              </span>
              <span className="delivery__address">
                {selectedAddress.addr_country},{" "}
              </span>
              <span className="delivery__address">
                {selectedAddress.addr_zip}
              </span>
            </div>
            <button
              type="button"
              className="delivery__btn mt-sm-0 mt-4"
              data-bs-toggle="modal"
              data-bs-target="#changeAddressModal"
            >
              Change
            </button>
          </div>
        </div>
        <CheckoutBasket />
        <div className="checkout__footer w-100 mt-auto mb-5">
          <div className="d-flex justify-content-between">
            <span className="checkout__subtotal">
              Subtotal ({basketQuantity})
            </span>
            <span className="checkout__subtotal">
              <strong>{formatCurrency(basketTotal)}</strong>
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="checkout__shipping">Shipping</span>
            <span className="checkout__shipping">
              {formatCurrency(shippingFee)}
            </span>
          </div>
          <div className="d-flex justify-content-between mt-5">
            <span className="checkout__total">Total</span>
            <span className="checkout__total">
              <strong>{formatCurrency(total)}</strong>
            </span>
          </div>
          <button
            className="btn-normal d-block ms-auto mt-5"
            onClick={handleCheckout}
          >
            checkout
          </button>
        </div>
      </div>

      {/* MODAL */}
      <div
        className="modal fade"
        id="changeAddressModal"
        tabIndex="-1"
        aria-labelledby="changeAddressModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered delivery__modal">
          <div className="modal-content delivery__modal-content">
            <div className="modal-header delivery__modal-header px-5 py-4">
              <h2
                className="modal-title delivery__modal-title"
                id="changeAddressModalLabel"
              >
                Addresses
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body delivery__modal-body px-5 py-3">
              {userAddres.map((address) => (
                <div className="form-check my-5" key={address.addr_id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id={`flexRadioDefault${address.addr_id}`}
                    onChange={() => handleAddressSelection(address)}
                    checked={selectedAddress.addr_id === address.addr_id}
                  />
                  <label
                    className="form-check-label w-100"
                    htmlFor={`flexRadioDefault${address.addr_id}`}
                  >
                    <div className="delivery__address-list">
                      <div className="d-flex justify-content-between align-items-center">
                        <h3 className="delivery__address-list-header mb-0">
                          {address.is_default ? `Default Address:` : `Address:`}
                        </h3>
                        <button className="delivery__editAddressBtn">
                          Edit
                        </button>
                      </div>
                      <div className="delivery__addresses mt-2">
                        <span className="delivery__address delivery__address--2">
                          {address.addr_street},{" "}
                        </span>
                        <span className="delivery__address delivery__address--2">
                          {address.addr_barangay},{" "}
                        </span>
                        <span className="delivery__address delivery__address--2">
                          {address.addr_city},{" "}
                        </span>
                        <span className="delivery__address delivery__address--2">
                          {address.addr_province},{" "}
                        </span>
                        <span className="delivery__address delivery__address--2">
                          {address.addr_country},{" "}
                        </span>
                        <span className="delivery__address delivery__address--2">
                          {address.addr_zip}
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
            <div className="modal-footer delivery__modal-footer px-5 py-4">
              <button
                type="submit"
                className="btn-normal delivery__modal-confirmBtn"
                data-bs-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
