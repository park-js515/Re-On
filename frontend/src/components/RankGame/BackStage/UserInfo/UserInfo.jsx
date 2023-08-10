import React from "react";
import { SContainer, STextContainer, SRank } from "./style";
import { Link } from 'react-router-dom';
// import defaultProfile from "/image/character/cuetreon.png";


const DummyData = {
    name: '종상시치',
    // 이미지 url
    image: "https://source.unsplash.com/random?sig=1",
    tier: '티어:',
    // 티어url
    tierimage: <img src="/image/tier/gold.png" alt="" />,
    win: 3,
    lose: 1,
    draw: 0,
    
  };

  // 마우스 위치찾는거 info 포켓몬카드 처럼
  const UserInfo = () => {
    const containerRef = React.useRef(null);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;
      const angle = Math.atan2(relY - (rect.height / 2), relX - (rect.width / 2)) * (180 / Math.PI) + 180;
      containerRef.current.style.setProperty('--angle', `${angle}deg`);
    };
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
    
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  
  return (
    <SContainer ref={containerRef}>
      <div className="sns__container"></div>
      {/* 프로필 사진, 이름, 점수 표시 */}
      <div className="profile-container">
        <Link to="/mypage">
         <img src={DummyData.image} alt=""className="h-10 w-10 rounded-full bg-gray-50" />
        </Link>
        <div>
        <Link to="/mypage">
            <div className="name">{DummyData.name}</div>
        </Link>
          <div className="recent">{DummyData.win} / {DummyData.lose} / {DummyData.draw}</div>
        </div>
      </div>
      {/* SNS */}
      <STextContainer>
       <h3>여기에</h3>
      </STextContainer>
      <STextContainer>
      <h3>무엇을써야하노</h3>
      </STextContainer>
       

      
      {/* 랭크를 표시하기 위한 div */}
      <SRank className="rank">
      <div> {DummyData.tierimage}</div>
      </SRank>
    </SContainer>
  );
};

export default UserInfo;