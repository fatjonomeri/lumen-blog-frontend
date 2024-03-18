import { Button, InputText } from "@fattureincloud/fic-design-system";
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
      {/* <Header /> */}
      <p>{data?.title}</p>
      <p>{data?.text}</p>
      <InputText
        inputSize="large"
        inputType="text"
        label={<label>Comment</label>}
        placeholder="Add comment"
        onChange={(e) => setNewComment(e.target.value)}
        status="normal"
        value={newComment}
      ></InputText>
      <Button text="Add comment" onClick={handleSubmit}></Button>
      {comments.map((comment) => (
        <div style={{ border: "1px solid grey" }}>
          <p>{comment.text}</p>
          {userInfo.id === comment.user.id && (
            <>
              <Button
                text="Edit"
                onClick={() => handleEditModal(comment.text, comment.id)}
              ></Button>
              <Button
                text="Delete"
                color="red"
                onClick={() =>
                  dispatch(
                    deleteComment({ id, accessToken, commentId: comment.id })
                  )
                }
              ></Button>
            </>
          )}
        </div>
      ))}

      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <div>
          <form>
            <div>
              <label htmlFor="title">Comment:</label>
              <input
                type="text"
                id="title"
                value={editCommentText}
                onChange={(e) => setEditCommentText(e.target.value)}
              />
            </div>
            <Button text="Submit" onClick={handleEditSubmit}></Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default PostDetails;
