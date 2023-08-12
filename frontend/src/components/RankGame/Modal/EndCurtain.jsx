import React, { useState, useEffect } from 'react';
import './EndCurtain.css';
import Click from './Click';

const EndCurtain = ({
  className,
  resultGame,
  userOneName,
  userOneScore,
  userTwoName,
  userTwoScore,
  leaveSession,
  recordedFile,
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [countdown, setCountdown] = useState(10); // 카운트다운을 위한 상태

  const handleSaveRecordedFile = () => {
    if (recordedFile) {
      const url = window.URL.createObjectURL(recordedFile);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'recorded-video.mp4');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } else {
      alert('녹화된 영상이 없습니다.');
    }
  };

  useEffect(() => {
    if (countdown <= 0) {
      // leaveSession();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000); // 1초마다 카운트다운 감소

    return () => clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머를 제거
  }, [countdown, leaveSession]);

  return (
    <div className={`curtain ${className}`}>
      <div className={`curtain__image-container ${isChecked ? '' : 'hidden'}`}>
        <Click />
      </div>
      <div className="curtain__wrapper">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            if (isChecked) {
              setIsChecked(false);
            }
          }}
          style={{ zIndex: isChecked ? 100 : -1 }}
        />
        <div
          className={`curtain__panel curtain__panel--left ${
            isChecked ? '' : 'open'
          }`}
        ></div>
        <div className="curtain__prize text-white fixed inset-0 flex flex-col items-center text-4xl">
          <div className="mb-4 mt-20">
            <div>
              {resultGame === 999
                ? '죄송합니다. 통신의 문제가 발생했습니다.'
                : resultGame === 1
                ? '승'
                : resultGame === -1
                ? '패'
                : '무'}
            </div>
          </div>
          <div className="flex justify-between w-3/4">
            <div>{userOneName}</div>
            <div>{userTwoName}</div>
          </div>
          <br />
          <div className="flex justify-between w-3/4">
            <div>점수 : {userOneScore}</div>
            <div>점수 : {userTwoScore}</div>
          </div>
          <button onClick={handleSaveRecordedFile}>저장</button>
          <div className="countdown">
            {countdown}초 후에 대기실로 이동합니다.
          </div>
        </div>
        <div
          className={`curtain__panel curtain__panel--right ${
            isChecked ? '' : 'open'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default EndCurtain;
