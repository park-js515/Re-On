import './Profile.css';
import { useRef, forwardRef, useEffect } from 'react';

const ModalOverlay = ({ children, isOpen, onDoubleClick }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="Proflie-ModalOverlay" onDoubleClick={onDoubleClick}>
      {children}
    </div>
  );
};

const ModalContent = forwardRef(({ children, isOpen }, ref) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="Profile-ModalContent" ref={ref}>
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

const InputImg = ({ onChange }) => {
  const props = {
    type: 'file',
    accept: 'image/jpg, image/png, image/jpeg',
    name: 'profileImg',
    id: 'profileImg',
  };

  return <input onChange={onChange} {...props} />;
};

const InputText = ({ value, onChange }) => {
  const props = {
    type: 'text',
    name: 'statusText',
    id: 'statusText',
  };

  return (
    <textarea
      className="Profile-InputText"
      value={value}
      onChange={onChange}
      {...props}
      placeholder="상태 메시지를 입력하세요!"
    />
  );
};

const InputNick = ({ value, onChange }) => {
  const props = {
    type: 'text',
    name: 'nickName',
    id: 'nickName',
  };

  return (
    <input
      value={value}
      onChange={onChange}
      {...props}
      placeholder=" 3 <= Nickname <= 16"
    />
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button className="Profile-CloseButton" onClick={onClick}>
      {children}
    </button>
  );
};

export { Modal, InputImg, InputNick, InputText, Button };
