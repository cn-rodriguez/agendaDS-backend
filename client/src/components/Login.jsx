import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/Login/LoginContext";

import jwt_decode from "jwt-decode";

export default function Login() {
  function checkSession() {
    const session = localStorage.getItem("session");
    return session ? true : false;
  }
  // console.log(checkSession());
  const { userLogged, setUser } = useContext(LoginContext);
  const navigate = useNavigate();
  // const [logged, setLogged] = useState({ id: "", email: "" });

  function handleCredentialResponse(response) {
    const body = { id_token: response.credential };
    fetch("http://localhost:3001/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        setUser({
          id: response.user._id,
          email: response.user.email,
          token: response.token,
        });

        localStorage.setItem(
          "session",
          JSON.stringify({
            id: response.user._id,
            email: response.user.email,
            token: response.token,
          })
        );
      })
      .then(() => {
        const { token } = JSON.parse(localStorage.getItem("session"));
        const { uid } = jwt_decode(token);
        const { role } = uid;
        if (role === "ADMIN_ROLE") {
          navigate("./directora");
        } else if (role === "TEACHER_ROLE") {
          navigate("./profesor");
        } else {
          navigate("./inicio");
        }
        // if ()
      })
      .catch(console.warn);
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    return () => {};
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  );
}
