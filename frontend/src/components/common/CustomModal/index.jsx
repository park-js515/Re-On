import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const SBox = styled(Box)`
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
const SButton = styled(Button)``;
const STypography = styled(Typography)``;
const SModal = styled(Modal)``;

const CustomModal = ({ open, title, description, onConfirm, onClose }) => {
  return (
    <div>
      <SModal open={open}>
        <SBox>
          <STypography>{title}</STypography>
          <STypography>{description}</STypography>
          <div>
            <SButton onClick={onConfirm}>확인</SButton>
            <SButton onClick={onClose}>취소</SButton>
          </div>
        </SBox>
      </SModal>
    </div>
  );
};

export default CustomModal;
