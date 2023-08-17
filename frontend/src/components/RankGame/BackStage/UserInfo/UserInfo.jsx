import './UserInfo.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { searchBackStageMembmerInfo } from 'apiList/member';

// 티어변경
const getTierImage = (tier) => {
  switch (tier) {
    case 'GOLD':
      return '/image/tier/1.png';
    case 'SILVER':
      return '/image/tier/3.png';
    case 'BRONZE':
      return '/image/tier/2.png';
    default:
      return null; // 기본 이미지
  }
};

const UserInfo = () => {
  const containerRef = React.useRef(null);
  const [userData, setUserData] = useState([]);
  const [userEmail, setUserEmail] = useState();

  const getProgressBarWidth = () => {
    // GOLD
    if (userData.tier === 'GOLD') {
      return '100%';
    }
    // SILVER
    if (userData.tier === 'SILVER') {
      return `${Math.min(((userData.score - 100) / 900) * 100, 100)}%`;
    }
    // BRONZE
    if (userData.tier === 'BRONZE') {
      return `${Math.min((userData.score / 100) * 100, 100)}%`;
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
      return Math.min(Math.floor(((userData.score - 100) / 900) * 100), 99);
    }
    // BRONZE
    if (userData.tier === 'BRONZE') {
      return Math.min(Math.floor(userData.score), 99);
    }
    return 0;
  };

  useEffect(() => {
    searchBackStageMembmerInfo(
      (response) => {
        setUserData(response.data.response);
        setUserEmail(localStorage.getItem('email'));
      },
      (error) => {
        console.log(error);
      },
    );

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
              <Link to={`/mypage/${userEmail}`} className="hover:text-black">
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
              <div className="mt-1 w-full h-6 bg-white rounded-xl dark:bg-white flex items-center justify-center relative text-black">
                <div
                  className="absolute left-0 top-0 bg-[#BCD570] h-6 rounded-xl animate-width"
                  style={{ width: getProgressBarWidth() }}
                ></div>
                <div className="z-[1]">{`${getScorePercentage()}%`}</div>
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
