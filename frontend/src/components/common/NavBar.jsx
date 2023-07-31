import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Link to="/backstage">
        <button>랭크게임</button>
      </Link>
      <Link to="/normallist">
        <button>일반게임</button>
      </Link>
      <Link to="/feed">
        <button>투표해줘</button>
      </Link>
      <Link to="/faq">
        <button>FAQ</button>
      </Link>
      <Link to="/mypage">
        <button>마이페이지</button>
      </Link>
      <Link to="/login">
        <button>로그인</button>
      </Link>
    </div>
  );
};

export default NavBar;
