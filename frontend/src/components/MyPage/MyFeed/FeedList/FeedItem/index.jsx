import { useRef, forwardRef, useEffect } from "react";
import { useModal } from "./hooks";
import * as Sty from "./style";

const ModalOverlay = ({ children, isOpen, onDoubleClick }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Sty.SModalOverlay onDoubleClick={onDoubleClick}>
      {children}
    </Sty.SModalOverlay>
  );
};

const ModalContent = forwardRef(({ children, isOpen }, ref) => {
  if (!isOpen) {
    return null;
  }

  return <Sty.SModalContent ref={ref}>{children}</Sty.SModalContent>;
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

const CardTop = ({src, onClick}) => {
  return <Sty.SCardTop src={src} onClick={onClick}></Sty.SCardTop>;
};

const CardBot = ({ children, ...props }) => {
  return <Sty.SCardBot {...props}>{children}</Sty.SCardBot>;
};

const FeedItem = ({ top, bot, ...props }) => {
  const { isOpen, handleIsOpen } = useModal();

  return (
    <>
      <Sty.SDiv {...props}>
        <CardTop onClick={handleIsOpen}src={top}></CardTop>
        <CardBot onClick={handleIsOpen}>{bot}</CardBot>
      </Sty.SDiv>

      <Modal isOpen={isOpen} handleIsOpen={handleIsOpen}>
        {top}
      </Modal>
    </>
  );
};

export { FeedItem };
