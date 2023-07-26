import { SModalOverlay, SModalContent, SButton } from "./style";

const ModalOverlay = ({ children }) => {
  return <SModalOverlay>{children}</SModalOverlay>;
};

const ModalContent = ({ children }) => {
  return <SModalContent>{children}</SModalContent>;
};

const Button = ({ children, onClick }) => {
  return <SButton onClick={() => {onClick()}}>{children}</SButton>;
};

export { ModalOverlay, ModalContent, Button };
