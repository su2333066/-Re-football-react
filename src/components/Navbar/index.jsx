import "components/Navbar/styles.css";
import fm from "imgs/fm.png";

const Navbar = ({ myProfile, keywordSearch, setData }) => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="navLogo">
          <a href="/">
            <img src={fm} alt="풋볼매니아" />
          </a>
        </div>
        <div className="navRight">
          <div className="navSearch">
            <button onClick={keywordSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="search"
              autoComplete="off"
              placeholder="지역, 구장 이름으로 찾기"
              onChange={setData}
            ></input>
            <button
              onClick={(e) => {
                e.preventDefault();
                myProfile();
              }}
            >
              <i className="fa-regular fa-user"></i>
            </button>
          </div>

          <button
            className="moreBtn"
            onClick={() => {
              alert("준비중");
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
