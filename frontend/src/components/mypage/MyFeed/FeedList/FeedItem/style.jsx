import styled from "styled-components";

const SDiv = styled.div`
  box-sizing: border-box;
`;

const SCardTop = styled(SDiv)`
  height: 60px;
  width: 80px;
  border-radius: 5px;
  border: 1px solid black;
`;

const SCardBot = styled(SDiv)`
  height: 40px;
  width: 80px;
  border-radius: 5px;
  border: 1px solid black;
`;

export { SDiv, SCardTop, SCardBot };
