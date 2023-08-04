import { useState } from 'react';
import styled from 'styled-components';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import MuiTypography from '@mui/material/Typography';
import MuiModal from '@mui/material/Modal';

const SBox = styled(MuiBox)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #000;
  width: 400px;
  background-color: white;
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const SButton = styled(MuiButton)``;
const STypography = styled(MuiTypography)``;
const SModal = styled(MuiModal)``;

const SDescriptionTypography = styled(MuiTypography)`
  font-size: 18px;
  color: #333;
  // 이곳에 원하는 스타일을 추가하십시오.
`;

const Modal = ({
  open,
  title,
  description,
  onConfirm,
  onClose,
  showCancel = true,
}) => {
  return (
    <div>
      <SModal open={open}>
        <SBox>
          <STypography>{title}</STypography>
          <SDescriptionTypography>{description}</SDescriptionTypography>
          <div>
            <SButton onClick={onConfirm}>확인</SButton>
            {showCancel && <SButton onClick={onClose}>취소</SButton>}
          </div>
        </SBox>
      </SModal>
    </div>
  );
};

export default Modal;
