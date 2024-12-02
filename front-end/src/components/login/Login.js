import React, { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../Context/authContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const { state, dispatch } = useContext(AuthContext);
  const handleClick = async (e) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://booking-clone-3.onrender.com/api/auth/login",
        credentials,
        {withCredentials: true}
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      const path = localStorage.getItem("path")
      navigate(path || "/");
      console.log(res.data)
      
      localStorage.setItem('user',JSON.stringify(res.data))
      localStorage.setItem('token',JSON.stringify(res.data.token))
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  console.log(credentials);
  return (
    <div className="login">
      <div className="loginWrapper">
        <h3 className="loginLogo">Booking</h3>
        <span className="loginDesc">
          Connect with friends and the world around you on Booking.
        </span>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Username"
              id="username"
              className="loginInput"
              onChange={handleChange}
            />
            <input
              placeholder="Password"
              id="password"
              type="password"
              className="loginInput"
              onChange={handleChange}
            />
            {state.error && <span className="errorMessage">{state.error}</span>}
            <button className="loginButton " onClick={handleClick}>
              Log In
            </button>
            <Link to="/register">
              <button className="loginRegisterButton ">
                Create a New Account
              </button>
            </Link>
            <span className="loginForgot">Forgot Password?</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
