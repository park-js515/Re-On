import React, { useState, useEffect } from 'react';
import { SContainer, SRank } from "./style";
import { Link } from 'react-router-dom';
import { searchBackStageMembmerInfo } from 'apiList/member'

const DummyData = {
    name: '종상시치',
    image: "https://source.unsplash.com/random?sig=1",
    tier: '티어:',
    tierimage: <img src="/image/tier/gold.png" alt="" />,
    win: 3,
    lose: 1,
    draw: 0,
};

const UserInfo = () => {
    const containerRef = React.useRef(null);
    const [memberData, setMemberData] = useState(null);
    const id = 0; // 나중에 변경

    useEffect(() => {

      searchBackStageMembmerInfo(id,
        (response) => {
          setMemberData(response.data.response);
        },
        (error) => {
          console.error("실패 메시지", error);
        }
      );
    }, []);

    //인포 카드 마우스 위치찾기
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
        <div className="profile-container">
          <Link to={`/mypage/${id}`}>
            <img src={memberData?.profileImg} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
          </Link>
          <div>
            <Link to={`/mypage/${id}`}>
              <div className="name font-semibold text-6xl">{memberData?.nickName}</div>
            </Link>
          </div>
        </div>

        <SRank className="rank">
          <div> {DummyData.tierimage}</div>
        </SRank>
      </SContainer>
    );
};

export default UserInfo;
