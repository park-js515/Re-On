import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

export default function OpenViduVideoComponent({
  streamManager,
  mySide,
  recordOn,
  userCamBorder,
  type,
  handleSaveblob,
}) {
  const videoRef = useRef();

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const constraints = { audio: true, video: true };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        if (videoRef.current && type == 'publisher') {
          videoRef.current.srcObject = mediaStream;
        }

        const recordedChunksLocal = [];

        const recorder = new MediaRecorder(mediaStream);
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            recordedChunksLocal.push(e.data);
          }
        };
        recorder.onstop = () => {
          const blob = new Blob(recordedChunksLocal, { type: 'video/mp4' });
          handleSaveblob(blob);
        };
        setMediaRecorder(recorder);
      });
  }, []);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  useEffect(() => {
    if (mediaRecorder) {
      if (recordOn && !recording) {
        mediaRecorder.start();
        setRecording(true);
        console.log('녹화 시작');
      } else if (!recordOn && recording) {
        mediaRecorder.stop();
        setRecording(false);
        console.log('녹화 중지');
      }
    }
  }, [recordOn, mediaRecorder, recording]);

  return (
    <video
      id={mySide}
      autoPlay={true}
      ref={videoRef}
      className={`rounded-lg ${
        userCamBorder ? 'border-4 border-danger' : ''
      } w-[500px] h-[500px]`}
    />
  );
}
