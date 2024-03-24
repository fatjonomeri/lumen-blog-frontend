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
import { Comment } from "../commentsSlice.ts";
import { UserInfo } from "../../auth/authSlice.ts";
import ReplyCommentModal from "./ReplyCommentModal.tsx";
import CommentRecursion from "./CommentRecursion.jsx";

interface Props {
  comments: Comment[];
  userInfo: UserInfo | null;
  handleEditModal: (text: string, id: string) => void;
  accessToken: string | null;
  id: string | undefined;
  isAuthenticated: boolean | null;
  setReplyCommentText: React.Dispatch<React.SetStateAction<string>>;
  replyCommentText: string;
  handleReplySubmit: () => void;
  setCommentIdToReply: React.Dispatch<React.SetStateAction<number | null>>;
  setOpenReplyModal: React.Dispatch<React.SetStateAction<boolean>>;
  openReplyModal: boolean;
}

const CommentComponent: React.FC<Props> = ({
  comments,
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
}) => {
  const rootComments = comments.filter((comment) => !comment.parent_id);

  const dispatch = useDispatch();

  const handleReplyModalOpen = (commentId: number) => {
    console.log("🚀 ~ handleReplyModalOpen ~ commentId:", typeof commentId);
    setCommentIdToReply(commentId);
    setOpenReplyModal(true);
  };

  return (
    <>
      {rootComments.map((rootComment) => (
        <CommentRecursion
          key={rootComment.id}
          comment={rootComment}
          allComments={comments}
          level={0}
          userInfo={userInfo}
          handleEditModal={handleEditModal}
          accessToken={accessToken}
          id={id}
          isAuthenticated={isAuthenticated}
          replyCommentText={replyCommentText}
          setReplyCommentText={setReplyCommentText}
          handleReplySubmit={handleReplySubmit}
          setCommentIdToReply={setCommentIdToReply}
          setOpenReplyModal={setOpenReplyModal}
          openReplyModal={openReplyModal}
          handleReplyModalOpen={handleReplyModalOpen}
        />
      ))}
    </>

    // <>
    //   {comments.map((comment) => (
    //     <>
    //       <SingleComment elevation="1" color="grey" type="secondary">
    //         <CommentUserInfo>
    //           {comment.user.picture ? (
    //             <>
    //               <Avatar size={32} image={comment.user.picture} randomColor />
    //               <p>{comment.user.full_name} </p>
    //               <PostDate>
    //                 on {dateFormat(comment.created_at, "mmmm dS, yyyy")}
    //               </PostDate>
    //             </>
    //           ) : (
    //             <>
    //               <Avatar size={32} text={comment.user.full_name} randomColor />
    //               <p>{comment.user.full_name}</p>
    //             </>
    //           )}
    //         </CommentUserInfo>
    //         <p>{comment.text}</p>
    //         {userInfo?.id === comment.user.id && (
    //           <>
    //             <Button
    //               text="Edit"
    //               type="text"
    //               onClick={() => handleEditModal(comment.text, comment.id)}
    //             ></Button>
    //             <Button
    //               text="Delete"
    //               color="red"
    //               type="text"
    //               onClick={() =>
    //                 dispatch(
    //                   deleteComment({ id, accessToken, commentId: comment.id })
    //                 )
    //               }
    //             ></Button>
    //           </>
    //         )}
    //         {isAuthenticated && (
    //           <Button
    //             text="Reply"
    //             type="text"
    //             onClick={() => handleReplyModalOpen(comment.id)}
    //           ></Button>
    //         )}
    //       </SingleComment>
    //       <ReplyCommentModal
    //         openReplyModal={openReplyModal}
    //         setOpenReplyModal={setOpenReplyModal}
    //         replyCommentText={replyCommentText}
    //         setReplyCommentText={setReplyCommentText}
    //         handleReplySubmit={handleReplySubmit}
    //       />
    //     </>
    //   ))}
    // </>
  );
};

export default CommentComponent;
