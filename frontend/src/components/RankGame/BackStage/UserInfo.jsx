const DummyData = {
  name: '종상시치',
  image: 'image URL',
  tier: 'Diamond',
  win: 1,
  lose: 999,
  draw: 0,
};

// API
// 현재 유저 정보(프로필이미지, 이름, 티어, 전적451)

const UserInfo = () => {
  return (
    <div className="border border-black w-32">
      <div>{DummyData.image}</div>
      <div>{DummyData.name}</div>
      <div>{DummyData.tier}</div>
      <div>
        {DummyData.win} / {DummyData.lose} / {DummyData.draw}
      </div>
    </div>
  );
};

export default UserInfo;
