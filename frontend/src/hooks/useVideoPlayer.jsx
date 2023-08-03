import { useState, useEffect } from 'react';

const useVideoPlayer = (videoRef) => {
  const [videoDuration, setVideoDuration] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleUseVideoPlayerHook = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const videoNode = videoRef.current;
    if (videoNode) {
      const handleMetadataLoaded = () => setVideoDuration(videoNode.duration);
      videoNode.addEventListener('loadedmetadata', handleMetadataLoaded);
      return () =>
        videoNode.removeEventListener('loadedmetadata', handleMetadataLoaded);
    }
  }, [videoRef]);

  return { videoDuration, isPlaying, handleUseVideoPlayerHook };
};

export default useVideoPlayer;
