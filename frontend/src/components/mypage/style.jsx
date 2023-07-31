import styled from "styled-components";

const SFlex = styled.div`
  box-sizing: border-box;
  display: flex;
`;

const SRow = styled(SFlex)``;

const SCol = styled(SFlex)``;

const SRoww100 = styled(SRow)`
  width: 100%;
`;

const SSticky = styled(SRoww100)`
  overflow-y: scroll;
  height:100vh;
`

export { SRow, SCol, SRoww100, SSticky};
