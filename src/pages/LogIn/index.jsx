import React, { useCallback, useState } from "react";
import "pages/LogIn/styles.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useInput from "hooks/useInput";
import axios from "axios";
import fetcher from "util/fetcher";
import useSWR from "swr";
import loading from "imgs/loading.png";

function LogIn() {
  const { data: userData, mutate } = useSWR(
    `${process.env.REACT_APP_API_ROOT}/users`,
    fetcher,
    {
      refreshInterval: 10000,
    }
  );
  const [id, onChangeID] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onLogIn = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          `${process.env.REACT_APP_API_ROOT}/login`,
          { id, password },
          { withCredentials: true }
        )
        .then((response) => {
          alert(response.data.message);
          mutate(response.data.login, false);
        });
    },
    [id, password]
  );

  if (userData === undefined) {
    return <img className="loading" src={loading} alt="로딩중..." />;
  }

  if (userData) {
    return <Navigate to="/main" />;
  }

  return (
    <div className="container">
      <div className="contentContainer">
        <div className="contentInner">
          <div className="inner">
            <div className="headMessage">
              <h2>풋살하고싶을땐</h2>
              <h2 className="hlt">풋볼매니아</h2>
            </div>
            <input
              name="id"
              placeholder="아이디 또는 이메일"
              onChange={onChangeID}
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              onChange={onChangePassword}
            />
            <button type="button" onClick={onLogIn}>
              로그인
            </button>
            <Link className="joinORLogin" to="/signup">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
