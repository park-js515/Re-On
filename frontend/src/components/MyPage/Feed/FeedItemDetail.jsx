import './Feed.css';
import { useRef, forwardRef, useEffect } from 'react';

const ModalOverlay = ({ children, isOpen, onDoubleClick }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="Feed-ModalOverlay" onDoubleClick={onDoubleClick}>
      {children}
    </div>
  );
};

const ModalContent = forwardRef(({ children, isOpen }, ref) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="Feed-ModalContent" ref={ref}>
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
      if (event.key === 'Escape') {
        handleIsOpen();
      }
    };

    document.addEventListener('keydown', handleESC);

    return () => {
      document.removeEventListener('keydown', handleESC);
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
