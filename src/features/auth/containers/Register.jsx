import { useEffect, useRef, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userRegister } from "../authSlice.js";
import { useNavigate } from "react-router-dom";
import {
  ButtonWrapper,
  CardWrapper,
  FooterWrapper,
  FormTitle,
  InputWrapper,
} from "../styles/LoginStyles";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { status, userInfo, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formdata = new FormData();
  const inputRef = useRef(null);

  const handleRegister = () => {
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("first_name", firstName);
    formdata.append("last_name", lastName);

    const formdataLogin = new FormData();
    formdataLogin.append("email", email);
    formdataLogin.append("password", password);

    dispatch(userRegister(formdata));

    if (status === " succeeded") {
      dispatch(userLogin(formdataLogin));
      navigate("/");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <CardWrapper type="secondary" elevation="1" color="blue">
        <FormTitle>Register</FormTitle>
        <form>
          <InputWrapper
            ref={inputRef}
            inputSize="large"
            inputType="text"
            color="white"
            label="First Name"
            // placeholder="First Name"
            required
            onChange={(e) => setFirstName(e.target.value)}
            status={error?.first_name?.length > 0 ? "error" : "normal"}
            value={firstName}
          />
          <InputWrapper
            inputSize="large"
            inputType="text"
            color="white"
            label="Last Name"
            // placeholder="Last Name"
            required
            onChange={(e) => setLastName(e.target.value)}
            status={error?.last_name?.length > 0 ? "error" : "normal"}
            value={lastName}
          />
          <InputWrapper
            inputSize="large"
            inputType="text"
            label={<label>Email</label>}
            // placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            status={error?.email.length > 0 ? "error" : "normal"}
            value={email}
          />
          <InputWrapper
            inputSize="large"
            inputType="password"
            color="white"
            label="Password"
            // placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            status={error?.password.length > 0 ? "error" : "normal"}
            value={password}
          />
        </form>
        <ButtonWrapper
          text="Register"
          isDisabled={status === "loading"}
          isLoading={status === "loading"}
          onClick={handleRegister}
          size="large"
        ></ButtonWrapper>
      </CardWrapper>

      <FooterWrapper elevation="0" color="transparent" type="primary">
        Already have an account? <a href="/login">Login</a>
      </FooterWrapper>
    </>
  );
};

export default Register;
