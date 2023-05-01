import fm from "imgs/fm.png";
import "components/Navbar/styles.css";
import {
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

const Navbar = ({ myProfile, keywordSearch, setData, onLogout, onMatch }) => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <a href="/">
          <img className="logo" src={fm} alt="풋볼매니아" />
        </a>
        <div className="navRight">
          <div className="navSearch">
            <input
              type="search"
              autoComplete="off"
              placeholder="지역, 구장 이름으로 찾기"
              onChange={setData}
            />
            <button className="icon" onClick={keywordSearch}>
              <SearchOutlined />
            </button>
          </div>
          <button className="icon" onClick={onMatch}>
            <PlusOutlined />
          </button>
          <button className="icon" onClick={myProfile}>
            <UserOutlined />
          </button>
          <button className="icon" onClick={onLogout}>
            <LogoutOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
