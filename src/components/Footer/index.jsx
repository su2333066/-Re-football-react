import "components/Footer/styles.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerWrap">
        <div className="footerNav">
          <ul>
            <h3>매치</h3>
            <li>
              <p>루키 매치</p>
            </li>
            <li>
              <p>비기너 매치</p>
            </li>
            <li>
              <p>아마추어 매치</p>
            </li>
            <li>
              <p>세미 매치</p>
            </li>
            <li>
              <p>프로 매치</p>
            </li>
          </ul>
          <ul>
            <h3>서비스 지역</h3>
            <li>
              <p>서울</p>
            </li>
            <li>
              <p>대전</p>
            </li>
            <li>
              <p>부산</p>
            </li>
            <li>
              <p>충청</p>
            </li>
            <li>
              <p>전라</p>
            </li>
            <li>
              <p>제주</p>
            </li>
          </ul>
          <ul>
            <h3>소셜 미디어</h3>
            <li>
              <p>인스타그램</p>
            </li>
            <li>
              <p>페이스북</p>
            </li>
            <li>
              <p>페이스북 그룹</p>
            </li>
          </ul>
        </div>
        <div className="company">
          <h2>
            <a href="/">footballMania.com</a>
          </h2>
          <p>풋살하고 싶을 땐, 풋볼매니아</p>
          <span className="copyright">
            Copyright <b>FM</b> All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
