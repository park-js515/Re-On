import React, { useRef, useEffect } from 'react';

export default function OpenViduVideoComponent({ streamManager, mySide}) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  console.log('mySide@@@@@@@@@@@@@@@@@@', mySide)

  return <video id={mySide} autoPlay={true} ref={videoRef} className="rounded-lg" width={500} height={600}/>;
}
