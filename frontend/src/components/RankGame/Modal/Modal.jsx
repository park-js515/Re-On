import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useRef } from 'react';

const SDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    borderRadius: '15px',
    backgroundImage: 'url(image/rank/rank-modal-bg.png)',
    backgroundPosition: 'center',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
}));

const STitle = styled(DialogTitle)(() => ({
  color: '#000',
  textAlign: 'center',
  fontWeight: 600,
  textShadow: '0px 1px 0 #FFFFFF',
}));

const SContentText = styled(DialogContentText)(() => ({
  color: '#000',
  fontWeight: 600,
  textShadow: '0px 1px 0 #FFFFFF',
}));

const SButton = styled(Button)(() => ({
  color: '#000',
  fontWeight: 600,
  marginBottom: 20,
  textShadow: '0px 1px 0 #FFFFFF',
  '&:hover': {
    fontSize: '1.2em',
    backgroundColor: 'transparent',
    color: '#4e4a4a',
  },
}));

const SDialogActions = styled(DialogActions)(() => ({
  justifyContent: 'center',
  height: 100,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PaperComponent(props) {
  const nodeRef = useRef(null);
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={nodeRef}
    >
      <Paper ref={nodeRef} {...props} />
    </Draggable>
  );
}

export default function Modal({ type, onConfirm, isOpen, onClose }) {
  const handleClose = (event, reason) => {
    if (reason && reason == 'backdropClick') return;
    onClose();
  };

  const handleConfirm = (onConfrim) => {
    onClose();
    onConfirm();
  };

  const getTitle = () => {
    switch (type) {
      case 'exit':
        return '나가기';
      case 'save':
        return '영상 저장';
      default:
        return '';
    }
  };

  const getContent = () => {
    switch (type) {
      case 'exit':
        return '게임을 종료하고 나가시겠습니까? 게임 진행 중에는 패배 처리됩니다!';
      case 'save':
        return '연기 영상을 저장하시겠습니까?';
      default:
        return '';
    }
  };

  return (
    <div>
      <SDialog
        open={isOpen}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        TransitionComponent={Transition}
        hideBackdrop={true}
        aria-labelledby="draggable-dialog-title"
      >
        <STitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {getTitle()}
        </STitle>

        <DialogContent>
          <SContentText>{getContent()}</SContentText>
        </DialogContent>

        <SDialogActions>
          <SButton onClick={handleConfirm}>
            <img
              src="image/rank/rank-confirm.png"
              alt="confirm-btn"
              className="w-[50px] hover:w-[70px] transition-all duration-300"
            />
          </SButton>
          <SButton autoFocus onClick={handleClose}>
            <img
              src="image/rank/rank-cancel.png"
              alt="cancel-btn"
              className="w-[50px] hover:w-[70px] transition-all duration-300"
            />
          </SButton>
        </SDialogActions>
      </SDialog>
    </div>
  );
}
