import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, clearError, RootPosts } from "./postsSlice.ts";
import { AddNewButton } from "./styles/HomepageStyles.js";
import EditPostModal from "./components/EditPostModal.tsx";
import AddPostModal from "./components/AddPostModal.tsx";
import PostsGrid from "./components/PostsGrid.tsx";
import { RootState } from "../auth/authSlice.ts";

const PostList = () => {
  const { posts, status, error } = useSelector(
    (state: RootPosts) => state.posts
  );
  const { userInfo, accessToken, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const inputAddRef = useRef(null);
  const inputEditRef = useRef(null);

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editText, setEditText] = useState<string>("");

  const [postIdToEdit, setPostIdToEdit] = useState<number | null>(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("title", title);
    body.append("text", text);

    dispatch(addNewPost({ body, accessToken })).then((r) => {
      console.log(r);
      if (!r.error) {
        setTitle("");
        setText("");
        setOpenAddModal(false);
      }
    });
  };

  const handleAddNewClick = () => {
    setOpenAddModal(true);
  };

  useEffect(() => {
    setTimeout(() => {
      inputAddRef.current.focus();
    }, 1);
  }, [openAddModal]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    dispatch(clearError("title"));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    dispatch(clearError("text"));
  };

  const handleEditModal = (title, text, id) => {
    setPostIdToEdit(id);
    setEditTitle(title);
    setEditText(text);
    setOpenEditModal(true);
  };

  useEffect(() => {
    setTimeout(() => {
      inputEditRef.current.focus();
    }, 1);
  }, [openEditModal]);

  return (
    <div style={{ paddingTop: "35px" }}>
      {isAuthenticated && (
        <AddNewButton
          text="ADD NEW"
          color="green"
          onClick={() => handleAddNewClick()}
        ></AddNewButton>
      )}

      <PostsGrid
        posts={posts}
        userInfo={userInfo}
        handleEditModal={handleEditModal}
        accessToken={accessToken}
      />

      <AddPostModal
        openAddModal={openAddModal}
        title={title}
        error={error}
        text={text}
        handleSubmit={handleSubmit}
        status={status}
        handleTitleChange={handleTitleChange}
        handleTextChange={handleTextChange}
        setOpenAddModal={setOpenAddModal}
        inputAddRef={inputAddRef}
      />

      <EditPostModal
        editTitle={editTitle}
        editText={editText}
        postIdToEdit={postIdToEdit}
        setEditText={setEditText}
        setEditTitle={setEditTitle}
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        accessToken={accessToken}
        status={status}
        inputEditRef={inputEditRef}
      />
    </div>
  );
};

export default PostList;
