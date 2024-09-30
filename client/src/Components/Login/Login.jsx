import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FetchPost } from "../fetch";

/**---------------URLs for Login & Register--------------- */
const urlLogin = "http://localhost:4000/login";
const urlRegister = "http://localhost:4000/register";
/**---------------Login component--------------- */
const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false); //for show || !show password
  const [correctValues, setCorrectValues] = useState(false); // for message if correct values
  const [logOrReg, setLogOrReg] = useState(true); // for login or register
  const setAcceptedUser = props.setAcceptedUser; // props for set accepted user from the server in login
  let passwordInput = useRef(""); //for password
  let usernameInput = useRef(""); //for username
  const navigate = useNavigate(); //for navigate to home page

  /**---------------Async login function--------------- */
  async function login(user) {
    setAcceptedUser(user);
    navigate("/");
  }
  return (
    <>
      {(logOrReg && (
        <>
          <div className="login">
            <h1>login</h1>
            <input
              type="text"
              id="userName"
              placeholder="userName"
              ref={usernameInput}
              // minLength={3} required
            />
            <br />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="password"
              ref={passwordInput}
              // minLength={3} required
            />
            <br />
            <input
              type="checkbox"
              id="showPassword"
              onChange={() => {
                setShowPassword(!showPassword);
              }}
              required
            />
            showPassword
            <br />
            <button
              onClick={() => {
                if (
                  usernameInput.current.value &&
                  passwordInput.current.value
                ) {
                  /**--------------login fetch if correct--------------- */
                  FetchPost(
                    urlLogin,
                    {
                      userName: usernameInput.current.value,
                      password: passwordInput.current.value,
                    },
                    login
                  );
                } else {
                  /**--------------else show message--------------- */
                  setCorrectValues(true);
                  setTimeout(() => {
                    setCorrectValues(false);
                  }, 3000);
                }
              }}>
              login
            </button>
            {correctValues && (
              <p style={{ color: "red" }}>incorrect username or password</p>
            )}
          </div>
        </>
      )) || (
        <>
          <div className="register">
            <h1>register</h1>
            <input type="text" id="name" placeholder="name" required />
            <br />
            <input
              type="text"
              id="userName"
              placeholder="userName"
              required
            />{" "}
            <br />
            <input type="text" id="email" placeholder="email" /> <br />
            <input type="text" id="phone" placeholder="phone" /> <br />
            <input type="text" id="password" placeholder="password" /> <br />
            <input type="text" id="street" placeholder="street" /> <br />
            <input type="text" id="city" placeholder="city" /> <br />
            <input type="text" id="suite" placeholder="suite" /> <br />
            <button>Register</button>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
