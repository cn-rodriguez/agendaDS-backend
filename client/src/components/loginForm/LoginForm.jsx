import { GoogleLogin } from "@react-oauth/google";
import { handleCredentialResponse } from "../../helpers/handleCredentialResponse";
import { useLogin } from "../../hooks/useLogin";
// import { useState, useEffect } from "react";

export default function LoginForm() {
  // useEffect(() => {
  //   setUserLogged(localStorage.getItem("logged"));
  // }, []);
  // console.log(userLogged);

  return (
    <GoogleLogin
      onSuccess={handleCredentialResponse}
      // onSuccess={useLogin}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
