import { Button, InputHelper } from "@fattureincloud/fic-design-system";
import React from "react";
import { InputAreaWrapper, ModalCard } from "../styles/HomepageStyles";
import { FormTitle, InputWrapper } from "../../auth/styles/LoginStyles";
import { Modal } from "@mui/material";

interface AddPostModalProps {
  openAddModal: boolean;
  title: string;
  text: string;
  error: any;
  handleSubmit: (e) => void;
  status: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setOpenAddModal: (open: boolean) => void;
  inputAddRef: React.RefObject<HTMLInputElement>;
}

const AddPostModal: React.FC<AddPostModalProps> = ({
  openAddModal,
  title,
  text,
  error,
  handleSubmit,
  status,
  handleTitleChange,
  handleTextChange,
  setOpenAddModal,
  inputAddRef,
}) => {
  return (
    <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
      <ModalCard elevation="1" color="grey" type="secondary">
        <FormTitle>Add new post</FormTitle>
        <form>
          <InputWrapper
            inputType="text"
            id="title"
            ref={inputAddRef}
            label="Title:"
            required
            inputSize="large"
            value={title}
            // status={error?.email?.length > 0 ? "error" : "normal"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleTitleChange(e)
            }
          />
          {error?.title?.length > 0 && (
            <InputHelper
              icon={{
                icon: {
                  icon: [
                    512,
                    512,
                    [],
                    "f013",
                    "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z",
                  ],
                  iconName: "cog",
                  prefix: "fal",
                },
              }}
              message={error.title[0]}
              status="error"
            />
          )}
          <InputAreaWrapper
            inputType="text"
            id="text"
            label="Text:"
            required
            inputSize="large"
            value={text}
            // status={error?.email?.length > 0 ? "error" : "normal"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleTextChange(e)
            }
          />
          {error?.text?.length > 0 && (
            <InputHelper
              icon={{
                icon: {
                  icon: [
                    512,
                    512,
                    [],
                    "f013",
                    "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z",
                  ],
                  iconName: "cog",
                  prefix: "fal",
                },
              }}
              message={error.text[0]}
              status="error"
            />
          )}

          <Button
            text="Submit"
            onClick={handleSubmit}
            isDisabled={status === "pending"}
            isLoading={status === "pending"}
          ></Button>
        </form>
      </ModalCard>
    </Modal>
  );
};

export default AddPostModal;
