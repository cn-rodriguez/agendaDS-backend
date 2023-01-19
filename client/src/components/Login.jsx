import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreContext from "../StoreContext";

export default function Login() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState({ id: "", email: "" });

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
        setLogged({ id: response.user._id, email: response.user.email });
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
    <StoreContext.Provider value={logged}>
      <div id="signInDiv"></div>
    </StoreContext.Provider>
  );
}
