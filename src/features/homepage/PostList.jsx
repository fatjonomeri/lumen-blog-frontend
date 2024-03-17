import { Button } from "@fattureincloud/fic-design-system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, deletePost, fetchPosts, updatePost } from "./postsSlice";
import Modal from "@mui/material/Modal";

const PostList = () => {
  const { status, posts, error } = useSelector((state) => state.posts);
  const { userInfo, accessToken, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

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
    <div>
      {isAuthenticated && (
        <Button
          text="ADD NEW"
          color="green"
          onClick={() => setOpenAddModal(true)}
        ></Button>
      )}
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.text.substring(0, 75)}...</p>
          <p>{post.comments_count} comments</p>
          {userInfo?.id === post.user.id && (
            <>
              <Button
                text="Edit"
                onClick={() => handleEditModal(post.title, post.text, post.id)}
              ></Button>
              <Button
                text="Remove"
                color="red"
                onClick={() =>
                  dispatch(deletePost({ id: post.id, accessToken }))
                }
              ></Button>
            </>
          )}
          <Button text="Details"></Button>
        </article>
      ))}

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
