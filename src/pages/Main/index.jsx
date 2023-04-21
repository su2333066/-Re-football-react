import React from "react";
import "pages/Main/styles.css";
import fetcher from "util/fetcher";
import useSWR from "swr";
import { Navigate } from "react-router-dom";
import loading from "imgs/logo_grey_kr.svg";

function Main() {
  const { data: userData } = useSWR("/users", fetcher);

  if (userData === undefined) {
    return <img className="loading" src={loading} alt="로딩중..." />;
  }

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return <div>메인</div>;
}

export default Main;
