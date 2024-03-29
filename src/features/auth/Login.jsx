import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchApi } from "../../hooks/useFetchApi";
import { useSessionStorage } from "react-use";
import { userLogin } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@fattureincloud/fic-design-system";

const Login = () => {
  // const [sessionToken, setSessionToken] = useSessionStorage("accessToken", "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, userInfo, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { isLoading, data, error, fetchApi } = useFetchApi();

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("email", email);
    body.append("password", password);

    dispatch(userLogin(body));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div>
      {!isAuthenticated && (
        <>
          <h2>Login</h2>
          {/* {error && <p>{error}</p>} */}
          <form
            onSubmit={handleLogin} //fic button no type="submit" ???
          >
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <Button
              // type="submit"
              text="Login"
              isDisabled={status === "loading"}
              isLoading={status === "loading"}
              onClick={handleLogin}
            ></Button> */}
            <button type="submit">Login</button>
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
