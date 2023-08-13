import { SContainer, SRank } from "./style";
import { Link } from 'react-router-dom';
// import defaultProfile from "/image/character/cuetreon.png";
import React, { useEffect, useState } from 'react';
import { searchBackStageMembmerInfo } from 'apiList/member'

// 티어변경
const getTierImage = (tier) => {
  switch (tier) {
    case "GOLD":
      return "/image/tier/gold.png";
    case "SILVER":
      return "/image/tier/silver.png";
    case "BRONZE":
      return "/image/tier/bronze.png";
    default:
      return "/image/tier/bronze.png"; // 기본 이미지 
  }
}
const UserInfo = () => {
  const [userData, setUserData] = useState([]);
  const containerRef = React.useRef(null);

  useEffect(() => {
    const email = "park_js515@naver.com";

    
    searchBackStageMembmerInfo(email, 
      (response) => {
        if(response.success) {
          setUserData(response.response);
        } else {
          console.error("Error fetching data:", response.error.message);
        }
      },
      (error) => {
        console.error("Network error:", error);
      }
    );

  
  
  // 마우스 위치찾는거 info 포켓몬카드 처럼

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
    <div className="profile-container">
      <Link to="/mypage">
      <img src={userData.profileImg || "/image/character/cutereon.png"} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
      </Link>
      <div>
        <Link to="/mypage">
        <div className="name font-semibold text-6xl">{userData.nickName || "개똥이"}</div>
        </Link>
        <div className="recent">총전적</div>
        <div className="recentwdl">{userData.win}승 {userData.gameCnt - userData.win - userData.lose}무 {userData.lose}패</div>
      </div>
    </div>
    <SRank className="rank">
    
      <img src={getTierImage(userData.tier)}  />
 
     
    </SRank>
  </SContainer>
);
};

export default UserInfo;