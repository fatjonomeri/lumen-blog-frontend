import { Button } from "@fattureincloud/fic-design-system";
import React from "react";
import { logout, userLogout } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";

const Logout = () => {
  const { userInfo, isAuthenticated, accessToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(userLogout(accessToken));
    dispatch(userLogout(accessToken));
  };
  return (
    <Button
      onClick={handleLogout}
      text={"Logout"}
      size="medium"
      type="text"
    ></Button>
  );
};

export default Logout;
