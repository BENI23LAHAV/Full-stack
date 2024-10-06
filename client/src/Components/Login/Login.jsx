import React, { useState, useRef, useContext, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { FetchPost } from "../fetch";
import { UserContext } from "../../App";

/**---------------URLs for Login & Register--------------- */
const urlLogin = "http://localhost:4000/login";
const urlRegister = "http://localhost:4000/register";
/**---------------Login component--------------- */
const Login = (props) => {
  const navigate = useNavigate();
  if (localStorage.getItem("CurrentUserID")) {
    console.log(
      "im a userID from localStorage: ",
      localStorage.getItem("CurrentUserID")
    );
    navigate("/");
  }

  /**---------------Trying to check user id global------------ */
  const [userID, setUserID] = useContext(UserContext);
  useEffect(() => {
    console.log("im a  userID: ", userID);
  }, [userID]);

  /**---------------Trying to check user id global------------ */

  const [showPassword, setShowPassword] = useState(false); //for show || !show password
  const [unCorrectValues, setUnCorrectValues] = useState(false); // for message if correct values
  const [logOrReg, setLogOrReg] = useState(true); // for login or register
  const [regSuccess, setRegSuccess] = useState(false);
  const setAcceptedUser = props.setAcceptedUser; // props for set accepted user from the server in login

  /**---------------Refs for Login--------------- */
  let passwordInput = useRef(""); //for password
  let usernameInput = useRef(""); //for username
  /**---------------Ref for Register--------------- */
  let nameInputReg = useRef(""); //for name
  let usernameInputReg = useRef(""); //for username
  let phoneInputReg = useRef(""); //for phone
  let passwordInputReg = useRef(""); //for password
  let emailInputReg = useRef(""); //for email
  let cityInputReg = useRef(""); //for city
  let streetInputReg = useRef(""); //for street
  let suiteInputReg = useRef(""); //for suite
  /**--------------Checking Inputs--------------- */
  function checkInputs() {
    return (
      nameInputReg.current.value &&
      usernameInputReg.current.value &&
      phoneInputReg.current.value &&
      passwordInputReg.current.value &&
      emailInputReg.current.value &&
      cityInputReg.current.value &&
      streetInputReg.current.value &&
      suiteInputReg.current.value
    );
  }

  /**---------------Async login function--------------- */
  async function login(user) {
    console.log("im user: ", user);

    // user = JSON.parse(user);
    console.log("im user: ", user);

    if (user.user_id) {
      setAcceptedUser(user.user_id);
      setUserID(user.user_id);
      localStorage.setItem("CurrentUserID", JSON.stringify(user.user_id));
      //do it to useContext
      navigate("/");
    } else {
      console.log("User status: ", user.message);
      setUnCorrectValues(true);
      setTimeout(() => {
        setUnCorrectValues(false);
      }, 3000);
    }
  }
  async function register(user) {
    console.log("im user: ", user);

    if (user.user_id) {
      console.log("User register succesfuly");
      setRegSuccess(true);
      setTimeout(() => {
        setRegSuccess(false);
        setLogOrReg(!logOrReg);
      }, 3000);

      // navigate("/login");
    } else {
      console.log("User status: ", user.status);
      setUnCorrectValues(true);
      setTimeout(() => {
        setUnCorrectValues(false);
      }, 3000);
    }
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
                  setUnCorrectValues(true);
                  setTimeout(() => {
                    setUnCorrectValues(false);
                  }, 3000);
                }
              }}>
              login
            </button>
          </div>
        </>
      )) || (
        <>
          <div className="register">
            <h1>register</h1>
            <input
              ref={nameInputReg}
              type="text"
              id="name"
              placeholder="name"
              required
            />
            <br />
            <input
              ref={usernameInputReg}
              type="text"
              id="userName"
              placeholder="userName"
              required
            />
            <br />
            <input
              ref={emailInputReg}
              type="text"
              id="email"
              placeholder="email"
            />{" "}
            <br />
            <input
              ref={phoneInputReg}
              type="text"
              id="phone"
              placeholder="phone"
            />{" "}
            <br />
            <input
              ref={passwordInputReg}
              type="text"
              id="password"
              placeholder="password"
            />{" "}
            <br />
            <input
              ref={streetInputReg}
              type="text"
              id="street"
              placeholder="street"
            />{" "}
            <br />
            <input
              ref={cityInputReg}
              type="text"
              id="city"
              placeholder="city"
            />{" "}
            <br />
            <input
              ref={suiteInputReg}
              type="text"
              id="suite"
              placeholder="suite"
            />{" "}
            <br />
            <button
              onClick={() => {
                if (checkInputs()) {
                  FetchPost(
                    urlRegister,
                    {
                      name: nameInputReg.current.value,
                      userName: usernameInputReg.current.value,
                      email: emailInputReg.current.value,
                      phone: phoneInputReg.current.value,
                      password: passwordInputReg.current.value,
                      address: {
                        street: streetInputReg.current.value,
                        city: cityInputReg.current.value,
                        suite: suiteInputReg.current.value,
                      },
                    },
                    register
                  );
                } else {
                  setUnCorrectValues(true);
                  setTimeout(() => {
                    setUnCorrectValues(false);
                  }, 3000);
                }
              }}>
              Register
            </button>
            {unCorrectValues && (
              <>
                {/* {" "}
                <p style={{ color: "red" }}>incorrect values</p>
                <p
                  onClick={() => {
                    setLogOrReg(!logOrReg);
                  }}
                  style={{ color: "green" }}>
                  Already registered?
                </p> */}
              </>
            )}
          </div>
        </>
      )}

      {logOrReg ? (
        <p
          onClick={() => {
            setLogOrReg(!logOrReg);
          }}
          style={{ color: "green" }}>
          Not registered yet?
        </p>
      ) : (
        <p
          onClick={() => {
            setLogOrReg(!logOrReg);
          }}
          style={{ color: "green" }}>
          Registered?
        </p>
      )}
      {unCorrectValues && <p style={{ color: "red" }}>Uncorrect values</p>}
      {regSuccess && <p style={{ color: "green" }}>Register succesfuly</p>}
    </>
  );
};

export default Login;
