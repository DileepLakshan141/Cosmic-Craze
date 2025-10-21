import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import LoginCover from "../../images/auth-artwork.png";
import Logo from "../../images/logo/nav-logo-black.png";
import { useDispatch } from "react-redux";
import { login } from "../../features/UserSlice";
import "./signin.styles.css";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lock, setLock] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (email && password) {
      setLock(false);
    } else {
      setLock(true);
    }
  }, [email, password]);

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const loginFormHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true, credentials: "include" }
      );
      toast.success(`Welcome ${response.data.username}`);
      console.log(`${response.data.username} signed in`);
      dispatch(
        login({
          token: response.data.access_token,
          username: response.data.username,
        })
      );
      navigate("/dashboard/apod");
    } catch (err) {
      toast.error(err.message);
    }

    setEmail("");
    setPassword("");
  };

  // input field handlers
  const emailFieldHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordFieldHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="reg-form-container">
      {/* this is the container related to the login form */}
      <div className="form-partition">
        <div className="logo-cotnainer">
          <img src={Logo} alt="logo" className="company-logo" />
        </div>

        <span className="topic">Welcome Back!</span>
        <p className="support-phrase">
          We are happy to see you again. Please login to continue from wherever
          you left.
        </p>

        {/* google signup button */}
        <button className="googleSignup">
          <FcGoogle style={{ fontSize: "1.4rem", marginRight: "10px" }} /> Sign
          in with Google
        </button>

        <div className="breaker">
          <span className="line"></span>
          <span className="optionText">OR</span>
        </div>

        <form className="form-area" onSubmit={loginFormHandler}>
          <div className="set">
            <div className="label-box">
              <label className="login-label">Email</label>
            </div>
            <input
              type="text"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => emailFieldHandler(e)}
            />
            <span
              className={`reg-error-displayer ${
                emailError === "" ? "hide" : "show"
              }`}
            >
              {emailError}
            </span>
          </div>

          <div className="set">
            <div className="label-box">
              <label className="login-label">Password</label>
            </div>
            <input
              type="password"
              className="login-input"
              placeholder="Create a password"
              value={password}
              onChange={(e) => passwordFieldHandler(e)}
            />
            <span
              className={`reg-error-displayer ${
                passwordError === "" ? "hide" : "show"
              }`}
            >
              {passwordError}
            </span>
          </div>

          <button type="submit" className="login-btn" disabled={lock}>
            sign in
          </button>

          <div className="link-login">
            Don't have an account?{" "}
            <span
              className="login-connector"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </div>
        </form>
      </div>
      {/* this is the part related to the image */}
      <div
        className="image-partiton"
        style={{ backgroundImage: `url(${LoginCover})` }}
      ></div>
    </div>
  );
}

export default SignIn;
