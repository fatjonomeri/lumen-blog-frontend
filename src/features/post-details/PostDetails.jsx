import {
  Avatar,
  Button,
  Card,
  InputText,
  TextArea,
} from "@fattureincloud/fic-design-system";
import { useFetchApi } from "../../hooks/useFetchApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewComment,
  deleteComment,
  fetchComments,
  updateComment,
} from "./commentsSlice";
import Header from "../homepage/Header";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { FormTitle } from "../auth/styles/LoginStyles";
import dateFormat from "dateformat";

const PostDetailCard = styled(Card)`
  text-align: start;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(255, 255, 255) !important;
`;

const PostUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > p {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const PostDate = styled.p`
  color: grey;
`;

const CommentTextArea = styled(TextArea)`
  margin-bottom: 10px;
`;

const AddCommentButtonDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const SingleComment = styled(Card)`
  background-color: rgb(255, 255, 255) !important;
  margin-bottom: 10px;
  text-align: start;
`;

const CommentUserInfo = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 10px;
  align-items: center;
  justify-content: start;
`;

const ModalCard = styled(Card)`
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

const PostDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchApi(`/posts/${id}`, "GET");

  const [newComment, setNewComment] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editCommentText, setEditCommentText] = useState("");
  const [commentIdToEdit, setCommentIdToEdit] = useState(null);

  const { status, comments, error } = useSelector((state) => state.comments);
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(id));
  }, []);

  const handleSubmit = () => {
    const body = new FormData();
    body.append("text", newComment);
    body.append("post_id", id);

    dispatch(addNewComment({ id, body, accessToken }));
  };

  const handleEditModal = (commentText, commentId) => {
    setCommentIdToEdit(commentId);
    setEditCommentText(commentText);
    setOpenEditModal(true);
  };

  const handleEditSubmit = () => {
    const body = new FormData();
    body.append("text", editCommentText);

    dispatch(updateComment({ id, body, accessToken, commentIdToEdit }));
    setOpenEditModal(false);
  };

  return (
    <div>
      <Header />
      <PostDetailCard elevation="1" color="blue" type="secondary">
        <FormTitle>{data?.title}</FormTitle>
        <p>{data?.text}</p>
        {data?.user.picture ? (
          <PostUser>
            <p>Posted by </p>
            <Avatar size={32} image={data?.user.picture} randomColor />
            <p>{data?.user.full_name} </p>
            <PostDate>
              on {dateFormat(data.created_at, "dddd, mmmm dS, yyyy")}
            </PostDate>
          </PostUser>
        ) : (
          <>
            <Avatar size={32} text={data?.user.full_name} randomColor />
            <p>{data?.user.full_name}</p>
          </>
        )}
      </PostDetailCard>
      <CommentTextArea
        inputSize="large"
        inputType="text"
        // label={<label>Comment</label>}
        placeholder="Add comment"
        onChange={(e) => setNewComment(e.target.value)}
        status="normal"
        value={newComment}
      ></CommentTextArea>
      <AddCommentButtonDiv>
        <Button text="Add comment" onClick={handleSubmit}></Button>
      </AddCommentButtonDiv>
      {comments.map((comment) => (
        <SingleComment elevation="1" color="grey" type="secondary">
          <CommentUserInfo>
            {comment.user.picture ? (
              <>
                <Avatar size={32} image={comment.user.picture} randomColor />
                <p>{comment.user.full_name} </p>
                <PostDate>
                  on {dateFormat(comment.created_at, "mmmm dS, yyyy")}
                </PostDate>
              </>
            ) : (
              <>
                <Avatar size={32} text={comment.user.full_name} randomColor />
                <p>{comment.user.full_name}</p>
              </>
            )}
          </CommentUserInfo>
          <p>{comment.text}</p>
          {userInfo?.id === comment.user.id && (
            <>
              <Button
                text="Edit"
                type="text"
                onClick={() => handleEditModal(comment.text, comment.id)}
              ></Button>
              <Button
                text="Delete"
                color="red"
                type="text"
                onClick={() =>
                  dispatch(
                    deleteComment({ id, accessToken, commentId: comment.id })
                  )
                }
              ></Button>
            </>
          )}
        </SingleComment>
      ))}

      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <ModalCard elevation="1" color="grey" type="secondary">
          <FormTitle>Edit comment</FormTitle>
          <form>
            <InputAreaWrapper
              inputType="text"
              id="title"
              // ref={inputAddRef}
              label="Comment:"
              required
              inputSize="large"
              isPrefilled={true}
              value={editCommentText}
              isPrefilled={true}
              // status={error?.email?.length > 0 ? "error" : "normal"}
              onChange={(e) => setEditCommentText(e.target.value)}
            />
            <Button text="Submit" onClick={handleEditSubmit}></Button>
          </form>
        </ModalCard>
      </Modal>
    </div>
  );
};

export default PostDetails;
