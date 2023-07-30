import styled from "styled-components";

const SDiv = styled.div`
  box-sizing: border-box;
`;

const SModalOverlay = styled(SDiv)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.125);
  z-index: 9999;
`;

const SModalContent = styled(SDiv)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 2.5px;
  border-radius: 5px;
  z-index: 9998;
`;

const SButton = styled.button`
  background-color: none;
  border: none;
  &:hover {
    background-color: #9d9292ee;
  }
`;

// 스타일은 추후에 설정 에정.
const SInput = styled.input``;
const SInputText = styled.textarea`
	border: 1px solid black;
`;

export { SModalOverlay, SModalContent, SButton, SInput, SInputText };
