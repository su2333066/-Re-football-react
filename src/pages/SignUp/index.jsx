import axios from "axios";
import useInput from "hooks/useInput";
import React, { useCallback, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useSWR from "swr";
import fetcher from "util/fetcher";
import levelType from "util/levelType";
import loading from "imgs/loading.png";

function SignUp() {
  const { data: userData } = useSWR(
    process.env.NODE_ENV === "production"
      ? "http://3.38.255.11:4085/users"
      : "http://localhost:4085/users",
    fetcher
  );

  const [id, onChangeID] = useInput("");
  const [name, onChangeName] = useInput("");
  const [level, onChangeLevel] = useInput(1);
  const [password, , setPassword] = useInput("");
  const [passwordCheck, , setPasswordCheck] = useInput("");
  const [mismatchError, setMismatchError] = useState(false);

  const navigation = useNavigate();

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck]
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password]
  );

  const onSignUp = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          process.env.NODE_ENV === "production"
            ? "http://3.38.255.11:4085/join"
            : "http://localhost:4085/join",
          { id, name, level, password },
          { withCredentials: true }
        )
        .then((response) => {
          alert(response.data.message);
          if (response.data.code === "success") {
            navigation("/login");
          }
        });
    },
    [id, name, level, password]
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
              name="name"
              placeholder="이름을 입력해주세요"
              onChange={onChangeName}
            />
            <span className="levelCheck">Check your Level !</span>
            <div className="level">
              {levelType.map((item, index) => {
                const className = level == item.value ? "button-active" : "";
                return (
                  <button
                    name="level"
                    type="radio"
                    className={className}
                    key={`level-${index}`}
                    value={item.value}
                    onClick={onChangeLevel}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={onChangePassword}
            />
            <input
              type="password"
              id="password-check"
              name="password-check"
              placeholder="비밀번호를 확인해주세요"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
            <button type="button" onClick={onSignUp}>
              회원가입
            </button>
            <Link className="joinORLogin" to="/login">
              로그인
            </Link>
            {mismatchError && (
              <div className="error">비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
