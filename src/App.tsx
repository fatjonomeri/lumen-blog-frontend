// import { useState } from 'react'
import "./App.css";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import { Route, Routes } from "react-router-dom";
import Homepage from "./features/homepage/Homepage";
function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Homepage />} />
      <Route path="login" element={<Login />} />

      <Route path="register" element={<Register />} />
      {/* protected routes */}
    </Routes>
  );
}

export default App;
