const DummyData = {
  name: '종상시치',
  image: 'image URL',
  tier: 'Diamond',
  win: 1,
  lose: 999,
  draw: 0,
};

const UserInfo = () => {
  return (
    <div className="border border-danger w-32">
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
