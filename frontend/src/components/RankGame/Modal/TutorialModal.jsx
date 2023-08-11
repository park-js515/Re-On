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
import { styled } from '@mui/material/styles';
import { useRef, useState } from 'react';

const SDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    borderRadius: '15px',
    backgroundImage: 'url(image/rank/rank-modal-bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
  height: 65,
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

export default function TutorialModal({ onConfirm, isOpen, onClose }) {
  const [imageIndex, setImageIndex] = useState(0); // 이미지 인덱스 상태
  const images = [
    'image/rank/rank-tutorial-1.png',
    'image/rank/rank-tutorial-2.png',
    'image/rank/rank-tutorial-3.png',
  ]; // 이미지 경로 배열

  const handleClose = () => {
    setImageIndex(0);
    onClose();
  };

  const handleNext = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length); // 다음 이미지로 이동
  };

  return (
    <div>
      <SDialog
        open={isOpen}
        onClose={onClose}
        PaperComponent={PaperComponent}
        TransitionComponent={Transition}
        aria-labelledby="draggable-dialog-title"
      >
        <STitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          튜토리얼
        </STitle>

        <DialogContent>
          <img src={`${images[imageIndex]}`} alt="Tutorial" />
        </DialogContent>

        <SDialogActions>
          {imageIndex < images.length - 1 && (
            <SButton onClick={handleNext}>
              <img
                src="image/rank/rank-arrow.png"
                alt="arrow-btn"
                className="w-[50px] hover:w-[70px] transition-all duration-300"
              />
            </SButton> // 마지막 이미지가 아니면 "다음" 버튼 표시
          )}
          {imageIndex === 2 && (
            <SButton autoFocus onClick={handleClose}>
              <img
                src="image/rank/rank-cancel.png"
                alt="cancel-btn"
                className="w-[50px] hover:w-[70px] transition-all duration-300"
              />
            </SButton>
          )}
        </SDialogActions>
      </SDialog>
    </div>
  );
}
