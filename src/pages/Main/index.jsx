import React, { useCallback, useState } from "react";
import "pages/Main/styles.css";
import fetcher from "util/fetcher";
import useSWR from "swr";
import { Navigate, useNavigate, useRevalidator } from "react-router-dom";
import loading from "imgs/loading.png";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Carousel from "components/Carousel";
import useInput from "hooks/useInput";
import axios from "axios";

function Main() {
  const navigation = useNavigate();

  const { data: userData, mutate } = useSWR("/users", fetcher);

  const onMatch = useCallback(() => {
    navigation("/match");
  }, []);

  const onLogout = useCallback(() => {
    axios
      .get("/logout", {
        withCredentials: true,
      })
      .then((response) => {
        alert(response.data.message);
        mutate(false, false);
      });
  }, []);

  if (userData === undefined) {
    return <img className="loading" src={loading} alt="로딩중..." />;
  }

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <Navbar onLogout={onLogout} />

      <Carousel />

      <button className="matchBtn" onClick={onMatch}>
        🔜
      </button>

      <Footer />
    </div>
  );
}

export default Main;
