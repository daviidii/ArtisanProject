import axios from "axios";
// import { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import AddressItem from "../Utilities/AddressItem";
import { useForm } from "react-hook-form";

export default function ProfileAddressList() {
  const { user, userAddres, setFetchUserTrigger } = useAuth();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      addr_country: "Philippines",
    },
  });

  const submit = async (data) => {
    try {
      const res = await axios.post(
        `http://localhost:8800/address/add/${user.user_id}`,
        data
      );
      if (res.data.addedToDb) {
        console.log("Success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = () => {
    setFetchUserTrigger((prev) => !prev);
  };

  return (
    <div className="d-flex flex-column mb-5 address">
      <div className="d-flex w-100 information__header justify-content-between align-items-center">
        <h2 className="profile__title">My Addresses</h2>
      </div>
      <div className="divider"></div>
      {userAddres ? (
        <div className="mb-5">
          {userAddres.map((addr, i) => (
            <AddressItem addr={addr} key={addr.addr_id} index={i} />
          ))}
        </div>
      ) : (
        <div className="mb-5">Address doesn't exist</div>
      )}

      <button
        className="btn-normal w-100"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#addAdressForm"
        aria-controls="addAdressForm"
      >
        Add address
      </button>
      <div className="collapse mt-5 px-5" id="addAdressForm">
        <form className="address__add-form" onSubmit={handleSubmit(submit)}>
          {/*  */}
          <div className="accounts__input-box">
            <label htmlFor="newAddr_st" className="input-label">
              Block/Lot/Bldg. No/Apt. No
            </label>
            <input
              type="text"
              name="addr_street"
              className="input-field"
              id="newAddr_st"
              placeholder="Block/Lot/Bldg. No/Apt. No"
              {...register("addr_street")}
              required
            />
          </div>
          {/*  */}
          <div className="accounts__input-box">
            <label htmlFor="newAddr_barangay" className="input-label">
              Barangay
            </label>
            <input
              type="text"
              name="addr_barangay"
              className="input-field"
              id="newAddr_barangay"
              placeholder="Barangay"
              {...register("addr_barangay")}
              required
            />
          </div>
          {/*  */}
          <div className="accounts__input-box">
            <label htmlFor="newAddr_city" className="input-label">
              City
            </label>
            <input
              type="text"
              name="addr_city"
              className="input-field"
              id="newAddr_city"
              placeholder="City"
              {...register("addr_city")}
              required
            />
          </div>
          {/*  */}
          <div className="accounts__input-box">
            <label htmlFor="newAddr_province" className="input-label">
              Province
            </label>
            <input
              type="text"
              name="addr_province"
              className="input-field"
              id="newAddr_province"
              placeholder="Province (e.g Metro Manila)"
              {...register("addr_province")}
              required
            />
          </div>
          {/*  */}
          <div className="accounts__input-box">
            <label htmlFor="newAddr_zip" className="input-label">
              Zip Code
            </label>
            <input
              type="text"
              name="addr_zip"
              className="input-field"
              id="newAddr_zip"
              placeholder="Zip Code"
              {...register("addr_zip")}
              required
            />
          </div>
          {/*  */}
          <div className="accounts__input-box">
            <label htmlFor="newAddr_country" className="input-label">
              Country
            </label>
            <input
              type="text"
              name="addr_country"
              className="input-field"
              id="newAddr_country"
              placeholder="Country"
              {...register("addr_country")}
            />
          </div>

          <button
            className="btn-normal mt-5 w-100"
            data-bs-toggle="collapse"
            data-bs-target="#addAdressForm"
            onClick={handleOnClick}
          >
            Create Address
          </button>
        </form>
      </div>
    </div>
  );
}
