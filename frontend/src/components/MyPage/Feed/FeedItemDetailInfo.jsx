import { useState } from 'react';
import ReactPlayer from 'react-player';

const CloseButton = ({ children, onClick }) => {
  return <button 
  className='hover:bg-darkGray transition ease-in-out delay-150'
  onClick={onClick}>{children}</button>;
};

/**
 * Videoplayer : 비디오 플레이어를 보여줍니다.
 * @param {string} url: 비디오의 URL입니다. (DB에서의 비디오 주소를 넣어주세요.)
 * @returns {JSX.Element}: url이 유효하다면 비디오 플레이어를 반환, 아닐 시는 후에 결정
 */
const VideoPlayer = ({ url }) => {
  const [error, setError] = useState(false);
  const handleSetError = () => {
    setError(true);
  };

  if (error) {
    alert('죄송합니다. 현재 동영상에 문제가 발생했습니다.');
    return <div>VideoPlayer Error</div>;
  }

  return (
    <ReactPlayer
      url={url}
      controls
      width="640px"
      height="360px"
      muted
      onError={handleSetError}
      config={{ file: { attributes: { disablePictureInPicture: true } } }}
    >
      Your browser does not support the video tag.
    </ReactPlayer>
  );
};

export { CloseButton, VideoPlayer };
