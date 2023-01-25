import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import LoginContext from "../context/Login/LoginContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const session = localStorage.getItem("session");
  const { userLogged } = useContext(LoginContext);
  useEffect(() => {
    // console.log(userLogged);
    if (!session) {
      navigate("/");
    }
  }, []);
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
