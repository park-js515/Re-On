import styled from "styled-components";

const SDiv = styled.div`
  box-sizing: border-box;
`;

const SBox1 = styled(SDiv)`
  background-color: #2f2c2c;
  min-height: 300px;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SBox2 = styled(SDiv)`
  background-color: #808080d1;
  max-width: 800px;  
  min-height: 300px;
  border-radius: 15px; 
  padding: 5px;
`;

export { SDiv, SBox1, SBox2 };
