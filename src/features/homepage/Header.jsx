import { Avatar, Button } from "@fattureincloud/fic-design-system";
import Logout from "../auth/Logout";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout, checkToken } from "../auth/authSlice";
import {
  AvatarWrapper,
  Flex,
  HomeButton,
  ModalWrapper,
  Navbar,
} from "./styles/HomepageStyles";

const Header = () => {
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const navigate = useNavigate();
  const { userInfo, isAuthenticated, accessToken, status } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken(accessToken));
  }, [accessToken]);

  useEffect(() => {
    if (status === "failed") dispatch(logout());
  }, [status]);

  return (
    <Navbar elevation={1}>
      <HomeButton
        text="Home"
        type="text"
        onClick={() => navigate("/")}
      ></HomeButton>
      {isAuthenticated ? (
        <Flex>
          <Logout />
          {userInfo?.picture ? (
            <AvatarWrapper onMouseOver={() => setOpenProfileModal(true)}>
              <Avatar size={32} image={userInfo.picture} randomColor />
              <ModalWrapper
                id="profile-modal"
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
          ) : (
            <AvatarWrapper onMouseOver={() => setOpenProfileModal(true)}>
              <Avatar size={32} text={userInfo?.full_name} randomColor />
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
          )}
        </Flex>
      ) : (
        <Button
          onClick={() => navigate("/login")}
          text={"Login"}
          type="text"
        ></Button>
      )}
    </Navbar>
  );
};

export default Header;
