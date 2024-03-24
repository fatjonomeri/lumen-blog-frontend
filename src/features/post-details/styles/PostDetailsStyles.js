import { Card, TextArea } from "@fattureincloud/fic-design-system";
import styled from "styled-components";

export const PostDetailCard = styled(Card)`
  text-align: start;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(255, 255, 255) !important;
`;

export const PostUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > p {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

export const PostDate = styled.p`
  color: grey;
`;

export const CommentTextArea = styled(TextArea)`
  margin-bottom: 10px;
`;

export const AddCommentButtonDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

export const SingleComment = styled(Card)`
  background-color: rgb(255, 255, 255) !important;
  margin-bottom: 10px;
  text-align: start;
`;

export const CommentUserInfo = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 10px;
  align-items: center;
  justify-content: start;
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
