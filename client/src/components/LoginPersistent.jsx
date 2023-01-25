import { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import LoginContext from "../context/Login/LoginContext";

function validateJSON(data) {
  try {
    JSON.parse(data);
    return data;
  } catch (err) {
    return null;
  }
}

function LoginPersistent({ children }) {
  const { setUser, userLogged } = useContext(LoginContext);
  useEffect(() => {
    const session = validateJSON(localStorage.getItem("session"));

    if (session) {
      const user = JSON.parse(session);

      if (!userLogged && user.hasOwnProperty("token")) {
        setUser({ id: user.id, email: user.email, token: user.token });
        // console.log(
        //   "🚀 ~ file: LoginPersistent.jsx:20 ~ useEffect ~ userLogged",
        //   userLogged
        // );
      }
    }
  });

  return children;
}

export default LoginPersistent;
