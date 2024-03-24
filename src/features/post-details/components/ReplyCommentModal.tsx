import { Button } from "@fattureincloud/fic-design-system";
import React from "react";
import { InputAreaWrapper, ModalCard } from "../styles/PostDetailsStyles";
import { FormTitle } from "../../auth/styles/LoginStyles";
import { Modal } from "@mui/material";
import { Props } from "@fattureincloud/fic-design-system/dist/common/components/Spinner";

interface Props {
  openReplyModal: boolean;
  setOpenReplyModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReplyCommentText: React.Dispatch<React.SetStateAction<string>>;
  replyCommentText: string;
  handleReplySubmit: () => void;
}

const ReplyCommentModal: React.FC<Props> = ({
  openReplyModal,
  setOpenReplyModal,
  replyCommentText,
  setReplyCommentText,
  handleReplySubmit,
}) => {
  return (
    <Modal open={openReplyModal} onClose={() => setOpenReplyModal(false)}>
      <ModalCard elevation="1" color="grey" type="secondary">
        <FormTitle>Reply to comment</FormTitle>
        <form>
          <InputAreaWrapper
            inputType="text"
            id="title"
            // ref={inputAddRef}
            label="Comment:"
            required
            inputSize="large"
            value={replyCommentText}
            // status={error?.email?.length > 0 ? "error" : "normal"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setReplyCommentText(e.target.value)
            }
          />
          <Button text="Submit" onClick={handleReplySubmit}></Button>
        </form>
      </ModalCard>
    </Modal>
  );
};

export default ReplyCommentModal;
