import { useRef, forwardRef, useEffect } from "react";

const ModalOverlay = ({ children, isOpen, onDoubleClick }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.125)",
        zIndex: 9999,
      }}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </div>
  );
};

const ModalContent = forwardRef(({ children, isOpen }, ref) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        boxSizing: "border-box",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "2.5px",
        zIndex: 9998,
      }}
      ref={ref}
    >
      {children}
    </div>
  );
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

  return <input onChange={onChange} {...props} />;
};

const InputText = ({ value, onChange }) => {
  const props = {
    type: "text",
    name: "statusText",
    id: "statusText",
  };

  return <textarea value={value} onChange={onChange} {...props} />;
};

const InputNick = ({ value, onChange }) => {
  const props = {
    type: "text",
    name: "nickName",
    id: "nickName",
  };

  return <input value={value} onChange={onChange} {...props} />;
};

const Button = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

export { Modal, InputImg, InputNick, InputText, Button };
