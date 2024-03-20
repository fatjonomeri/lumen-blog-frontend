// import { useState } from 'react'
import "./App.css";
import Register from "./features/auth/containers/Register";
import Login from "./features/auth/containers/Login";
import { Route, Routes } from "react-router-dom";
import Homepage from "./features/homepage/Homepage";
import PostDetails from "./features/post-details/PostDetails";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Homepage />} />
      <Route path="login" element={<Login />} />

      <Route path="register" element={<Register />} />
      <Route path="posts/:id" element={<PostDetails />} />
      {/* protected routes */}
    </Routes>
  );
}

export default App;
