import { useState, useEffect } from "react";

export const handleCredentialResponse = (response) => {
  const body = { id_token: response.credential };

  fetch("http://localhost:3001/api/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      const userLogged = {
        id: resp.user._id,
        email: resp.user.email,
      };
      localStorage.setItem("logged", JSON.stringify(userLogged));
    })
    .catch(console.warn);
  console.log("logeado");
};
