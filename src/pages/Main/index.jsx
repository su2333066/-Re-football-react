import React, { useCallback } from "react";
import "pages/Main/styles.css";
import fetcher from "util/fetcher";
import useSWR from "swr";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Carousel from "components/Carousel";
import axios from "axios";
import MatchList from "components/MatchList";

function Main() {
  const { data: userData, mutate } = useSWR("/users", fetcher);

  const navigation = useNavigate();

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

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <Navbar onLogout={onLogout} onMatch={onMatch} />
      <Carousel />
      <MatchList />
      <Footer />
    </div>
  );
}

export default Main;
