import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:8081";

export const userRegister = createAsyncThunk(
  "auth/register",
  async (body, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post(`${backendURL}/auth/register`, body, config);
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/auth/login`,
        body,
        config
      );
      localStorage.setItem("accessToken", data.access_token);
      return data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (accessToken, { rejectWithValue }) => {
    const body = new FormData();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const { data } = await axios.post(
        `${backendURL}/auth/logout`,
        body,
        config
      );
      return data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  status: "idle",
  userInfo: {},
  error: null,
  isAuthenticated: false,
  accessToken: localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.status = "idle";
      state.userInfo = null;
      state.accessToken = null;
      state.error = null;
      state.isAuthenticated = false;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userRegister.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.userInfo = action.payload;
        state.accessToken = action.payload.access_token;
        state.isAuthenticated = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        localStorage.removeItem("accessToken");
        state.status = "idle";
        state.userInfo = null;
        state.accessToken = null;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
