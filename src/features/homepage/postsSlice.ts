import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserInfo } from "../auth/authSlice.ts";

const POSTS_URL = "http://localhost:8081/posts";


export interface Post {
  id: number;
  title: string;
  text: string;
  created_at: string;
  comments_count: number;
  user: UserInfo
}

export interface postsState { 
  posts: Post[];
  status: string;
  error: object | null
}

interface AddNewPostArgs {
  body: FormData;
  accessToken: string | null;
}

interface DeletePostArgs {
  id: number;
  accessToken: string | null;
}

interface UpdatePostArgs {
  postIdToEdit: number | null;
  body: FormData;
  accessToken: string | null;
}

export interface RootPosts {
  posts: {
    posts: Post[];
    status: string;
    error: { title: string[]; text: string[];  } | null;
  };
}

const initialState: postsState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (args: AddNewPostArgs, { rejectWithValue }) => {
    const { body, accessToken } = args;
    try {
      const response = await axios.post(POSTS_URL, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (args: DeletePostArgs) => {
  const { id, accessToken } = args;
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response?.status === 200) return id;
    return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
    return err.message;
  }
});

export const updatePost = createAsyncThunk("posts/updatePost", async (args: UpdatePostArgs) => {
  const { postIdToEdit: id, body, accessToken } = args;
  const response = await axios.put(`${POSTS_URL}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state, { payload }) => {
      // delete state.error.payload;
      state.error[payload] = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(addNewPost.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(addNewPost.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const { clearError } = postsSlice.actions;

export default postsSlice.reducer;
