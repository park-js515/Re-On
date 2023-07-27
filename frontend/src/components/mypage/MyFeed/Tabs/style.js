import styled from "styled-components";

const STabButton = styled.button`
  box-sizing: border-box;
  background-color: ${({ isActive }) => (isActive ? "#007bff" : "#f0f0f0")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#333")};
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const STabContent = styled.div`
  box-sizing: border-box;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export { STabButton, STabContent };
