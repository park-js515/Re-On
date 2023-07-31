import { useRef, forwardRef, useEffect } from "react";
import {
  SModalOverlay,
  SModalContent,
  SButton,
  SInput,
  SInputText,
} from "./style";

const ModalOverlay = ({ children, isOpen, onDoubleClick }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <SModalOverlay onDoubleClick={onDoubleClick}>{children}</SModalOverlay>
  );
};

// 부모의 하위 객체에 ref를 사용하려면 다음과 같이 사용해야 한다.
const ModalContent = forwardRef(({ children, isOpen }, ref) => {
  if (!isOpen) {
    return null;
  }

  return <SModalContent ref={ref}>{children}</SModalContent>;
});

const Modal = ({ children, isOpen, handleIsOpen }) => {
  const modalRef = useRef(null);

  const onDoubleClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleIsOpen();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleESC = (event) => {
      if (event.key === "Escape") {
        handleIsOpen();
      }
    };

    document.addEventListener("keydown", handleESC);

    return () => {
      document.removeEventListener("keydown", handleESC);
    };
  }, [isOpen, handleIsOpen]);

  return (
    <ModalOverlay isOpen={isOpen} onDoubleClick={onDoubleClick}>
      <ModalContent ref={modalRef} isOpen={isOpen}>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

const InputImg = ({ onChange }) => {
  const props = {
    type: "file",
    accept: "image/jpg, image/png, image/jpeg",
    name: "profileImg",
    id: "profileImg",
  };

  return <SInput onChange={onChange} {...props}></SInput>;
};

const InputText = ({ value, onChange }) => {
  const props = {
    type: "text",
    name: "statusText",
    id: "statusText",
  };

  return <SInputText value={value} onChange={onChange} {...props}></SInputText>;
};

const InputNick = ({ value, onChange }) => {
  const props = {
    type: "text",
    name: "nickName",
    id: "nickName",
  };

  return <SInput value={value} onChange={onChange} {...props}></SInput>;
};

const Button = ({ children, onClick }) => {
  return <SButton onClick={onClick}>{children}</SButton>;
};

export { Modal, Button, InputImg, InputText, InputNick };
