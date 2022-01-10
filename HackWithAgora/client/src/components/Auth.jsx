import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};
const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { username, password, phoneNumber, avatarURL } = form;
    const URL = 'http://localhost:5000/auth';
    const { data:{token,userId,hashedPassword,fullName } } = await axios.post(
      `${URL}/${isSignup ? "signup" : "login"}`,
      {
        username,
        password,
        fullName:form.fullName,
        phoneNumber,
        avatarURL,
      }
    );
    cookies.set('token',token);
    cookies.set('username',username);
    cookies.set('fullName',fullName);
    cookies.set('userId',userId);
    if(isSignup){
      cookies.set('phoneNumber',phoneNumber);
      cookies.set('avatarURL',avatarURL);
      cookies.set('hashedPassword',hashedPassword);

    }
    window.location.reload();
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };
  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "Create an account" : "Log In"}</p>
          <form onSubmit={handleSubmit}>
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">User Name</label>
              <input
                name="username"
                type="text"
                placeholder="User Name"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Profile Picture</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Profile Picture URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Mobile Number</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignup ? "Create account" : "Log In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup ? "Already have an account?" : "New to Doubt Solver?"}
              <span onClick={switchMode}>
                {isSignup ? "Log In" : "Create an account"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;