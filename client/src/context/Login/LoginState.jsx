import { useReducer } from "react";
import LoginReducer from "./LoginReducer";
import LoginContext from "./LoginContext";

function LoginState(props) {
  const initialState = {
    userLogged: null,
  };

  const [state, dispatch] = useReducer(LoginReducer, initialState);

  const setUser = (user) => {
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };

  return (
    <LoginContext.Provider value={{ userLogged: state.userLogged, setUser }}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginState;
