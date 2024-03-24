import { Modal } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { InputAreaWrapper, ModalCard } from "../styles/HomepageStyles";
import { FormTitle, InputWrapper } from "../../auth/styles/LoginStyles";
import { Button } from "@fattureincloud/fic-design-system";
import { useDispatch } from "react-redux";
import { updatePost } from "../postsSlice.ts";

interface EditPostModalProps {
  editTitle: string;
  editText: string;
  postIdToEdit: number | null;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditText: React.Dispatch<React.SetStateAction<string>>;
  openEditModal: boolean;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string | null;
  status: string;
  inputEditRef: React.RefObject<HTMLInputElement>;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  editTitle,
  editText,
  postIdToEdit,
  setEditText,
  setEditTitle,
  openEditModal,
  setOpenEditModal,
  accessToken,
  status,
  inputEditRef,
}) => {
  const dispatch = useDispatch();

  const handleEditSubmit = () => {
    const body = new FormData();
    body.append("title", editTitle);
    body.append("text", editText);

    dispatch(updatePost({ postIdToEdit, body, accessToken })).then((r) => {
      if (!r.error) {
        setEditTitle("");
        setEditText("");
        setOpenEditModal(false);
      }
    });
  };

  return (
    <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
      <ModalCard elevation="1" color="grey" type="secondary">
        <FormTitle>Edit post</FormTitle>
        <form>
          <InputWrapper
            inputType="text"
            id="title"
            ref={inputEditRef}
            label="Title:"
            required
            inputSize="large"
            value={editTitle}
            isPrefilled={true}
            // status={error?.email?.length > 0 ? "error" : "normal"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditTitle(e.target.value)
            }
          />
          <InputAreaWrapper
            inputType="text"
            id="text"
            label="Text:"
            required
            inputSize="large"
            value={editText}
            isPrefilled={true}
            // status={error?.email?.length > 0 ? "error" : "normal"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditText(e.target.value)
            }
          />

          <Button
            text="Submit"
            onClick={handleEditSubmit}
            isDisabled={status === "pending"}
            isLoading={status === "pending"}
          ></Button>
        </form>
      </ModalCard>
    </Modal>
  );
};

export default EditPostModal;