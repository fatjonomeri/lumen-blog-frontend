import Logout from "../auth/Logout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useGetUserDetailsQuery } from "../auth/authApiSlice";
import { setCredentials, logout } from "../auth/authSlice";

const Homepage = () => {
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });

  console.log(data);

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return <>{isAuthenticated ? <Logout /> : <div>Login first</div>}</>;
};

export default Homepage;
