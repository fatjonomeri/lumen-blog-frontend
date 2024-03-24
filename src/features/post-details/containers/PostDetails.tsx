import { Button } from "@fattureincloud/fic-design-system";
import { useFetchApi } from "../../../hooks/useFetchApi.ts";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  RootComments,
  addNewComment,
  fetchComments,
  updateComment,
} from "../commentsSlice.ts";
import Header from "../../homepage/Header.tsx";
import {
  AddCommentButtonDiv,
  CommentTextArea,
} from "../styles/PostDetailsStyles.js";
import CommentComponent from "../components/CommentComponent.tsx";
import PostDetailsCard from "../components/PostDetailsCard.tsx";
import EditCommentModal from "../components/EditCommentModal.tsx";
import { RootState } from "../../auth/authSlice.ts";

const PostDetails: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchApi(`/posts/${id}`, "GET");

  const [newComment, setNewComment] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editCommentText, setEditCommentText] = useState("");
  const [commentIdToEdit, setCommentIdToEdit] = useState<string | null>(null);

  const { status, comments } = useSelector(
    (state: RootComments) => state.comments
  );
  const { userInfo, accessToken, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(id));
  }, []);

  const handleSubmit = () => {
    const body = new FormData();
    body.append("text", newComment);
    body.append("post_id", id);

    dispatch(addNewComment({ id, body, accessToken })).then((r) => {
      if (!r.error) {
        setNewComment("");
      }
    });
  };

  const handleEditModal = (commentText: string, commentId: string) => {
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
      <PostDetailsCard data={data} />
      <CommentTextArea
        inputSize="large"
        inputType="text"
        // label={<label>Comment</label>}
        placeholder="Add comment"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewComment(e.target.value)
        }
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
      <CommentComponent
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
