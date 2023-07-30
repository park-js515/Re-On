import styled from "styled-components";

const STabButton = styled.button`
  box-sizing: border-box;
  background-color: ${({ selected }) => (selected ? "#007bff" : "#f0f0f0")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  height: 50px;
  cursor: pointer;
  &:hover {
    background-color: #8888dd;
  }
`;

const STabContent = styled.div`
  box-sizing: border-box;
  /* border: 1px solid #ccc; */
  border-radius: 5px;
`;

export { STabButton, STabContent };
