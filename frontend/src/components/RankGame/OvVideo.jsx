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
          const url = URL.createObjectURL(blob);

          // FormData 객체를 사용하여 파일을 서버로 전송
          // const formData = new FormData();
          // formData.append('file', blob);

          // 서버에 파일 업로드
          // axios
          //   .post('/upload', formData, {
          //     headers: {
          //       'Content-Type': 'multipart/form-data',
          //     },
          //   })
          //   .then((response) => {
          //     console.log('File uploaded successfully:', response.data);
          //   })
          //   .catch((error) => {
          //     console.error('File upload failed:', error);
          //   });

          const myFile = new File([url], 'demo.mp4', { type: 'video/mp4' });
          const a = document.createElement('a');
          a.href = url;
          a.download = 'recorded-video.mp4'; // 저장될 파일 이름
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

  // 스트림매니저가 퍼블리셔이면서 record on이 넘어올때만 녹화하도록

  // 스트림매니저가 퍼블리셔이면서 record off가 넘어올 때 녹화 종료하도록

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
