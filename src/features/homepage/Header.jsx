import { Button } from "@fattureincloud/fic-design-system";
import Logout from "../auth/Logout";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "../auth/authApiSlice";
import { useEffect } from "react";
import { logout, setCredentials } from "../auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const { userInfo, isAuthenticated, accessToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const { data, isFetching, refetch, error } = useGetUserDetailsQuery(
    "userDetails",
    {
      pollingInterval: 900000,
    }
  );

  useEffect(() => {
    // refetch();
    if (data) {
      dispatch(setCredentials(data));
    } else if (error) {
      dispatch(logout());
    }
  }, [data, dispatch, error]);

  return (
    <>
      {isAuthenticated ? (
        <Logout />
      ) : (
        <Button onClick={() => navigate("/login")} text={"Login"}></Button>
      )}
    </>
  );
};

export default Header;
