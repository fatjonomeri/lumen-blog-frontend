// import { useState } from 'react'
import "./App.css";
import Register from "./features/auth/containers/Register.tsx";
import Login from "./features/auth/containers/Login.tsx";
import { Route, Routes } from "react-router-dom";
import Homepage from "./features/homepage/containers/Homepage.tsx";
import PostDetails from "./features/post-details/containers/PostDetails.tsx";

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
