import { Button } from "@fattureincloud/fic-design-system";
import React from "react";
import { RootState, logout, userLogout } from "./authSlice.ts";
import { useDispatch, useSelector } from "react-redux";

const Logout: React.FC = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(userLogout(accessToken));
  };
  return (
    // @ts-ignore
    <Button
      onClick={handleLogout}
      text={"Logout"}
      size="medium"
      type="text"
    ></Button>
  );
};

export default Logout;
