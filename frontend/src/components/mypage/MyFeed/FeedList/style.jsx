import styled from "styled-components";

const SContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;
const SItem = styled.div`
  box-sizing: border-box;
  flex: 0 0 calc(25% - 20px);
`;

export { SContainer, SItem };
