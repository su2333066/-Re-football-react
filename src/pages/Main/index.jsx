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

function Main() {
  const navigation = useNavigate();

  const { data: userData } = useSWR("/users", fetcher);

  const onMatch = useCallback(() => {
    navigation("/match");
  }, []);

  if (userData === undefined) {
    return <img className="loading" src={loading} alt="로딩중..." />;
  }

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <Navbar />

      <Carousel />

      <button className="matchBtn" onClick={onMatch}>
        🔜
      </button>

      <Footer />
    </div>
  );
}

export default Main;
