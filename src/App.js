import React from "react";
import "App.css";

import LogIn from "pages/LogIn";
import SignUp from "pages/SignUp";
import Main from "pages/Main";
import Match from "pages/Match";

import { Routes, Route, Navigate } from "react-router-dom";
import Detail from "pages/Detail";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/login" element={<LogIn />} />
      <Route exact path="/main" element={<Main />} />
      <Route exact path="/match" element={<Match />} />
      <Route exact path="/match/:seq" element={<Match />} />
      <Route exact path="/detail/:seq" element={<Detail />} />
    </Routes>
  );
}

export default App;
