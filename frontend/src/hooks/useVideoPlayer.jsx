// useVideoPlayer.js
import { useRef, useState, useEffect } from 'react';

const useVideoPlayer = () => {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false); // new state for tracking play status

  const handlePlayVideo = () => {
    videoRef.current.play();
    setIsPlaying(true); // update the state when the video starts playing
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onpause = () => {
        setIsPlaying(false);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef.current]); // videoRef.current 변화 시 useEffect 실행

  return {
    videoRef,
    isPlaying,
    handlePlayVideo,
  };
};

export default useVideoPlayer;
