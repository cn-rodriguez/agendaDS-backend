import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import LoginContext from "../context/Login/LoginContext";
import jwt_decode from "jwt-decode";

function ProtectedRoute({ isAllowed, children, redirectTo }) {
  const navigate = useNavigate();
  const session = localStorage.getItem("session");
  const { userLogged } = useContext(LoginContext);
  // console.log(isAllowed);
  useEffect(() => {
    // console.log(userLogged);
    if (!session) {
      navigate("/");
    }
    if (userLogged) {
      const { uid } = jwt_decode(userLogged.token);
      const { role } = uid;
      if (isAllowed === "teacher" && role !== "TEACHER_ROLE") {
        if (role === "STUDENT_ROLE") {
          navigate("/inicio");
        } else {
          navigate("/");
        }
      }
    }
  }, [userLogged]);
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
