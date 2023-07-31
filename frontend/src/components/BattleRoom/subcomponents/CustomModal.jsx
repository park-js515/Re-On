import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const CustomModal = ({
  open,
  title,
  description,
  onConfirm,
  onClose,
  showCancel = true,
}) => {
  return (
    <div>
      <Modal open={open}>
        <Box>
          <Typography>{title}</Typography>
          <Typography>{description}</Typography>
          <div>
            <Button onClick={onConfirm}>확인</Button>
            {showCancel && <Button onClick={onClose}>취소</Button>}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
