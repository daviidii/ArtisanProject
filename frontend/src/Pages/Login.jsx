import { useRef, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
  axios.defaults.withCredentials = true;
  const { login, isLoggedIn, setUserCb } = useAuth();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFocused, setIsfocused] = useState(false);
  const redirect = useNavigate();
  const passwordInputRef = useRef(null);

  const handleOnClick = (e) => {
    e.preventDefault();
    setIsRevealed(!isRevealed);
    passwordInputRef.current.focus();
  };

  const handleOnChange = (e) => {
    setUserLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/login", {
        ...userLogin,
      });

      if (res.data.success) {
        setUserCb(res.data.user);
        login();
        redirect("/");
      } else {
        if (res.data.error === "Account doesn't exist")
          alert("Account doesn't exist");
        else if (res.data.error === "Incorrect email or password")
          alert("Incorrect email or password");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return isLoggedIn ? (
    <Navigate to="/profile" />
  ) : (
    <div className="container-fluid accounts">
      <div className="container-fluid d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-center accounts__body">
          <h2 className="accounts__title">/login</h2>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="accounts__form d-flex flex-column gap-2"
          >
            {/* EMAIL */}
            <div className="accounts__input-box">
              <label htmlFor="email-field" className="input-label">
                email
              </label>
              <input
                type="text"
                name="email"
                className="input-field"
                id="email-field"
                placeholder="Email Address"
                value={userLogin.email}
                onChange={(e) => handleOnChange(e)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="accounts__input-box accounts__pw-input-box">
              <label htmlFor="password-field" className="input-label">
                password
              </label>
              <div className="position-relative">
                <input
                  type={isRevealed ? "text" : "password"}
                  name="password"
                  className="input-field"
                  id="password-field"
                  aria-describedby="passwordHelpBlock"
                  placeholder="Password"
                  value={userLogin.password}
                  onChange={(e) => handleOnChange(e)}
                  onFocus={() => setIsfocused(true)}
                  onBlur={() => setIsfocused(false)}
                  ref={passwordInputRef}
                />
                <div
                  onClick={(e) => handleOnClick(e)}
                  className={`d-flex align-items-center accounts__show-pw ${
                    isFocused ? "show" : ""
                  }`}
                >
                  <img
                    src={
                      isRevealed
                        ? "Assets/Icons/eye-open-icon.svg"
                        : "Assets/Icons/eye-closed-icon.svg"
                    }
                    alt="show password icon"
                    className="accounts__show-pw-icon"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <div id="passwordHelpBlock" className="form-text">
                <Link to="/" className="accounts__forgot-pw">
                  Forgot password?
                </Link>
              </div>

              <div id="passwordHelpBlock" className="form-text">
                <Link to="/register" className="accounts__forgot-pw">
                  Don't have an account?
                </Link>
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
