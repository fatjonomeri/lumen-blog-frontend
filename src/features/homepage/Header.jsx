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

  // automatically authenticate user if token is found
  const { data, isFetching, refetch } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });

  console.log(data);

  useEffect(() => {
    refetch();
    if (data) {
      dispatch(setCredentials(data));
      console.log("dispatching credentials");
    } else if (!accessToken) {
      dispatch(logout());
    }
  }, [data, dispatch]);

  // useEffect(() => {
  //   // Update queryKey to trigger re-render
  //   setQueryKey((prevKey) => prevKey + 1);
  // }, []);

  console.log("header render");
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
