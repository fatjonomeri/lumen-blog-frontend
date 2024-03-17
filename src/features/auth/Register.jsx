// import { Radio } from '@fattureincloud/fic-design-system'
import { Button, InputText } from "@fattureincloud/fic-design-system";
import { useEffect, useState } from "react";
import { useSessionStorage } from "react-use";
// import { useFetchApi } from "./hooks/useFetchApi";
import { useFetchApi } from "../../hooks/useFetchApi.ts";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "./authSlice.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { status, userInfo, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [sessionToken, setSessionToken] = useSessionStorage("sessionToken", "");
  const formdata = new FormData();

  // const { isLoading, data, error, fetchApi } = useFetchApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegister = () => {
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("first_name", firstName);
    formdata.append("last_name", lastName);
    // fetchApi("/auth/register", formdata, "POST");
    dispatch(userRegister(formdata));
    // console.log(response.json());
  };

  useEffect(() => {
    if (status === "succeeded") navigate("/");
  }, [navigate, status]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      {/* <Radio value={true } /> */}
      {/* <Button text="button1"/> */}
      <InputText
        inputSize="large"
        inputType="text"
        label={<label>Email</label>}
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
        // setValue={(e) => setEmail(e.target.value)}
        status="normal"
        value={email}
      />
      <InputText
        inputSize="large"
        inputType="text"
        color="white"
        label="Password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
        // setValue={function noRefCheck(){}}
        // type="password"
        status="normal"
        value={password}
      />
      <InputText
        inputSize="large"
        inputType="text"
        color="white"
        label="First Name"
        placeholder="First Name"
        required
        onChange={(e) => setFirstName(e.target.value)}
        // setValue={function noRefCheck(){}}
        // type="password"
        status="normal"
        value={firstName}
      />
      <InputText
        inputSize="large"
        inputType="text"
        color="white"
        label="Last Name"
        placeholder="Last Name"
        required
        onChange={(e) => setLastName(e.target.value)}
        // setValue={function noRefCheck(){}}
        // type="password"
        status="normal"
        value={lastName}
      />
      <Button
        text="Register"
        isDisabled={status === "loading"}
        isLoading={status === "loading"}
        onClick={handleRegister}
      ></Button>
    </>
  );
};

export default Register;
