import React, { useCallback, useState } from "react";
import "pages/Main/styles.css";
import fetcher from "util/fetcher";
import useSWR from "swr";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Carousel from "components/Carousel";
import axios from "axios";
import MatchList from "components/MatchList";
import useInput from "hooks/useInput";

function Main() {
  const { data: userData, mutate } = useSWR("/users", fetcher);
  const [searchKeyword, onChangeSearchKeyword] = useInput("");
  const [searchData, setSearchData] = useState([]);

  const navigation = useNavigate();

  const onMatch = useCallback(() => {
    navigation("/match");
  }, []);

  const onKeywordSearch = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          "/search",
          { searchKeyword },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data.length === 0) alert("검색 결과가 없습니다");
          else setSearchData(response.data);
        });
    },
    [searchKeyword]
  );

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
      <Navbar
        onLogout={onLogout}
        onMatch={onMatch}
        onKeywordSearch={onKeywordSearch}
        onChangeSearchKeyword={onChangeSearchKeyword}
      />
      <Carousel />
      <MatchList searchData={searchData} />
      <Footer />
    </div>
  );
}

export default Main;
