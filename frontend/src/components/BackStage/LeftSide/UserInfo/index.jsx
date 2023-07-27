import styled from "styled-components";

const DummyData = {
  name: "종상시치",
  image: "image URL",
  tier: "Diamond",
  win: 1,
  lose: 999,
  draw: 0,
};

const SUserBox = styled.div`
  border: 1px solid black;
`;

// 티어에 따라 사진 다르게 해서 넣기

const UserInfo = () => {
  return (
    <div>
      <SUserBox>
        <div>{DummyData.image}</div>
        <div>{DummyData.name}</div>
        <div>{DummyData.tier}</div>
        <div>
          {DummyData.win} / {DummyData.lose} / {DummyData.draw}
        </div>
      </SUserBox>
    </div>
  );
};

export default UserInfo;
