import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import LoginCover from "../../images/auth-artwork.png";
import Logo from "../../images/logo/nav-logo-black.png";
import "./signup.styles.css";

function Signup() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [lock, setLock] = useState(true);

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [checkPasswordError, setCheckPasswordError] = useState("");

  useEffect(() => {
    if (email !== "") {
      emailValidate();
    }

    if (username !== "") {
      nameValidate();
    }

    if (password !== "") {
      passwordValidate();
    }

    if (confirmPassword !== "") {
      checkValidate();
    }

    if (
      email &&
      username &&
      password &&
      confirmPassword &&
      confirmPassword === password &&
      nameError === ""
    ) {
      setLock(false);
    } else {
      setLock(true);
    }
  }, [email, username, password, confirmPassword, nameError]);

  const registrationFormHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/create-account", {
        username,
        password,
        email,
      });
      if (response.data) {
        toast.success("New user account created");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error.message);
    }

    setEmail("");
    setUserName("");
    setPassword("");
    setConfirmPassword("");
  };

  const nameValidate = () => {
    const regex = /[@#&*]/;
    regex.test(username)
      ? setNameError("Name cannot contain special characters!")
      : setNameError("");
  };

  const emailValidate = () => {
    const regex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
    regex.test(email)
      ? setEmailError("")
      : setEmailError("Email address must be valid!");
  };

  const passwordValidate = () => {
    const regex = /.{8,}/;
    regex.test(password)
      ? setPasswordError("")
      : setPasswordError("More than 8 characters required!");
  };

  const checkValidate = () => {
    password === confirmPassword
      ? setCheckPasswordError("")
      : setCheckPasswordError("Entered password does not match!");
  };

  // input field handlers
  const emailFieldHandler = (e) => {
    setEmail(e.target.value);
  };

  const nameFieldHandler = (e) => {
    setUserName(e.target.value);
  };

  const passwordFieldHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="reg-form-container">
      {/* this is the container related to the login form */}
      <div className="form-partition">
        <div className="logo-cotnainer">
          <img src={Logo} alt="logo" className="company-logo" />
        </div>

        <span className="topic">Join Our Community</span>
        <p className="support-phrase">
          Let's explore the universe together. Let our journey begin.
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

        <form className="form-area" onSubmit={registrationFormHandler}>
          <div className="set">
            <div className="label-box">
              <label className="register-label">Username*</label>
            </div>
            <input
              type="text"
              className="register-input"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => nameFieldHandler(e)}
            />
            <span
              className={`reg-error-displayer ${
                nameError === "" ? "hide" : "show"
              }`}
            >
              {nameError}
            </span>
          </div>

          <div className="set">
            <div className="label-box">
              <label className="register-label">Email*</label>
            </div>
            <input
              type="text"
              className="register-input"
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
              <label className="register-label">Password*</label>
            </div>
            <input
              type="password"
              className="register-input"
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

          <div className="set">
            <div className="label-box">
              <label className="register-label">Confirm Password*</label>
            </div>
            <input
              type="password"
              className="register-input"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => confirmPasswordHandler(e)}
            />
            <span
              className={`reg-error-displayer ${
                checkPasswordError === "" ? "hide" : "show"
              }`}
            >
              {checkPasswordError}
            </span>
          </div>

          <button type="submit" className="register-btn" disabled={lock}>
            sign up
          </button>

          <div className="link-register">
            Already have an account?{" "}
            <span
              className="login-connector"
              onClick={() => navigate("/signin")}
            >
              Sign In
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

export default Signup;
