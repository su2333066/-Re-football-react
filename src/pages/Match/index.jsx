import React, { useCallback, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import levelType from "util/levelType";
import useInput from "hooks/useInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomeOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import fetcher from "util/fetcher";
import useSWR from "swr";

function Match() {
  const [place, onChangePlace] = useInput("");
  const [address, onChangeAddress] = useInput("");
  const [level, onChangeLevel] = useInput(1);
  const [time, onChangeTime] = useInput("");
  const [memo, onChangeMemo] = useInput("");
  const [checkAdd, setCheckAdd] = useState(false);

  const navigation = useNavigate();

  const { data: userData } = useSWR("/users", fetcher);

  const returnHome = useCallback(() => {
    navigation("/main");
  }, []);

  const addMatch = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          "/match",
          { place, address, time, memo, level },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data.code === "success") {
            alert(response.data.message);
            setCheckAdd(true);
          } else {
            toast.error(response.data.message, {
              autoClose: 1000,
              position: "bottom-center",
            });
          }
        });
    },
    [place, address, time, memo, level]
  );

  if (checkAdd) {
    return <Navigate to="/main" />;
  }

  if (!userData) {
    return <Navigate to="/login" />;
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
            <h5>장소</h5>
            <input name="place" onChange={onChangePlace}></input>
            <h5>주소</h5>
            <input name="address" onChange={onChangeAddress}></input>
            <h5>레벨</h5>
            <div className="level">
              {levelType.map((item, index) => {
                const className = level == item.value ? "button-active" : "";

                return (
                  <button
                    name="level"
                    type="radio"
                    className={className}
                    key={`levelButtons-${index}`}
                    value={item.value}
                    onClick={onChangeLevel}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <h5>경기날짜</h5>
            <input
              className="date"
              type="datetime-local"
              name="time"
              onChange={onChangeTime}
            ></input>
            <h5>메모</h5>
            <input name="memo" onChange={onChangeMemo}></input>

            <button type="button" onClick={addMatch}>
              매치등록
            </button>
          </div>
        </div>
      </div>
      <button className="backBtn" onClick={returnHome}>
        <HomeOutlined />
      </button>
      <ToastContainer />
    </div>
  );
}

export default Match;
