import * as React from 'react';
import MuiBox from '@mui/material/Box';
import MuiModal from '@mui/material/Modal';
import MuiButton from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Modal() {
  const [open, setOpen] = React.useState(true); // initial state set to true

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <MuiBox sx={{ ...style, width: 200 }}>
          <h2 id="modal-title">확인</h2>
          <p id="modal-description">하시겠습니까?</p>
          <MuiButton onClick={handleClose}>Close Modal</MuiButton>
        </MuiBox>
      </MuiModal>
    </React.Fragment>
  );
}
