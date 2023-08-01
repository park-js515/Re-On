import RecentGameItem from './RecentGameItem';

const RecentGameList = () => {
  const DummyData = [
    // 최근 게임 10개 API호출(항상 10개, 초기값 모두 None)
    { category: 'win', user1: 'kim', user2: 'park', videoId: 1, point: 5 },
    { category: 'lose', user1: 'kim', user2: 'kang', videoId: 1, point: -2 },
    { category: 'win', user1: 'kim', user2: 'choi', videoId: 2, point: 3 },
    { category: 'win', user1: 'kim', user2: 'park', videoId: 3, point: 2 },
    { category: 'draw', user1: 'kim', user2: 'lee', videoId: 5, point: 0 },
    { category: 'None', user1: 'None', user2: 'None', videoId: 0, point: 0 },
    { category: 'None', user1: 'None', user2: 'None', videoId: 0, point: 0 },
    { category: 'None', user1: 'None', user2: 'None', videoId: 0, point: 0 },
    { category: 'None', user1: 'None', user2: 'None', videoId: 0, point: 0 },
    { category: 'None', user1: 'None', user2: 'None', videoId: 0, point: 0 },
    { category: 'None', user1: 'None', user2: 'None', videoId: 0, point: 0 },
  ];

  return (
    <div>
      최근전적
      <div className="flex rounded text-white">
        {DummyData.map((game, index) => (
          <RecentGameItem key={index} game={game} />
        ))}
      </div>
    </div>
  );
};

export default RecentGameList;
