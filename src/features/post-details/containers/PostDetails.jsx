import { Button } from "@fattureincloud/fic-design-system";
import { useFetchApi } from "../../../hooks/useFetchApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, fetchComments, updateComment } from "../commentsSlice";
import Header from "../../homepage/Header";
import {
  AddCommentButtonDiv,
  CommentTextArea,
} from "../styles/PostDetailsStyles";
import Comment from "../components/Comment";
import PostDetailsCard from "../components/PostDetailsCard";
import EditCommentModal from "../components/EditCommentModal";

const PostDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchApi(`/posts/${id}`, "GET");

  const [newComment, setNewComment] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editCommentText, setEditCommentText] = useState("");
  const [commentIdToEdit, setCommentIdToEdit] = useState(null);

  const { status, comments, error } = useSelector((state) => state.comments);
  const { userInfo, accessToken, isAuthenticated } = useSelector(
    (state) => state.auth
  );
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

  console.log(data);

  return (
    <div>
      <Header />
      <PostDetailsCard data={data} />
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
        <Button
          text="Add comment"
          onClick={handleSubmit}
          isDisabled={!isAuthenticated}
          isLoading={status === "pending"}
        ></Button>
      </AddCommentButtonDiv>
      <Comment
        comments={comments}
        userInfo={userInfo}
        handleEditModal={handleEditModal}
        accessToken={accessToken}
        id={id}
      />

      <EditCommentModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        setEditCommentText={setEditCommentText}
        editCommentText={editCommentText}
        handleEditSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default PostDetails;
