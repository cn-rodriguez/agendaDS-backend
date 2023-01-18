import { GoogleLogin } from "@react-oauth/google";
import { handleCredentialResponse } from "../../helpers/handleCredentialResponse";

export default function LoginForm() {
  return (
    <GoogleLogin
      onSuccess={handleCredentialResponse}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
