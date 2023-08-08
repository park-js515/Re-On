import React from "react";
import { SContainer, SSNSContainer, SRank } from "./style";
import { Link } from 'react-router-dom';
// import defaultProfile from "/image/character/cuetreon.png";



               

const DummyData = {
    name: '종상시치',
    // 이미지 url
    image: <img src="/image/character/cutereon.png" alt="" />,
    tier: '티어:',
    // 티어url
    tierimage: <img src="/image/tier/gold.png" alt="" />,
    win: 3,
    lose: 1,
    draw: 0,
    
  };
  const UserInfo = () => {
  return (
    <SContainer>
      <div className="sns__container"></div>
      {/* 프로필 사진, 이름, 점수 표시 */}
      <div className="profile-container">
        <Link to="/mypage">
        {DummyData.image}
        </Link>
        <div>
        <Link to="/mypage">
            <div className="name">{DummyData.name}</div>
        </Link>
          <div className="recent">{DummyData.win} / {DummyData.lose} / {DummyData.draw}</div>
        </div>
      </div>
      {/* SNS */}
      <SSNSContainer>
       <h3>여기에</h3>
      </SSNSContainer>
      <SSNSContainer>
      <h3>무엇을써야하노</h3>
      </SSNSContainer>
       
       
       
      
      {/* 랭크를 표시하기 위한 div */}
      <SRank className="rank">
      <div> {DummyData.tierimage}</div>
      </SRank>
    </SContainer>
  );
};

export default UserInfo;