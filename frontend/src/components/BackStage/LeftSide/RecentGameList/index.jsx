import styled from "styled-components";
import RecentGameItem from "./RecentGameItem";

const SBox = styled.div`
  display: flex;
  border: 1px solid black;
  /* width: 80%; */
`;

const DummyData = [
  // 최근 게임 10개 API호출(항상 10개, 초기값 모두 None)
  { category: "win", user1: "kim", user2: "park", videoId: 1, point: 5 },
  { category: "lose", user1: "kim", user2: "kang", videoId: 1, point: -2 },
  { category: "win", user1: "kim", user2: "choi", videoId: 2, point: 3 },
  { category: "win", user1: "kim", user2: "park", videoId: 3, point: 2 },
  { category: "draw", user1: "kim", user2: "lee", videoId: 5, point: 0 },
  { category: "None", user1: "None", user2: "None", videoId: 0, point: 0 },
  { category: "None", user1: "None", user2: "None", videoId: 0, point: 0 },
  { category: "None", user1: "None", user2: "None", videoId: 0, point: 0 },
  { category: "None", user1: "None", user2: "None", videoId: 0, point: 0 },
  { category: "None", user1: "None", user2: "None", videoId: 0, point: 0 },
  { category: "None", user1: "None", user2: "None", videoId: 0, point: 0 },
];

const RecentGameList = () => {
  return (
    <div>
      <div>최근전적</div>
      <SBox>
        {DummyData.map((game, index) => (
          <RecentGameItem key={index} result={game} />
        ))}
      </SBox>
    </div>
  );
};

export default RecentGameList;
