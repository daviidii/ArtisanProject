import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ProfileInfo() {
  axios.defaults.withCredentials = true;
  const { user, setUser, setFetchUserTrigger } = useAuth();
  const [isEditClicked, setIsEditClicked] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      user_lname: user?.user_lname || "",
      user_fname: user?.user_fname || "",
      user_email: user?.user_email || "",
    },
  });

  const submit = async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:8800/user/update/${user.user_id}`,
        data
      );

      if (res.status === 200) {
        // Update the user information in the context or state
        setUser(res.data.updatedInfo);
        setFetchUserTrigger((prev) => !prev);
        setIsEditClicked(false);
      } else {
        console.error("Failed to update user information:", res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setIsEditClicked(!isEditClicked);
  };

  return (
    <div className="d-flex flex-column information">
      <div className="d-flex w-100 information__header justify-content-between align-items-center">
        <h2 className="profile__title">My Profile</h2>
        <button
          className="btn-text"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#edit-form"
          aria-expanded="false"
          aria-controls="Edit-form"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>
      <div className="divider"></div>
      <div className="collapse" id="edit-form">
        <form
          className="information__edit-form mt-5"
          onSubmit={handleSubmit(submit)}
        >
          <div className="d-flex gap-5">
            <div className="accounts__input-box">
              <label htmlFor="update-firstname" className="input-label">
                first name
              </label>
              <input
                type="text"
                name="user_fname"
                className="input-field"
                id="update-firstname"
                placeholder="First name"
                {...register("user_fname")}
                required
              />
            </div>
            <div className="accounts__input-box">
              <label htmlFor="update-surname" className="input-label">
                last name
              </label>
              <input
                type="text"
                name="user_lname"
                className="input-field"
                id="update-surname"
                placeholder="Last name"
                {...register("user_lname")}
                required
              />
            </div>
          </div>
          <div className="accounts__input-box">
            <label htmlFor="update-email" className="input-label">
              email address
            </label>
            <input
              type="text"
              name="user_email"
              className="input-field"
              id="update-email"
              placeholder="email address"
              {...register("user_email")}
              required
            />
          </div>
          <button
            className="btn-normal w-100 mt-5"
            type="submit"
            data-bs-toggle="collapse"
            data-bs-target="#edit-form"
          >
            Confirm
          </button>
        </form>
      </div>
      <div
        className={
          isEditClicked
            ? `mt-5 information__details hide`
            : `mt-5 information__details`
        }
      >
        {user ? (
          <>
            <h3 className="information__info">{`${user.user_fname} ${user.user_lname}`}</h3>
            <h3 className="information__info">{user.user_email}</h3>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}
