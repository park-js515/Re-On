import './Profile.css';
import { useRef, forwardRef, useEffect, useState } from 'react';
import * as hooks from './hooks';
import * as Sty from './style';

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

const ModifyForm = ({
  setProfileImg,
  introduce,
  setIntroduce,
  nickName,
  setNickName,
}) => {
  const [tempInputImg, setTempInputImg] = useState(null);
  const [tempInputText, setTempInputText] = hooks.useInputText(
    introduce,
    (value) => value.length <= 150,
  );
  const [tempInputNick, setTempInputNick] = hooks.useInputText(
    nickName,
    (value) => value.length <= 16,
  );

  const handleTempImg = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setTempInputImg(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const willChange = window.confirm('변경하시겠습니까?');

    if (willChange) {
      if (tempInputImg) {
        setProfileImg((current) => {
          return { ...current, src: tempInputImg };
        });
      }
      setIntroduce(tempInputText);
      setNickName(tempInputNick);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="profileImg">이미지 변경: </label>
      <InputImg onChange={handleTempImg}></InputImg>
      <br />
      <label htmlFor="statusText">상태메시지: </label>
      <Sty.Roww100CC>
        <InputText
          value={tempInputText}
          onChange={setTempInputText}
        ></InputText>
      </Sty.Roww100CC>
      <br />
      <div style={{ position: 'relative' }}>
        <label htmlFor="nickName">닉네임: </label>
        <InputNick
          value={tempInputNick}
          onChange={setTempInputNick}
        ></InputNick>

        <button
          className="bg-white hover:bg-lightGray border rounded"
          style={{ position: 'fixed', right: '20px' }}
        >
          Update
        </button>
      </div>
    </form>
  );
};

export { Modal, InputImg, InputNick, InputText, Button, ModifyForm };
