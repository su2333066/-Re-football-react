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
      if (searchKeyword.length < 2) {
        alert("두 글자이상 입력해주세요");
      } else {
        axios
          .post(
            process.env.REACT_APP_HOST + "/search",
            { searchKeyword },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            if (Object.keys(response.data).length === 2) {
              alert(response.data.message);
            } else if (response.data.searchedMatch.length === 0) {
              alert("검색결과가 없습니다");
            } else {
              alert(
                `${response.data.searchedMatch.length}개의 매치를 찾았습니다`
              );
              setSearchData(response.data.searchedMatch);
            }
          });
      }
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
