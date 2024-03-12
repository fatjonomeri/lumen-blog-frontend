import { Button } from "@fattureincloud/fic-design-system";
import React from "react";
import { logout } from "./authSlice";
import { useDispatch } from "react-redux";
import { useSessionStorage } from "react-use";

const Logout = () => {
  // const [sessionToken, setSessionToken] = useSessionStorage("accessToken", "");

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // setSessionToken("");
  };
  return <Button onClick={handleLogout} text={"Logout"}></Button>;
};

export default Logout;
