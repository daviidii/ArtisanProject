import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";

export default function ProfileNav() {
  const { logout, setTrigger } = useAuth();
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8800/logout");
      if (res.data.logout) {
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = () => {
    setTrigger((prev) => !prev);
  };
  return (
    <div className="container-fluid profile__nav">
      <ul className="d-flex flex-lg-column profile__list">
        <li className="profile__item me-3">
          <NavLink to="information" className="profile__link">
            Profile
          </NavLink>
        </li>
        <li className="profile__item me-3">
          <NavLink
            to="address"
            className="profile__link"
            onClick={handleOnClick}
          >
            Addresses
          </NavLink>
        </li>
        <li className="profile__item me-3">
          <NavLink to="orders" className="profile__link">
            Orders
          </NavLink>
        </li>
        <li className="profile__item me-3">
          <button
            onClick={handleLogout}
            className="profile__link profile__logout"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
