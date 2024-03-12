import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./authSlice";
import { useFetchApi } from "../../hooks/useFetchApi";
import { useSessionStorage } from "react-use";

const Login = () => {
  const [sessionToken, setSessionToken] = useSessionStorage("accessToken", "");
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, data, error, fetchApi } = useFetchApi();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();
      body.append("email", email);
      body.append("password", password);

      const loginData = await fetchApi("/auth/login", body, "POST");

      // Dispatch login success action
      console.log(typeof loginData);
      const accessToken = JSON.parse(loginData);
      dispatch(loginSuccess({ accessToken: accessToken.access_token }));
      setSessionToken(accessToken.access_token);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
