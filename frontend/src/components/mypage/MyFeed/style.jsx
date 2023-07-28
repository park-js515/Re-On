import styled from "styled-components";

const SDiv = styled.div`
  box-sizing: border-box;
`;

const SFlex = styled.div`
  display: flex;
`;
const SRoww100 = styled(SFlex)`
  width: 100%;
`;

const SColw10 = styled(SFlex)`
  width: 10%;
`;

const SColTab = styled(SColw10)`
  flex-direction: column;
`;

const SColFeedList = styled.div`
  width: 90%;
  margin: 15px;
  border: 1px solid black;
`;

export { SDiv, SFlex, SRoww100, SColw10, SColTab, SColFeedList };
