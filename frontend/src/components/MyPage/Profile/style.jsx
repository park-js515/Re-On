import styled from "styled-components";

const SDiv = styled.div`
  box-sizing: border-box;
`;

const SRow = styled(SDiv)`
  display: flex;
  flex-direction: row;
`;
const SCol = styled(SDiv)`
  display: flex;
  flex-direction: column;
`;

const SColw100 = styled(SCol)`
  width: 100%;
`

const SRowProfile = styled(SRow)`
  height: 100%;
  width: 100%;
`;

const SColProfileImg = styled(SCol)`
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
const SRowInfo = styled(SRow)`
  margin: 10px 0;
`;

const SRowModify = styled(SRow)`
  margin: 10px 0;
  justify-content: end;
`;

const SRowClose = styled(SRow)`
	justify-content: end;
`

export { SRowProfile, SColProfileImg, SRowInfo, SColw100, SRowModify, SCol, SRowClose };
