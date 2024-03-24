import { Button, Card, TextArea } from "@fattureincloud/fic-design-system";
import { FormTitle } from "../../auth/styles/LoginStyles";
import styled from "styled-components";

export const AddNewButton = styled(Button)`
  position: fixed !important;
  bottom: 20px;
  right: 20px;
  border-radius: 50% !important;
  width: 60px !important;
  height: 60px;
`;

export const PostCard = styled(Card)`
  background-color: rgb(255, 255, 255) !important;
  height: 400px;
  padding: 20px;
  border: 2px solid #fafafa !important;
  &:hover {
    border: 2px solid rgb(13, 151, 213) !important;
  }
`;

export const PostTitle = styled(FormTitle)`
  height: 20%;
`;

export const PostHeader = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PostContent = styled.p`
  height: 30%;
`;

export const PostDate = styled.h5`
  margin-bottom: 0;
  color: grey;
`;

export const PostUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > p {
    margin-left: 5px;
  }
`;

export const ModalCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
`;

export const InputAreaWrapper = styled(TextArea)`
  align-items: flex-start;
  & > div {
    width: 100%;
    margin-bottom: 6px;
  }
`;

export const Navbar = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: white;
  z-index: 999;
  display: flex;
  // height: 30px;
  justify-content: space-between;
  align-items: center;
`;

export const ModalWrapper = styled(Card)`
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

export const AvatarWrapper = styled.div`
  margin: 5px 20px;
  &:hover div {
    display: block;
    z-index: 999;
  }
`;

export const HomeButton = styled(Button)`
  left: 0;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
`;
