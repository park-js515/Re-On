import styled from "styled-components";

const SContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 20px;

  overflow: hidden;
`;
const SItem = styled.div`
  box-sizing: border-box;
  flex: 0 0 calc(25% - 20px);
`;

export { SContainer, SItem };
