import "components/MatchList/styles.css";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import fetcher from "util/fetcher";
import levelType from "util/levelType";
import dayjs from "dayjs";
import loading from "imgs/loading.png";

function getDayOfWeek(day) {
  // 0 => 일요일
  // 1 => 월
  // 6 => 토요일

  //ex) getDayOfWeek('2022-06-13')
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[day];
  return dayOfWeek;
}

const MatchList = () => {
  const { data: userData } = useSWR("/users", fetcher);
  const { data: matchData } = useSWR("/match", fetcher);

  const navigation = useNavigate();

  if (matchData === undefined) {
    return <img className="loading" src={loading} alt="로딩중..." />;
  }

  return (
    <div className="matchListContainer">
      {matchData &&
        Object.values(matchData).map((item, index) => {
          const convertDay = getDayOfWeek(dayjs(item.matchtime).format("d"));
          return (
            <div key={index} className="matchList">
              <ul>
                <li className="itemContainer">
                  <div className="item__wrap">
                    <div className="itemTime">
                      <p>{dayjs(item.matchtime).format("YYYY-MM-DD")}</p>
                      <p>
                        {dayjs(item.matchtime).format(`(${convertDay}) HH:mm`)}
                      </p>
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
                      <div className="itemStatus">
                        {parseInt(item.date_diff) < 2 ? (
                          item.match_user_seq !== null ? (
                            <div className="matchStatus myMatch">
                              <p
                                onClick={() => {
                                  if (Object.keys(userData).length !== 0) {
                                    navigation(`/detail/${item.seq}`);
                                  } else {
                                    navigation("/Login");
                                  }
                                }}
                                className="yes"
                              >
                                매치 성공!
                              </p>
                            </div>
                          ) : (
                            <div className="matchStatus isFull">
                              <p>마감</p>
                            </div>
                          )
                        ) : (
                          <div className="matchStatus isHurry">
                            <p
                              onClick={() => {
                                if (Object.keys(userData).length !== 0) {
                                  navigation(`/detail/${item.seq}`);
                                } else {
                                  navigation("/Login");
                                }
                              }}
                              className="yes"
                            >
                              신청가능
                            </p>
                          </div>
                        )}
                      </div>
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
