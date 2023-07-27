import React from "react";
import { SNavBar } from "./style";
import Button from "./Button";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <SNavBar>
      <Logo />
      <Button to="/backstage">랭크게임</Button>
      <Button to="/normallist">일반게임</Button>
      <Button to="/feed">투표해줘</Button>
      <Button to="/faq">FAQ</Button>
      <Button to="/mypage">마이페이지</Button>
      <Button to="/login">로그인</Button>
      {/* <Button to="/register">회원가입</Button> */}
    </SNavBar>
  );
};

export default NavBar;
