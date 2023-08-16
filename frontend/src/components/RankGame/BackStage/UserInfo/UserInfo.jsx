import './UserInfo.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { searchBackStageMembmerInfo } from 'apiList/member';

// 티어변경
const getTierImage = (tier) => {
  switch (tier) {
    case 'GOLD':
      return '/image/tier/gold.png';
    case 'SILVER':
      return '/image/tier/silver.png';
    case 'BRONZE':
      return '/image/tier/bronze.png';
    default:
      return '/image/tier/bronze.png'; // 기본 이미지
  }
};

const UserInfo = () => {
  const containerRef = React.useRef(null);
  const [userData, setUserData] = useState([]);

  const getProgressBarWidth = () => {
    // GOLD
    if (userData.tier === 'GOLD') {
      return '100%';
    }
    // SILVER
    if (userData.tier === 'SILVER') {
      return `${((userData.score - 100) / (999 - 100)) * 100}%`;
    }
    // BRONZE
    if (userData.tier === 'BRONZE') {
      return `${Math.min(userData.score, 100)}%`;
    }
    return '0%';
  };

  const getScorePercentage = () => {
    // GOLD
    if (userData.tier === 'GOLD') {
      return 100;
    }
    // SILVER
    if (userData.tier === 'SILVER') {
      return Math.floor(((userData.score - 100) / (999 - 100)) * 100);
    }
    // BRONZE
    if (userData.tier === 'BRONZE') {
      return Math.floor(Math.min(userData.score, 99));
    }
    return 0;
  };

  useEffect(() => {
    searchBackStageMembmerInfo(
      (response) => {
        setUserData(response.data.response);
      },
      (error) => {
        console.log(error);
      },
    );
    // 마우스 위치찾는거 info 포켓몬카드 처럼

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;
      const angle =
        Math.atan2(relY - rect.height / 2, relX - rect.width / 2) *
          (180 / Math.PI) +
        180;
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

  // return (
  //     <SContainer ref={containerRef}>
  //       <div className="sns__container"></div>
  //       <div className="profile-container">
  //         <Link to="/mypage">
  //           <img
  //             src={
  //               `https://storage.googleapis.com/reon-bucket/${userData.profileImg}` ||
  //               '/image/login/userdefault.png'
  //             }
  //             alt=""
  //             className="h-10 w-10 rounded-full bg-white"
  //           />
  //         </Link>
  //         <div>
  //           <Link to="/mypage">
  //             <div className="name font-semibold text-6xl">
  //               {userData.nickName || '개똥이'}
  //             </div>
  //           </Link>
  //           <div className="recent">총{userData.gameCnt} 전</div>
  //           <div className="recentwdl">
  //             {userData.win}승/ {userData.gameCnt - userData.win - userData.lose}
  //             무/ {userData.lose}패
  //           </div>
  //           <div className="tier">티어 {userData.tier}</div>
  //           <div className="w-full h-6 bg-gray rounded-full dark:bg-gray ml-1">
  //             {/* 티어그래프 여기야 종상아 */}
  //             <div
  //               className="bg-[#BCD570] h-6 text-lg font-medium text-white text-center p-0.5 leading-none rounded-full"
  //               style={{ width: `${userData.score || 45}%` }}
  //             >
  //               {' '}
  //               {userData.score || 45}%{' '}
  //             </div>
  //           </div>
  //         </div>
  //         <SRank className="rank">
  //           <img src={getTierImage(userData.tier)} />
  //         </SRank>
  //       </div>
  //     </SContainer>
  //   );
  // };
  return (
    <div
      className="userbox relative bg-gray my-8 mt-28 py-12 sm:py-22"
      ref={containerRef}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center">
        {/* 이름 프로필 */}
        <div className="flex flex-col">
          {/* 프로필 및 유저이름 */}
          <div className="flex items-center mb-4 sm:mb-0 sm:flex-none">
            <Link to="/mypage">
              <img
                src={
                  `https://storage.googleapis.com/reon-bucket/${userData.profileImg}` ||
                  '/image/login/userdefault.png'
                }
                alt=""
                className="w-[8vw] h-[8vw] rounded-full bg-white mr-4" // Added margin-right to create some spacing between the image and the name
              />
            </Link>
            {/* 유저이름 */}
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              <Link to="/mypage" className="hover:text-black">
                <div className="name font-semibold text-6xl">
                  {userData.nickName || '불러오는 중'}
                </div>
              </Link>
            </h2>
          </div>

          {/* 전적 */}
          <div className="ml-0 sm:ml-6 flex-grow">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <p className="mt-3 sm:mt-6 text-sm sm:text-lg leading-8 text-black">
                총 {userData.gameCnt}전
              </p>
              <p className="mt-1 text-sm sm:text-lg leading-8 text-black">
                {userData.win}승/{' '}
                {userData.gameCnt - userData.win - userData.lose}
                무/ {userData.lose}패
              </p>
              <p className="mt-1 text-sm sm:text-lg leading-8 text-black">
                {userData.tier}
              </p>
              <div className="mt-1 w-full h-6 bg-white rounded-xl dark:bg-white">
                {/* 티어그래프 */}
                <div
                  className="mt-1 flex items-center justify-center bg-[#BCD570] h-6 text-sm sm:text-lg font-medium text-white rounded-xl"
                  style={{ width: getProgressBarWidth() }}
                >
                  {userData.score ? `${getScorePercentage()}%` : '불러오는 중'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 랭크티어 */}
        <div className="mt-4 sm:mt-0">
          <img src={getTierImage(userData.tier)} className="tierimg" />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
