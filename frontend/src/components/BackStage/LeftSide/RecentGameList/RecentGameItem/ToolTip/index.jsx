import styled from "styled-components";

const ToolTipContainer = styled.div`
  position: absolute; // 또는 fixed를 용해도 됩니다.
  z-index: 1000; // 다른 요소 위에 보이도록 z-index를 높게 설정합니다.
  background: white;
  border: 1px solid black;
  padding: 10px;
  border-radius: 4px;
  width: 200px;
`;

const ToolTip = ({ game }) => {
  return (
    <ToolTipContainer>
      게임정보
      <div>상대 : {game.user2}</div>
      <div>영상 : {game.videoId}</div>
      <div>점수 : {game.point}</div>
    </ToolTipContainer>
  );
};

export default ToolTip;
