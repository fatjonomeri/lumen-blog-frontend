import { Avatar, Button, Card } from "@fattureincloud/fic-design-system";
import Logout from "../auth/Logout";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "../auth/authApiSlice";
import { useEffect } from "react";
import { logout, setCredentials, userLogout } from "../auth/authSlice";
import styled from "styled-components";
import { Modal } from "@mui/material";

const Navbar = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: white;
  z-index: 999;
  display: flex;
  justify-content: flex-end;
`;

const ModalWrapper = styled(Card)`
  display: none;
  width: 130px;
  padding: 10px;
  font-size: 0.75em;
  text-align: left;
  background-color: inherit;
  border-radius: 10px;
  border: 1px solid black;
  position: absolute;
  top: 100%;
  right: 0%;
  // margin-left: -75px;
  margin-top: 10px;
`;

const AvatarWrapper = styled.div`
  &:hover div {
    display: block;
  }
`;

const Header = () => {
  const [openProfileModal, setOpenProfileModal] = useState(false);

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
    refetch();
    if (data) {
      dispatch(setCredentials(data));
    } else if (error) {
      console.log("🚀 ~ useEffect ~ error:", error);
      dispatch(logout());
    }
  }, [data, dispatch]);

  return (
    <Navbar>
      {isAuthenticated ? (
        <>
          <Logout />
          {userInfo?.picture ? (
            <>
              <AvatarWrapper onMouseOver={() => setOpenProfileModal(true)}>
                <Avatar size={32} image={userInfo.picture} randomColor />
                <ModalWrapper
                  open={openProfileModal}
                  elevation="1"
                  type="secondary"
                  color="grey"
                >
                  <p>{userInfo?.full_name}</p>
                  <p>{userInfo?.email}</p>
                  <p>{userInfo?.first_name}</p>
                  <p>{userInfo?.last_name}</p>
                </ModalWrapper>
              </AvatarWrapper>
            </>
          ) : (
            <div>
              <Avatar size={32} text={userInfo?.full_name} randomColor />
            </div>
          )}
        </>
      ) : (
        <Button onClick={() => navigate("/login")} text={"Login"}></Button>
      )}
    </Navbar>
  );
};

export default Header;
