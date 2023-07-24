import styled from "styled-components";

const SButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: black;
  outline: none;
  cursor: pointer;
  background-color: white;

  a:visited {
    color: inherit;
  }

  &:hover {
    background-color: lightgray;
  }

  &.active {
    background-color: gray;
  }
`;

export { SButton };
