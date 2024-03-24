import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserInfo } from "../auth/authSlice.ts";

const COMMENTS_URL = "http://localhost:8081/posts";

export interface Comment {
  id: number;
  text: string;
  created_at: string;
  updated_at: string;
  user: UserInfo;
  parent_id: number | null;
  replies: number[] | null;
}

export interface CommentsState { 
  comments: Comment[];
  status: string;
  error: {text: string[];  } | null;
}

export interface RootComments {
  comments: CommentsState
}

interface AddNewCommentArgs {
  id: string | undefined;
  body: FormData;
  accessToken: string | null;
}

interface ReplyToCommentArgs {
  id: string | undefined;
  body: FormData;
  accessToken: string | null;
  commentIdToReply: number | null;
}

interface DeleteCommentArgs {
  id: string | undefined;
  accessToken: string | null;
  commentId: number;
}

interface UpdateCommentArgs {
  id: string | undefined;
  body: FormData;
  accessToken: string | null;
  commentIdToEdit: string | null;
}

const initialState: CommentsState = {
  comments: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const response = await axios.get(`${COMMENTS_URL}/${postId}/comments`);
    return response.data;
  }
);

export const addNewComment = createAsyncThunk(
  "comments/addNewComment",
  async (args: AddNewCommentArgs) => {
    const { id: postId, body, accessToken } = args;
    const response = await axios.post(
      `${COMMENTS_URL}/${postId}/comments`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

export const replyToComment = createAsyncThunk(
  "comments/replyToComment",
  async (args: ReplyToCommentArgs) => {
    const { id: postId, body, accessToken, commentIdToReply } = args;
    const response = await axios.post(
      `${COMMENTS_URL}/${postId}/comments/${commentIdToReply}/reply`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (args: DeleteCommentArgs) => {
    const { id: postId, accessToken, commentId } = args;
    try {
      const response = await axios.delete(
        `${COMMENTS_URL}/${postId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response?.status === 200) return commentId;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (args: UpdateCommentArgs) => {
    const { id: postId, body, accessToken, commentIdToEdit: commentId } = args;
    const response = await axios.put(
      `${COMMENTS_URL}/${postId}/comments/${commentId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments.push(action.payload);
      }).addCase(replyToComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments.push(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id } = action.payload;
        const comments = state.comments.filter((comment) => comment.id !== id);
        state.comments = [...comments, action.payload];
      });
  },
});

// export const { postAdded } = commentsSlice.actions;

export default commentsSlice.reducer;
