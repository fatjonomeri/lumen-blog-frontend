import { Avatar, Button } from "@fattureincloud/fic-design-system";
import React from "react";
import {
  CommentUserInfo,
  PostDate,
  SingleComment,
} from "../styles/PostDetailsStyles";
import dateFormat from "dateformat";
import { useDispatch } from "react-redux";
import { deleteComment } from "../commentsSlice";

const Comment = ({ comments, userInfo, handleEditModal, accessToken, id }) => {
  const dispatch = useDispatch();

  return (
    <>
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
    </>
  );
};

export default Comment;
