import {
  Avatar,
  Button,
  Card,
  TextArea,
} from "@fattureincloud/fic-design-system";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, deletePost, fetchPosts, updatePost } from "./postsSlice";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box, Grid } from "@mui/material";
import { FormTitle, InputWrapper } from "../auth/styles/LoginStyles";
import { format } from "date-fns";
import dateFormat from "dateformat";

const AddNewButton = styled(Button)`
  position: fixed !important;
  bottom: 20px;
  right: 20px;
  border-radius: 50% !important;
  width: 60px !important;
  height: 60px;
`;

const PostCard = styled(Card)`
  background-color: rgb(255, 255, 255) !important;
  height: 400px;
  padding: 20px;
  border: 2px solid #fafafa !important;
  &:hover {
    border: 2px solid rgb(13, 151, 213) !important;
  }
`;

const PostTitle = styled(FormTitle)`
  height: 20%;
`;

const PostHeader = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostContent = styled.p`
  height: 30%;
`;

const PostDate = styled.h5`
  margin-bottom: 0;
  color: grey;
`;

const PostUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > p {
    margin-left: 5px;
  }
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

const PostList = () => {
  const { status, posts, error } = useSelector((state) => state.posts);
  const { userInfo, accessToken, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputAddRef = useRef(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");
  const [postIdToEdit, setPostIdToEdit] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("title", title);
    body.append("text", text);

    dispatch(addNewPost({ body, accessToken }));
  };

  const handleAddNewClick = () => {
    setOpenAddModal(true);
    inputAddRef.current?.focus();
  };

  useEffect(() => {
    inputAddRef.current?.focus();
    console.log(inputAddRef.current);
  }, [openAddModal]);

  const handleEditModal = (title, text, id) => {
    setPostIdToEdit(id);
    setEditTitle(title);
    setEditText(text);
    setOpenEditModal(true);
  };

  const handleEditSubmit = () => {
    const body = new FormData();
    body.append("title", editTitle);
    body.append("text", editText);

    dispatch(updatePost({ postIdToEdit, body, accessToken }));
    setOpenEditModal(false);
  };

  return (
    <div style={{ paddingTop: "35px" }}>
      {isAuthenticated && (
        <AddNewButton
          text="ADD NEW"
          color="green"
          onClick={() => handleAddNewClick()}
        ></AddNewButton>
      )}
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid
            item
            xs={12}
            md={4}
            key={post.id} // Make sure to add a unique key
          >
            <PostCard elevation="1" color="blue" type="secondary">
              <PostHeader>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.text.substring(0, 125)}...</PostContent>
                {post.user?.picture ? (
                  <PostUser>
                    <Avatar size={32} image={post.user.picture} randomColor />
                    <p>{post.user.full_name}</p>
                  </PostUser>
                ) : (
                  <PostUser>
                    <Avatar size={32} text={post.user.full_name} randomColor />
                    <p>{post.user.full_name}</p>
                  </PostUser>
                )}

                <PostDate>
                  {dateFormat(post.created_at, "dddd, mmmm dS, yyyy")}
                </PostDate>
              </PostHeader>
              <p>{post.comments_count} comments</p>
              {userInfo?.id === post.user.id && (
                <>
                  <Button
                    type="text"
                    text="Edit"
                    onClick={() =>
                      handleEditModal(post.title, post.text, post.id)
                    }
                  ></Button>
                  <Button
                    type="text"
                    text="Remove"
                    color="red"
                    onClick={() =>
                      dispatch(deletePost({ id: post.id, accessToken }))
                    }
                  ></Button>
                </>
              )}
              <Button
                type="text"
                text="Details"
                onClick={() => navigate(`/posts/${post?.id}`)}
              ></Button>
            </PostCard>
          </Grid>
        ))}
      </Grid>
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <ModalCard elevation="1" color="grey" type="secondary">
          <FormTitle>Add new post</FormTitle>
          <form>
            <InputWrapper
              inputType="text"
              id="title"
              ref={inputAddRef}
              label="Title:"
              required
              inputSize="large"
              value={title}
              // status={error?.email?.length > 0 ? "error" : "normal"}
              onChange={(e) => setTitle(e.target.value)}
            />

            <InputAreaWrapper
              inputType="text"
              id="text"
              label="Text:"
              required
              inputSize="large"
              value={text}
              // status={error?.email?.length > 0 ? "error" : "normal"}
              onChange={(e) => setText(e.target.value)}
            />
            <Button text="Submit" onClick={handleSubmit}></Button>
          </form>
        </ModalCard>
      </Modal>

      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <ModalCard elevation="1" color="grey" type="secondary">
          <FormTitle>Edit post</FormTitle>
          <form>
            <InputWrapper
              inputType="text"
              id="title"
              ref={inputAddRef}
              label="Title:"
              required
              inputSize="large"
              value={editTitle}
              isPrefilled={true}
              // status={error?.email?.length > 0 ? "error" : "normal"}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <InputAreaWrapper
              inputType="text"
              id="text"
              label="Text:"
              required
              inputSize="large"
              value={editText}
              isPrefilled={true}
              // status={error?.email?.length > 0 ? "error" : "normal"}
              onChange={(e) => setEditText(e.target.value)}
            />
            <Button text="Submit" onClick={handleEditSubmit}></Button>
          </form>
        </ModalCard>
      </Modal>
    </div>
  );
};

export default PostList;
