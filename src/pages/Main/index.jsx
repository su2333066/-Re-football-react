import React from "react";
import "pages/Main/styles.css";
import fetcher from "util/fetcher";
import useSWR from "swr";
import { Navigate } from "react-router-dom";
import loading from "imgs/loading.png";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

function Main() {
  const { data: userData } = useSWR("/users", fetcher);

  if (userData === undefined) {
    return <img className="loading" src={loading} alt="로딩중..." />;
  }

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <Navbar />

      {/* <Carousel /> */}

      {/* <button className="matchBtn" onClick={매치등록}>
        +
      </button> */}

      <Footer />
    </div>
  );
}

export default Main;
