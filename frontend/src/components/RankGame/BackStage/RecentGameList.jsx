import { useState, useEffect, useRef } from 'react';
import RecentGameItem from './RecentGameItem';
import { searchBattleLog } from 'apiList/member';

const RecentGameList = () => {
  const [gameListData, setGameListData] = useState([]);
  const check = useRef(false);

  // API

  useEffect(() => {
    if (!check.current) {
      searchBattleLog(
        (response) => {
          const newData = response.data.response;
          const temp = [];

          for (let i = 0; i < 10 - newData.length; i++) {
            temp.push({ opponentEmail: '', opponentNickName: '', point: '' });
          }

          setGameListData([...newData, ...temp]);
        },
        (error) => {
          console.log(error);
        },
      );
    }
    return () => {
      check.current = true;
    };
  }, []);

  return (
    <div className="flex flex-col my-14 pb-20">
      <div className="text-6xl mb-6 pb-6  font-semibold mx-2">최근전적</div>
      <div className="flex rounded text-white pb-12">
        {gameListData.map((game, index) => (
          <RecentGameItem key={index} game={game} />
        ))}
      </div>
    </div>
  );
};

export default RecentGameList;
