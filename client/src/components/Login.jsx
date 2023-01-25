import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/Login/LoginContext";

export default function Login() {
  function checkSession() {
    const session = localStorage.getItem("session");
    return session ? true : false;
  }
  // console.log(checkSession());
  const { setUser } = useContext(LoginContext);
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
        console.log(google);
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
      .then(() => navigate("./inicio"))
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
