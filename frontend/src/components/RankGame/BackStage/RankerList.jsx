import React, { useState, useEffect } from 'react';
import RankerItem from './RankerItem';
import { Container } from '@mui/system';
import { searchTop5Member } from 'apiList/member';
import { Link } from 'react-router-dom';

const RankerList = () => {
  const [rankers, setRankers] = useState([]);

  useEffect(() => {
    searchTop5Member(
      (response) => {
        setRankers(response.data.response);
      },
      (error) => {
        console.log(error);
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
        return 'gray';
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
    <div className="flex flex-col justify-center items-center h-full py-10 text-white ">
      <h1 className="text-5xl mb-6 font-semibold">🏆 랭크순위</h1>
      {rankers.map((ranker, index) => (
        <div
          key={index}
          className={`w-3/4 py-4 px-6 mb-4 flex items-center justify-between bg-${getRankColor(
            index,
          )}-200 rounded-lg shadow-lg`}
        >
          <Link to={`/mypage/${ranker.email}`}>
            <div className="text-2xl font-semibold">
              {getRankIcon(index)} {ranker.nickName}
            </div>
            <div className="text-xl font-semibold">{ranker.tier}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RankerList;
