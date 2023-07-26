import styled from "styled-components";

const SDiv = styled.div`
  box-sizing: border-box;
`;

const SBox1 = styled(SDiv)`
  background-color: #2f2c2c;
  min-height: 85vh;
  width: 25vw;
  border-radius: 15px;
  padding: 10px;
  margin: 10px;
`;

const SBox2 = styled(SDiv)`
  background-color: #808080d1;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 15px;
`;

export { SDiv, SBox1, SBox2 };
