import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  //   PASSWORD AND CONFIRM PASSWORD STATES
  const [confirmPassword, setConfirmPassword] = useState("");
  //   BOOLEAN STATES FOR PW AND CPW INPUT FIELDS TO CHECK IF IT IS FOCUSED
  const [isPwFocused, setIsPwFocused] = useState(false);
  const [isConfPwFocused, setIsConfPwFocused] = useState(false);
  // BOOLEAN STATES FOR PASSWORD AND CONFIRM PASSWORD SHOW/HIDE BUTTON TO CHECK IF IT IS CLICKED
  const [isPwRevealed, setIsPwRevealed] = useState(false);
  const [isConfPwRevealed, setIsConfPwRevealed] = useState(false);

  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const redirect = useNavigate();

  const handleOnClick = (e, field) => {
    e.preventDefault();
    if (field === "password") {
      setIsPwRevealed(!isPwRevealed);
      passwordInputRef.current.focus(); // Set focus to the password input field once the show/hide icon for password input field is clicked
    } else if (field === "confirmPassword") {
      setIsConfPwRevealed(!isConfPwRevealed);
      confirmPasswordInputRef.current.focus(); // Set focus to the confirm password input field once the show/hide icon for confirm password input field is clicked
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/register", {
        ...user,
      });
      if (res.data.isEmailExists) {
        alert("email already exists");
      } else {
        alert("Registered");
        redirect("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (e, field) => {
    const value = e.target.value;
    if (field === "password") {
      setUser((prevUser) => ({ ...prevUser, password: value }));
    } else if (field === "confirmPassword") {
      setConfirmPassword(value);
    } else if (field === "firstName") {
      setUser((prevUser) => ({ ...prevUser, firstName: value }));
    } else if (field === "lastName") {
      setUser((prevUser) => ({ ...prevUser, lastName: value }));
    } else if (field === "email") {
      setUser((prevUser) => ({ ...prevUser, email: value }));
    }
  };
  return (
    <div className="container-fluid accounts">
      <div className="container-fluid d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-center accounts__body">
          <h2 className="accounts__title">/register</h2>
          <form
            className="accounts__form d-flex flex-column gap-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="d-flex gap-5">
              <div className="accounts__input-box">
                <label htmlFor="fname-field" className="input-label">
                  first name
                </label>
                <input
                  type="text"
                  className="input-field"
                  id="fname-field"
                  placeholder="First name"
                  required
                  onChange={(e) => handleOnChange(e, "firstName")}
                />
              </div>
              <div className="accounts__input-box">
                <label htmlFor="surname-field" className="input-label">
                  last name
                </label>
                <input
                  type="text"
                  className="input-field"
                  id="surname-field"
                  placeholder="Last name"
                  required
                  onChange={(e) => handleOnChange(e, "lastName")}
                />
              </div>
            </div>
            <div className="accounts__input-box">
              <label htmlFor="register-email" className="input-label">
                email address
              </label>
              <input
                type="text"
                className="input-field"
                id="register-email"
                placeholder="Email Address"
                required
                onChange={(e) => handleOnChange(e, "email")}
              />
            </div>
            <div className="accounts__input-box accounts__pw-input-box">
              <label htmlFor="register-pw" className="input-label">
                password
              </label>
              <div className="position-relative">
                <input
                  type={isPwRevealed ? "text" : "password"}
                  className="input-field accounts__pw"
                  id="register-pw"
                  aria-describedby="passwordHelpBlock"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => handleOnChange(e, "password")}
                  onFocus={() => setIsPwFocused(true)}
                  onBlur={() => setIsPwFocused(false)}
                  ref={passwordInputRef}
                  required
                />
                <div
                  onClick={(e) => handleOnClick(e, "password")}
                  className={`d-flex align-items-center accounts__show-pw ${
                    isPwFocused ? "show" : ""
                  }`}
                >
                  <img
                    src={
                      isPwRevealed
                        ? "Assets/Icons/eye-open-icon.svg"
                        : "Assets/Icons/eye-closed-icon.svg"
                    }
                    alt="show password icon"
                    className="accounts__show-pw-icon"
                  />
                </div>
              </div>
            </div>

            <div className="accounts__input-box">
              <label htmlFor="register-confirm-pw" className="input-label">
                confirm password
              </label>

              <div className="position-relative">
                <input
                  type={isConfPwRevealed ? "text" : "password"}
                  className="input-field accounts__confirm-pw"
                  id="register-confirm-pw"
                  aria-describedby="passwordHelpBlock"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => handleOnChange(e, "confirmPassword")}
                  onFocus={() => setIsConfPwFocused(true)}
                  onBlur={() => setIsConfPwFocused(false)}
                  ref={confirmPasswordInputRef}
                  required
                />
                <div
                  onClick={(e) => handleOnClick(e, "confirmPassword")}
                  className={`d-flex align-items-center accounts__show-pw ${
                    isConfPwFocused ? "show" : ""
                  }`}
                >
                  <img
                    src={
                      isConfPwRevealed
                        ? "Assets/Icons/eye-open-icon.svg"
                        : "Assets/Icons/eye-closed-icon.svg"
                    }
                    alt="show password icon"
                    className="accounts__show-pw-icon"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-normal accounts__submit">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
