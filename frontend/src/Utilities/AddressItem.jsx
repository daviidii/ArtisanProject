import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useForm } from "react-hook-form";

export default function AddressItem({ addr, index }) {
  const addrEditFormId = `addrEditForm${index}`;
  const { user, setTrigger } = useAuth();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      addr_street: addr.addr_street,
      addr_barangay: addr.addr_barangay,
      addr_city: addr.addr_city,
      addr_province: addr.addr_province,
      addr_zip: addr.addr_zip,
      addr_country: addr.addr_country,
    },
  });
  const isDefault = addr.is_default ? "Default" : `Address ${index}`;

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8800/address/delete/${user.user_id}/${addr.addr_id}`
      );
      if (res.data.deleted) {
        alert("Address deleted successfuly");
        setTrigger((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitEdit = async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:8800/address/update/${user.user_id}/${addr.addr_id}`,
        data
      );

      if (res.data.updated) {
        console.log("Updated successfuly");
        setTrigger((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column mt-5 address__item">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="address__isdefault">
          <strong>{isDefault}:</strong>
        </span>
        <div className="d-flex address__update gap-4">
          <button
            className="btn-text address__update-btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${addrEditFormId}`}
            aria-expanded="false"
            aria-controls={addrEditFormId}
          >
            Edit
          </button>
          <button
            className="btn-text address__update-btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="d-flex flex-column">
        <span className="address__detail">{addr.addr_street}</span>
        <span className="address__detail">{addr.addr_barangay}</span>
        <span className="address__detail">{addr.addr_city}</span>
        <span className="address__detail">{addr.addr_province}</span>
        <span className="address__detail">{addr.addr_zip}</span>
        <span className="address__detail">{addr.addr_country}</span>
      </div>

      <div className="collapse mt-5" id={addrEditFormId}>
        <form
          className="address__edit-form d-flex flex-column px-5"
          onSubmit={handleSubmit(submitEdit)}
        >
          {/*  */}
          <div className="accounts__input-box">
            <label htmlFor="updatedAddr_st" className="input-label">
              Block/Lot/Bldg. No/Apt. No
            </label>
            <input
              type="text"
              name="addr_street"
              className="input-field"
              id="updatedAddr_st"
              placeholder="Block/Lot/Bldg. No/Apt. No"
              {...register("addr_street")}
              required
            />
          </div>
          {/*  */}
          <div className="accounts__input-box">
            <label htmlFor="updatedAddr_barangay" className="input-label">
              Barangay
            </label>
            <input
              type="text"
              name="addr_barangay"
              className="input-field"
              id="updatedAddr_barangay"
              placeholder="Barangay"
              {...register("addr_barangay")}
              required
            />
          </div>
          {/*  */}
          <div className="accounts__input-box">
            <label htmlFor="updatedAddr_city" className="input-label">
              City
            </label>
            <input
              type="text"
              name="addr_city"
              className="input-field"
              id="updatedAddr_city"
              placeholder="City"
              {...register("addr_city")}
              required
            />
          </div>
          {/*  */}
          <div className="accounts__input-box">
            <label htmlFor="updatedAddr_province" className="input-label">
              Province
            </label>
            <input
              type="text"
              name="addr_province"
              className="input-field"
              id="updatedAddr_province"
              placeholder="Province (e.g Metro Manila)"
              {...register("addr_province")}
              required
            />
          </div>
          {/*  */}
          <div className="accounts__input-box">
            <label htmlFor="updatedAddr_zip" className="input-label">
              Zip Code
            </label>
            <input
              type="text"
              name="addr_zip"
              className="input-field"
              id="updatedAddr_zip"
              placeholder="Zip Code"
              {...register("addr_zip")}
              required
            />
          </div>
          {/*  */}
          <div className="accounts__input-box">
            <label htmlFor="updatedAddr_country" className="input-label">
              Country
            </label>
            <input
              type="text"
              name="addr_country"
              className="input-field"
              id="updatedAddr_country"
              placeholder="Country"
              {...register("addr_country")}
            />
          </div>

          <button
            className="btn-normal mt-5 align-self-end address__editSubmit"
            data-bs-toggle="collapse"
            data-bs-target={`#${addrEditFormId}`}
          >
            Confirm Changes
          </button>
        </form>
      </div>
    </div>
  );
}
