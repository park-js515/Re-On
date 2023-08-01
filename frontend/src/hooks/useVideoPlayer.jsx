// useVideoPlayer.js
import { useRef, useState, useEffect } from "react";

const useVideoPlayer = () => {
  const videoRef = useRef();
  const [videoDuration, setVideoDuration] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // new state for tracking play status

  const handlePlayVideo = () => {
    videoRef.current.play();
    setIsPlaying(true); // update the state when the video starts playing
  };

  useEffect(() => {
    videoRef.current.onloadedmetadata = () => {
      setVideoDuration(videoRef.current.duration);
    };
    videoRef.current.onpause = () => {
      setIsPlaying(false); // update the state when the video is paused
    };
  }, []);

  return {
    videoRef,
    videoDuration,
    isPlaying,
    handlePlayVideo,
  };
};

export default useVideoPlayer;
