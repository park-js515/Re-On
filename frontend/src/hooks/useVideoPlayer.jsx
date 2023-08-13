// useVideoPlayer.js
import { useRef, useState, useEffect } from 'react';

const useVideoPlayer = () => {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false); // new state for tracking play status

  const handlePlayVideo = () => {
    try {
      videoRef.current.play();
      setIsPlaying(true); // update the state when the video starts playing
    } catch (error) {
      console.error('비디오 재생 중 오류 발생', error);
      // 필요한 경우 추가적인 오류 처리 로직
    }
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
