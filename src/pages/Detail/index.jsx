import React, { useCallback } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Location from "util/Location";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
import useSWR from "swr";
import fetcher from "util/fetcher";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import "pages/Detail/styles.css";
import { HomeOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import loading from "imgs/loading.png";

function Detail() {
  const { seq } = useParams();
  const { data: userData } = useSWR("/users", fetcher);
  const { data: detailData, mutate } = useSWR(`/detail/${seq}`, fetcher, {
    dedupingInterval: 10000,
  });

  const navigation = useNavigate();

  const 신청하기 = useCallback(() => {
    axios({
      url: "/match/apply",
      method: "POST",
      data: {
        seq: seq,
      },
    }).then((response) => {
      alert(response.data.message);
      if (response.data.code === "success") {
        mutate(response.data.attend, false);
      }
    });
  }, [seq]);

  const 취소하기 = useCallback(() => {
    axios({
      url: "/match/cancel",
      method: "POST",
      data: {
        seq: seq,
      },
    }).then((response) => {
      alert(response.data.message);
      mutate(response.data.attend, false);
    });
  }, [seq]);

  const returnHome = useCallback(() => {
    navigation("/main");
  }, []);

  const 삭제하기 = useCallback(() => {
    axios({
      url: "/match/delete",
      method: "POST",
      data: {
        seq: seq,
      },
    }).then((response) => {
      alert(response.data.message);
      navigation("/main");
    });
  }, []);

  const 채팅하기 = useCallback(() => {}, []);

  if (detailData === undefined) {
    return <img className="loading" src={loading} alt="로딩중..." />;
  }

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="detailWrap">
        <Location link={detailData.link} />
        <div className="detailBody">
          <div className="bodyLeft">
            <div className="section">
              <div className="matchPoint">
                <h3>매치 포인트</h3>
              </div>
              <div className="matchRule">
                <ul>
                  <li className="infoList">
                    <img
                      src="https://plab-football.s3.amazonaws.com/static/img/ic_info_level.svg"
                      className="icon"
                      alt="레벨"
                    ></img>
                    <div>
                      <p>모든 레벨 신청가능!</p>
                    </div>
                  </li>
                  <li className="infoList">
                    <img
                      src="https://plab-football.s3.amazonaws.com/static/img/ic_info_gender.svg"
                      className="icon"
                      alt="성별"
                    ></img>
                    <div>
                      <p>상관없음</p>
                    </div>
                  </li>
                  <li className="infoList">
                    <img
                      src="https://plab-football.s3.amazonaws.com/static/img/ic_info_stadium.svg"
                      className="icon"
                      alt="스타디움"
                    ></img>
                    <div>
                      <p>6vs6 (18명일 경우 3파전)</p>
                    </div>
                  </li>
                  <li className="infoList">
                    <img
                      src="https://plab-football.s3.amazonaws.com/static/img/ic_info_max_player_cnt.svg"
                      className="icon"
                      alt="최대인원"
                    ></img>
                    <div>
                      <p>12~18명</p>
                    </div>
                  </li>
                  <li className="infoList">
                    <img
                      src="https://plab-football.s3.amazonaws.com/static/img/ic_info_shoes.svg"
                      className="icon"
                      alt="신발"
                    ></img>
                    <div>
                      <p>풋살화/운동화</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bodyRight">
            <div className="section">
              <div className="matchTime">
                <p>{dayjs(detailData.matchtime).format("YYYY-MM-DD HH:mm")}</p>
              </div>
              <div className="matchPlace">
                <p>{detailData.place}</p>
              </div>
              <div className="matchAddress">
                <p>{detailData.link}</p>
                <CopyToClipboard
                  text={`${detailData.link}`}
                  onCopy={() => alert("주소가 복사되었습니다")}
                >
                  <span className="address">주소복사</span>
                </CopyToClipboard>
              </div>
            </div>
            <div className="sectionBtnWrap">
              {detailData.match_user_seq === userData.seq ? (
                <div className="postBtn" onClick={채팅하기}>
                  <button className="chat">채팅</button>
                </div>
              ) : detailData.user_seq === userData.seq ? (
                <div className="postBtn" onClick={삭제하기}>
                  <button className="delete">삭제</button>
                </div>
              ) : !detailData.attend_user_seq
                  .split("/")
                  .map(Number)
                  .includes(userData.seq) ? (
                <div className="postBtn" onClick={신청하기}>
                  <button className="apply">신청</button>
                </div>
              ) : (
                <div className="postBtn" onClick={취소하기}>
                  <button className="cancel">취소</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <button className="backBtn" onClick={returnHome}>
        <HomeOutlined />
      </button>
    </div>
  );
}

export default Detail;
