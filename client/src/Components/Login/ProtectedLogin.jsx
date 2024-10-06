import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useState, useContext } from "react";
/**---------------ProtectedLogin component--------------- */
const ProtectedLogin = (props) => {
  // const [userID, setUserID] = useState(localStorage.getItem("CurrentUserID"));
  const [userID, setUserID] = useContext(UserContext);
  {
    console.log("userID in protected login: ", userID);
  }

  return userID ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedLogin;
