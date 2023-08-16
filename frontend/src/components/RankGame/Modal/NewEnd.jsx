import React, { useState, useEffect } from 'react';
import './NewEnd.css';
import { savePost } from 'apiList/post';
import Swal from 'sweetalert2';

const NewEnd = ({
  className,
  resultGame,
  userOneName,
  userOneScore,
  userTwoName,
  userTwoScore,
  leaveSession,
  recordedFile,
  userOneSttScore,
  userTwoSttScore,
  videoId,
}) => {
  const [initial, setInitial] = useState(false);
  // 초기 애니메이션 설정
  useEffect(() => {
    setTimeout(() => {
      setInitial(true);
    }, 100);
  }, []);

  // #########################################

  const [isChecked, setIsChecked] = useState(true);
  const [countdown, setCountdown] = useState(15); // 카운트다운을 위한 상태
  const [isSaved, setIsSaved] = useState(false); // 저장 확인

  const handleSaveRecordedFile = async () => {
    if (recordedFile) {
      const formData = new FormData();

      // ######### 녹화 업로드 API
      formData.append('actionVideo', recordedFile);
      savePost(
        videoId,
        formData,
        (response) => {
          console.log(response.data.response);
          console.log(response);
        },
        (error) => {
          console.log(error);
        },
      );

      setIsSaved(true);

      // ######### 로컬에 파일 저장
      // const url = window.URL.createObjectURL(recordedFile);
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'recorded-video.mp4');
      // document.body.appendChild(link);
      // link.click();
      // window.URL.revokeObjectURL(url);
    } else {
      Swal.fire({
        icon: 'error',
        text: '녹화된 영상이 없습니다',
        backdrop: false,
      });
    }
  };

  useEffect(() => {
    if (countdown <= 0) {
      leaveSession();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000); // 1초마다 카운트다운 감소

    return () => clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머를 제거
  }, [countdown, leaveSession]);

  return (
    <div className={`cont ${initial ? 'initial' : ''} ${className}`}>
      <div className={`app`}>
        <div className="app__bgimg">
          <div className="app__bgimg-image app__bgimg-image--1"></div>
        </div>
        <div className="app__img">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/whiteTest4.png"
            alt="city"
          />
        </div>

        <div className="app__text app__text--1">
          <div className="app__text-line app__text-line--4">
            <img src="Logo.ico" alt="" style={{ width: 50 }} />
            {resultGame === 999
              ? '통신 오류'
              : resultGame === 1
              ? '승리'
              : resultGame === -1
              ? '패배'
              : '무승부'}
          </div>
          <div className="app__text-line app__text-line--3 flex">
            <div>{userOneName}</div>
            <div>{userTwoName}</div>
          </div>
          <div className="app__text-line app__text-line--2 flex">
            <div>
              <div>점수 : {userOneScore}</div>
              <div>음성점수 : {userOneSttScore}</div>
              <div>총점 : {userOneScore + userOneSttScore}</div>
            </div>
            <div>
              <div>점수 : {userTwoScore}</div>
              <div>음성점수 : {userTwoSttScore}</div>{' '}
              <div>총점 : {userTwoScore + userTwoSttScore}</div>
            </div>
          </div>
          <div className="app__text-line app__text-line--1">
            <button
              onClick={handleSaveRecordedFile}
              disabled={isSaved}
              style={{ color: isSaved ? 'grey' : 'inherit' }}
            >
              📥내 연기 저장
            </button>
            {isSaved && <p>마이페이지에 저장했습니다!</p>}
            <div className="countdown">
              {countdown}초 후에 대기실로 이동합니다.
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default NewEnd;
