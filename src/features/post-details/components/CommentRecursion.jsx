import { Avatar, Button, TextArea } from "@fattureincloud/fic-design-system";
import React, { useState } from "react";
import {
  CommentUserInfo,
  PostDate,
  SingleComment,
} from "../styles/PostDetailsStyles.js";
import dateFormat from "dateformat";
import { useDispatch } from "react-redux";
import { deleteComment } from "../commentsSlice.ts";
// import { Comment } from "../commentsSlice.ts";
// import { UserInfo } from "../../auth/authSlice.ts";
import ReplyCommentModal from "./ReplyCommentModal.tsx";

const CommentRecursion = ({
  comment,
  allComments,
  level,
  userInfo,
  handleEditModal,
  accessToken,
  id,
  isAuthenticated,
  replyCommentText,
  setReplyCommentText,
  handleReplySubmit,
  setCommentIdToReply,
  setOpenReplyModal,
  openReplyModal,
  handleReplyModalOpen,
}) => {
  const dispatch = useDispatch();
  const renderReplies = () => {
    if (!comment.replies) return null;
    return comment.replies.map((replyId) => {
      const replyComment = allComments.find(
        (comment) => comment.id === replyId
      );
      console.log(replyComment);
      return (
        <CommentRecursion
          key={replyComment.id}
          comment={replyComment}
          allComments={allComments}
          level={level + 1}
        />
      );
    });
  };

  const replyStyle = {
    marginLeft: `${level * 30}px`,
  };

  return (
    // <div className="comment" style={replyStyle}>
    //   <div className="comment-content">
    //     <p>{comment.text}</p>
    //     <p>Comment by: {comment.user.full_name}</p>
    //   </div>
    //   <div className="replies">{renderReplies()}</div>
    // </div>
    <div style={replyStyle}>
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
        {isAuthenticated && (
          <Button
            text="Reply"
            type="text"
            onClick={() => handleReplyModalOpen(comment.id)}
          ></Button>
        )}
      </SingleComment>
      <>{renderReplies()}</>
      <ReplyCommentModal
        openReplyModal={openReplyModal}
        setOpenReplyModal={setOpenReplyModal}
        replyCommentText={replyCommentText}
        setReplyCommentText={setReplyCommentText}
        handleReplySubmit={handleReplySubmit}
      />
    </div>
  );
};

export default CommentRecursion;
