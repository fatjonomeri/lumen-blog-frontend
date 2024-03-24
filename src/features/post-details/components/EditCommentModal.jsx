import { Button, Modal } from "@fattureincloud/fic-design-system";
import React from "react";
import { InputAreaWrapper, ModalCard } from "../styles/PostDetailsStyles";
import { FormTitle } from "../../auth/styles/LoginStyles";

const EditCommentModal = ({
  openEditModal,
  setOpenEditModal,
  setEditCommentText,
  editCommentText,
  handleEditSubmit,
}) => {
  return (
    <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
      <ModalCard elevation="1" color="grey" type="secondary">
        <FormTitle>Edit comment</FormTitle>
        <form>
          <InputAreaWrapper
            inputType="text"
            id="title"
            // ref={inputAddRef}
            label="Comment:"
            required
            inputSize="large"
            value={editCommentText}
            isPrefilled={true}
            // status={error?.email?.length > 0 ? "error" : "normal"}
            onChange={(e) => setEditCommentText(e.target.value)}
          />
          <Button text="Submit" onClick={handleEditSubmit}></Button>
        </form>
      </ModalCard>
    </Modal>
  );
};

export default EditCommentModal;
