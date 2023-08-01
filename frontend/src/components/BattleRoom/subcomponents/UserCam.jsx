import { useEffect, useRef } from 'react';
import { OpenVidu, Publisher } from 'openvidu-browser';

import MUIButton from '@mui/material/Button';

const UserCam = ({ onClick, isOn, border }) => {
  const publisherRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOn) {
      let OV = new OpenVidu();
      let publisher = OV.initPublisher(videoRef.current, {
        audio: true,
        video: true,
        quality: 'MEDIUM',
        resolution: '200x200',
      });

      publisherRef.current = publisher;

      publisher.addVideoElement(videoRef.current);
    } else {
      if (publisherRef.current) {
        publisherRef.current.stream.dispose();
        publisherRef.current = null;
      }
    }
  }, [isOn]);

  return (
    <div>
      유저캠
      <div className={`${border ? 'border-2 border-red-500' : ''}`}>
        <div ref={videoRef} />
      </div>
      <MUIButton variant="contained" onClick={onClick}>
        유저 입장 이벤트
      </MUIButton>
    </div>
  );
};

export default UserCam;
