import React from 'react';

const DummyData = {
  name: '종상시치',
  // 이미지 url
  image: <img src="/image/character/cutereon.png" alt="" />,
  tier: '티어:',
  // 티어url
  tierimage: <img src="/image/tier/gold.png" alt="" />,
  win: 1,
  lose: 999,
  draw: 0,
};

const UserInfo = () => {
  return (
    <div className="bg-darkGray">
      <div className='h-8 w-8 rounded-full'>{DummyData.image}</div>
      <div>{DummyData.name}</div>
      <div>
        {DummyData.tier} {DummyData.tierimage}
      </div>
      <div>
        {DummyData.win} / {DummyData.lose} / {DummyData.draw}
      </div>
    </div>
  );
};

export default UserInfo;
