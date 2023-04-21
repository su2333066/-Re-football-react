import React, { useCallback, useState } from "react";
import "pages/LogIn/styles.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useInput from "hooks/useInput";
import axios from "axios";
import fetcher from "util/fetcher";
import useSWR from "swr";

function LogIn() {
  const { data: userData } = useSWR("/users", fetcher);

  const [id, onChangeID] = useInput("");
  const [password, onChangePassword] = useInput("");

  const navigation = useNavigate();

  const onLogIn = useCallback(
    (e) => {
      e.preventDefault();
      axios({
        url: "/login",
        method: "POST",
        data: { id, password },
      }).then((response) => {
        alert(response.data.message);
        if (response.data.code === "success") {
          navigation("/main");
        }
      });
    },
    [id, password]
  );

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