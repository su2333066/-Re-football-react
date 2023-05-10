import "components/MatchList/styles.css";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import fetcher from "util/fetcher";
import levelType from "util/levelType";
import dayjs from "dayjs";
import loading from "imgs/loading.png";

const getDayOfWeek = (day) => {
  // 0 => 일요일
  // 1 => 월
  // 6 => 토요일

  //ex) getDayOfWeek(0) -> '일'
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[day];
  return dayOfWeek;
};

const MatchList = ({ searchData }) => {
  const { data: userData } = useSWR(
    process.env.REACT_APP_HOST + "/users",
    fetcher
  );
  const { data: matchData } = useSWR(
    process.env.REACT_APP_HOST + "/match",
    fetcher,
    {
      refreshInterval: 100000,
    }
  );

  const navigation = useNavigate();

  const onDetailMatch = (match) => {
    if (Object.keys(userData).length !== 0) {
      navigation(`/detail/${match.seq}`);
    } else {
      navigation("/Login");
    }
  };

  if (matchData === undefined) {
    return <img className="loading" src={loading} alt="로딩중..." />;
  }

  return (
    <div className="matchListContainer">
      {searchData.length === 0
        ? matchData &&
          Object.values(matchData).map((item, index) => {
            const convertDay = getDayOfWeek(dayjs(item.matchtime).format("d"));
            return (
              <div key={index} className="matchList">
                <ul>
                  <li className="itemContainer">
                    <div className="item__wrap">
                      <div className="itemTime">
                        <span>
                          {dayjs(item.matchtime).format("YYYY-MM-DD")}
                        </span>
                        <span>
                          {dayjs(item.matchtime).format(
                            `(${convertDay}) HH:mm`
                          )}
                        </span>
                      </div>
                      <div className="itemInfo">
                        <div className="infoTitle">
                          <h3>{item.place}</h3>
                          <div className="infoMatchLevel">
                            {levelType.map((type, index) => {
                              if (type.value === item.level) {
                                return <span key={index}>{type.name}</span>;
                              }
                            })}
                          </div>
                        </div>
                        {item.user_seq === userData.seq ? (
                          <div className="matchStatus isOwner">
                            <p onClick={() => onDetailMatch(item)}>
                              내가만든방
                            </p>
                          </div>
                        ) : parseInt(item.date_diff) < 1 ? (
                          item.match_user_seq === userData.seq ? (
                            <div className="matchStatus myMatch">
                              <p onClick={() => onDetailMatch(item)}>
                                매치 성공!
                              </p>
                            </div>
                          ) : (
                            <div className="matchStatus isNotApply">
                              <p>마감</p>
                            </div>
                          )
                        ) : item.attend_user_seq
                            .split("/")
                            .includes(String(userData.seq)) ? (
                          <div className="matchStatus isApplyComplete">
                            <p onClick={() => onDetailMatch(item)}>신청완료</p>
                          </div>
                        ) : (
                          <div className="matchStatus isApply">
                            <p onClick={() => onDetailMatch(item)}>신청가능</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })
        : searchData &&
          Object.values(searchData).map((item, index) => {
            const convertDay = getDayOfWeek(dayjs(item.matchtime).format("d"));
            return (
              <div key={index} className="matchList">
                <ul>
                  <li className="itemContainer">
                    <div className="item__wrap">
                      <div className="itemTime">
                        <span>
                          {dayjs(item.matchtime).format("YYYY-MM-DD")}
                        </span>
                        <span>
                          {dayjs(item.matchtime).format(
                            `(${convertDay}) HH:mm`
                          )}
                        </span>
                      </div>
                      <div className="itemInfo">
                        <div className="infoTitle">
                          <h3>{item.place}</h3>
                          <div className="infoMatchLevel">
                            {levelType.map((type, index) => {
                              if (type.value === item.level) {
                                return <span key={index}>{type.name}</span>;
                              }
                            })}
                          </div>
                        </div>
                        {parseInt(item.date_diff) < 1 ? (
                          item.match_user_seq !== null ? (
                            <div className="matchStatus myMatch">
                              <p onClick={() => onDetailMatch(item)}>
                                매치 성공!
                              </p>
                            </div>
                          ) : (
                            <div className="matchStatus isNotApply">
                              <p>마감</p>
                            </div>
                          )
                        ) : item.attend_user_seq
                            .split("/")
                            .includes(String(userData.seq)) ? (
                          <div className="matchStatus isApplyComplete">
                            <p onClick={() => onDetailMatch(item)}>신청완료</p>
                          </div>
                        ) : (
                          <div className="matchStatus isApply">
                            <p onClick={() => onDetailMatch(item)}>신청가능</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
    </div>
  );
};

export default MatchList;
