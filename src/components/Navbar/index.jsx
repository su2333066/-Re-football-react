import fm from "imgs/fm.png";
import "components/Navbar/styles.css";

const Navbar = ({ myProfile, keywordSearch, setData, onLogout }) => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <a href="/">
          <img className="logo" src={fm} alt="풋볼매니아" />
        </a>
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
            <button onClick={myProfile}>
              <i className="fa-regular fa-user"></i>
            </button>
          </div>

          <button onClick={onLogout}>
            <i class="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
