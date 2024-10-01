import { Outlet, Navigate } from "react-router-dom";

/**---------------ProtectedLogin component--------------- */
const ProtectedLogin = (props) => {
  return props.acceptedUser || true ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedLogin;
