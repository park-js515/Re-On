import RecentGameItem from './RecentGameItem';

const RecentGameList = () => {
  const DummyData = [
    // 최근 게임 10개 API호출(항상 10개, 초기값 모두 None)
    { category: '승', user1: 'kim', user2: 'park', videoId: 1, point: 5 },
    { category: '패', user1: 'kim', user2: 'kang', videoId: 1, point: -2 },
    { category: '승', user1: 'kim', user2: 'choi', videoId: 2, point: 3 },
    { category: '승', user1: 'kim', user2: 'park', videoId: 3, point: 2 },
    { category: '무', user1: 'kim', user2: 'lee', videoId: 5, point: 0 },
    { category: '', user1: 'None', user2: 'None', videoId: 0, point: 0 },
    { category: '', user1: 'None', user2: 'None', videoId: 0, point: 0 },
    { category: '', user1: 'None', user2: 'None', videoId: 0, point: 0 },
    { category: '', user1: 'None', user2: 'None', videoId: 0, point: 0 },
    { category: '', user1: 'None', user2: 'None', videoId: 0, point: 0 },
    { category: '', user1: 'None', user2: 'None', videoId: 0, point: 0 },
  ];

  // API
  // 현재 유저 => 최근 10개의 게임정보

  return (
    <div className="flex flex-col my-6">
      <div className='text-6xl mb-6 pb-6  font-semibold mx-2'>
        최근전적
      </div>
      <div className="flex rounded text-white">
        {DummyData.map((game, index) => (
          <RecentGameItem key={index} game={game} />
        ))}
      </div>
    </div>
  );
};

export default RecentGameList;
