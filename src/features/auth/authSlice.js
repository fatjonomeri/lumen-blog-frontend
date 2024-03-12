import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  userInfo: {}, // for user object
  error: null,
  isAuthenticated: false,
  accessToken: sessionStorage.getItem("accessToken") | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      console.log("🚀 ~ loginSuccess ~ action:", action.payload.accessToken);
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      //   setSessionToken(action.payload.accessToken);
      sessionStorage.setItem("accessToken", action.payload.accessToken);
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      sessionStorage.removeItem("accessToken");
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
