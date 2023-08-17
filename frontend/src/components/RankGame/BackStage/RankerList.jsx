import React, { useState, useEffect } from 'react';
import RankerItem from './RankerItem';
import { Container } from '@mui/system';
import { searchTop5Member } from 'apiList/member';
import { Link } from 'react-router-dom';
import './UserInfo/UserInfo.css';
const RankerList = () => {
  const [rankers, setRankers] = useState([]);

  useEffect(() => {
    searchTop5Member(
      (response) => {
        setRankers(response.data.response);
      },
      (error) => {
        // console.log(error);
      },
    );
  }, []);

  const getRankColor = (index) => {
    switch (index) {
      case 0:
        return 'gold';
      case 1:
        return 'silver';
      case 2:
        return 'bronze';
      default:
        return '';
    }
  };
  const getRankColorValue = (tier) => {
    switch (tier) {
      case 'GOLD':
        return '#ffd700'; // gold color value
      case 'SILVER':
        return '#c0c0c0'; // silver color value
      case 'BRONZE':
        return '#cd7f32'; // bronze color value
      default:
        return 'inherit'; // default color value
    }
  };
  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      case 3:
        return '🏅';
      case 4:
        return '🏅';
      default:
        return index + 1;
    }
  };

  return (
    <div className="card flex flex-col justify-center items-center mt-8 py-2 mx-2 text-white shadow-2xl">
      <div className="absolute inset-0 bg-current bg-opacity-50 hover:cursor-pointer pointer-events-none"></div>
      <h1 className="text-5xl mb-6 font-semibold">🏆 랭크TOP5</h1>
      {rankers.map((ranker, index) => (
        <div
          key={index}
          className={`w-3/4 py-4 px-6 mb-4 bg-white bg-opacity-30 flex items-center justify-between bg-${getRankColor(
            index,
          )}-200 rounded-lg shadow-lg`}
        >
          <Link to={`/mypage/${ranker.email}`} className="hover:text-black">
            <div className="text-2xl font-semibold">
              {getRankIcon(index)} {ranker.nickName}
            </div>
          </Link>
          <div
            className="text-xl font-semibold"
            style={{ color: getRankColorValue(ranker.tier) }}
          >
            {ranker.tier}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RankerList;
