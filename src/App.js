import React from "react";
import "App.css";

import LogIn from "pages/LogIn";
import SignUp from "pages/SignUp";
import Main from "pages/Main";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/login" element={<LogIn />} />
      <Route exact path="/main" element={<Main />} />
    </Routes>
  );
}

export default App;
