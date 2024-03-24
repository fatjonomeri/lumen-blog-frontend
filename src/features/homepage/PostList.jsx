import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, clearError } from "./postsSlice";
import { AddNewButton } from "./styles/HomepageStyles";
import EditPostModal from "./components/EditPostModal";
import AddPostModal from "./components/AddPostModal";
import PostsGrid from "./components/PostsGrid";

const PostList = () => {
  const { status, posts, error } = useSelector((state) => state.posts);
  const { userInfo, accessToken, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const inputAddRef = useRef(null);
  const inputEditRef = useRef(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");

  const [postIdToEdit, setPostIdToEdit] = useState(null);

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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    dispatch(clearError("title"));
  };

  const handleTextChange = (e) => {
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
