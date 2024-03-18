import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postsReducer from "../features/homepage/postsSlice";
import commentsReducer from "../features/post-details/commentsSlice";
import { authApi } from "../features/auth/authApiSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  // Optionally, you can whitelist or blacklist certain reducers
  whitelist: ["auth"], // only 'auth' reducer will be persisted
  blacklist: ["posts", "comments"], // 'posts' reducer will not be persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  posts: postsReducer,
  comments: commentsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: {
  //   auth: authReducer,
  //   [authApi.reducerPath]: authApi.reducer,
  //   posts: postsReducer,
  // },
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  // middleware: [thunk],
});

export const persistor = persistStore(store);
