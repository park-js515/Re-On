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
        backgroundColor: "rgba(0, 0, 0, 1)",
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
        height:"100%",
        width: "800px",
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



export { Modal };
