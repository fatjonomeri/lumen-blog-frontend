import { Avatar, Button, Card } from "@fattureincloud/fic-design-system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, deletePost, fetchPosts, updatePost } from "./postsSlice";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box, Grid } from "@mui/material";
import { FormTitle } from "../auth/styles/LoginStyles";
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

const PostList = () => {
  const { status, posts, error } = useSelector((state) => state.posts);
  const { userInfo, accessToken, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          onClick={() => setOpenAddModal(true)}
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
            <PostCard elevation="1" color="grey" type="secondary">
              <PostHeader>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.text.substring(0, 125)}...</PostContent>
                {userInfo?.picture ? (
                  <PostUser>
                    <Avatar size={32} image={post.user.picture} randomColor />
                    <p>{post.user.full_name}</p>
                  </PostUser>
                ) : (
                  <>
                    <Avatar size={32} text={post.user.full_name} randomColor />
                    <p>{post.user.full_name}</p>
                  </>
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
        <div>
          <form>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="text">Text:</label>
              <input
                type="text"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <Button text="Submit" onClick={handleSubmit}></Button>
          </form>
        </div>
      </Modal>

      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <div>
          <form>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="text">Text:</label>
              <input
                type="text"
                id="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            </div>
            <Button text="Submit" onClick={handleEditSubmit}></Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default PostList;
