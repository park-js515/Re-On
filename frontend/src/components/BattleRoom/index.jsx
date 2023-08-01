import { useState, useEffect, useRef } from 'react';
import useModal from 'hooks/useModal';
import useLoading from 'hooks/useLoading';
import useVideoPlayer from 'hooks/useVideoPlayer';

import CustomModal from './subcomponents/CustomModal';
import UserCam from './subcomponents/UserCam';
import MUIButton from '@mui/material/Button';

const BattleRoom = () => {
  // 게임 로그 저장 ##########
  const currentTime = new Date();
  const logMessageTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

  const [log, setLog] = useState(['게임 상태를 기록합니다.']);
  const logContainerRef = useRef(null); // log 스크롤 유지
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [log]);

  // useLoading 훅 사용 ##########
  const { isLoading, startLoading } = useLoading(false, 5000);

  useEffect(() => {
    let intervalId;
    if (isLoading) {
      setLog((prevLog) => [...prevLog, ` ${logMessageTime} | 로딩 시작`]);
      let counter = 0;
      intervalId = setInterval(() => {
        setLog((prevLog) => [...prevLog, `${counter}초`]);
        counter++;
      }, 1000);
    } else {
      clearInterval(intervalId);
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 로딩 종료`]);
    }
    return () => clearInterval(intervalId);
  }, [isLoading]);

  const logMessage = 'No one in the room.';

  // 유저 더미 ##########
  const [userOne, setUserOne] = useState({
    id: '1',
    name: '종상',
    expression: 0,
    voice: 0,
    total: 0,
  });

  const [userTwo, setUserTwo] = useState({
    id: '2',
    name: '시치',
    expression: 0,
    voice: 0,
    total: 0,
  });

  // 모달 ##########
  const [saveStat, setSaveStat] = useState('');
  const { modalVisible: saveModalVisible, toggleModal: toggleSaveModal } =
    useModal(); // use the hook
  const { modalVisible: publicModalVisible, toggleModal: togglePublicModal } =
    useModal(); // use the hook

  const [isSave, SetIsSave] = useState(false);
  const [isPublic, SetIsPublic] = useState(false);

  const handleSave = () => {
    SetIsSave(true); // Save = True
    toggleSaveModal(); // Save모달 on/off
    togglePublicModal(); // Public모달 on/off
  };

  const handlePublic = () => {
    SetIsPublic(true); // Public = True
    togglePublicModal(); // Public모달 on/off
  };

  useEffect(() => {
    setSaveStat(`isSave : '${isSave}' / isPublic : '${isPublic}'`); // 모달 상태 변화 감지
    setLog((prevLog) => [
      ...prevLog,
      `${logMessageTime} | 저장 : ${isSave}, 공개 : ${isPublic}`,
    ]);
  }, [isSave, isPublic]);

  // 유저 입장 이벤트 ##########
  const [userOneListen, setUserOneListen] = useState(false);
  const [userTwoListen, setUserTwoListen] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    setLog((prevLog) => [...prevLog, logMessage]);
  }, [logMessage]);

  const handleClickUserOneCam = () => {
    if (connecting) {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 이미 연결중.`]);
    } else {
      if (userOneListen) {
        setLog((prevLog) => [
          ...prevLog,
          `${logMessageTime} | 유저1 이미 Listen.`,
        ]);
      } else if (userTwoListen) {
        setLog((prevLog) => [...prevLog, `${logMessageTime} | 연결!`]);
        setUserOneListen(true);
        setConnecting(true);
        handleConnect(); // 게임시작
      } else {
        setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저1 Listen.`]);
        setUserOneListen(true);
      }
    }
  };

  const handleClickUserTwoCam = () => {
    if (connecting) {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 이미 연결중.`]);
    } else {
      if (userTwoListen) {
        setLog((prevLog) => [
          ...prevLog,
          `${logMessageTime} | 유저2 이미 Listen.`,
        ]);
      } else if (userOneListen) {
        setLog((prevLog) => [...prevLog, `${logMessageTime} | 연결!`]);
        setUserTwoListen(true);
        setConnecting(true);
        handleConnect(); // 게임시작
      } else {
        setUserTwoListen(true);
        setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저2 Listen.`]);
      }
    }
  };

  // 유저 매칭 후 이벤트 ##########
  const [stage, setStage] = useState('NOT_READY'); // 현재 게임 상태 관리
  const [userCamOneBorder, setUserCamOneBorder] = useState(false); // 유저1 플레이시 테두리
  const [userCamTwoBorder, setUserCamTwoBorder] = useState(false); // 유저2 플레이시 테두리

  const { videoRef, videoDuration, isPlaying, handlePlayVideo } =
    useVideoPlayer(); // 비디오 플레이 훅

  // 턴 시작 ##########
  useEffect(() => {
    // 영화 미리보기
    if (stage === 'PREVIEW') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 작품 미리보기`]);
      // 유저 1 차례
    } else if (stage === 'USER_ONE_TURN') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 첫번째 연기 시작`]);
      userOnePlay();
      // 유저 2 차례
    } else if (stage === 'USER_TWO_TURN') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 두번째 연기 시작`]);
      userTwoPlay();
    } else if (stage === 'CALCULATION') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 계산 시작`]);
      caculateScore(); // 점수계산
    } else if (stage === 'END') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 게임 종료`]);
    }
  }, [stage]);

  // 턴 종료 ##########
  useEffect(() => {
    if (videoRef.current) {
      const handleEnded = () => {
        // 영화 미리보기 종료
        if (stage === 'PREVIEW') {
          setStage('USER_ONE_TURN');
          // 유저1 턴 종료
        } else if (stage === 'USER_ONE_TURN') {
          setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 1 종료`]);
          setUserCamOneBorder(false);
          setStage('USER_TWO_TURN');
          // 유저2 턴 종료
        } else if (stage === 'USER_TWO_TURN') {
          setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 2 종료`]);
          setLog((prevLog) => [...prevLog, `${logMessageTime} | 연기 종료`]);
          setUserCamTwoBorder(false);
          setStage('CALCULATION');
        }
      };
      // 비디오 요소에 이벤트 리스너 추가
      videoRef.current.addEventListener('ended', handleEnded); // ended면 handleEnded() 실행
      // 클린업 함수에서 이벤트 리스너 제거
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [videoRef, stage]); // videoRef 변화 시 useEffect 실행

  // 연결(게임시작) ##########
  const handleConnect = async () => {
    await startLoading(5000); // 로딩
    setLog((prevLog) => [
      ...prevLog,
      `${logMessageTime} |  작품 : ${videoRef.current.src} 작품 길이 : ${videoDuration} `,
    ]);
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 작품 미리보기`]);
    handlePlayVideo(); // 영화시작
    setStage('PREVIEW');
  };

  // 유저1 플레이 함수 생성 ##########
  const userOnePlay = async () => {
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 1 대기`]);
    await startLoading(5000); // 로딩
    setUserCamOneBorder(true);
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 1 시작`]);
    handlePlayVideo();
  };

  // 유저2 플레이 함수 생성 ##########
  const userTwoPlay = async () => {
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 2 대기`]);
    await startLoading(5000); // 로딩
    setUserCamTwoBorder(true);
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 2 시작`]);
    handlePlayVideo();
  };

  // 점수 계산 ##########
  const caculateScore = async () => {
    //  AI계산
    const getUserOneExpression = 92;
    const getUserOneVoice = 81;
    setUserOne((prevState) => ({
      ...prevState,
      expression: getUserOneExpression,
      voice: getUserOneVoice,
      total: getUserOneExpression + getUserOneVoice,
    }));

    const getUserTwoExpression = 12;
    const getUserTwoVoice = 23;
    setUserTwo((prevState) => ({
      ...prevState,
      expression: getUserTwoExpression,
      voice: getUserTwoVoice,
      total: getUserTwoExpression + getUserTwoVoice,
    }));

    setLog((prevLog) => [...prevLog, `${logMessageTime} | 계산 완료`]);
    setStage('END');
    await startLoading(3000);
    toggleSaveModal(); // 저장 모달
  };

  return (
    <div>
      <div>컴포넌트 확인용</div>
      <div>
        <h5>게임상태로그</h5>
        <div
          ref={logContainerRef}
          className="overflow-y-scroll h-[300px] w-1/2"
        >
          {log.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>

      <hr />

      <div className="flex">
        <video
          ref={videoRef}
          src="video/ISawTheDevil.mp4"
          className={`max-h-[300px] ${
            isPlaying ? 'border-2 border-red-500' : ''
          }`}
        />
        <UserCam
          onClick={handleClickUserOneCam}
          isOn={userOneListen}
          border={userCamOneBorder}
        />
        <UserCam
          onClick={handleClickUserTwoCam}
          isOn={userTwoListen}
          border={userCamTwoBorder}
        />
        <>
          {stage === 'END' && (
            <div>
              <h2>게임결과</h2>
              <div>
                {userOne.name}의 표정: {userOne.expression}
                {userOne.name}의 음성: {userOne.voice}
                {userOne.name}의 총점: {userOne.total}
              </div>
              <div>
                {userTwo.name}의 표정: {userTwo.expression}
                {userTwo.name}의 음성: {userTwo.voice}
                {userTwo.name}의 총점: {userTwo.total}
              </div>
            </div>
          )}
        </>
      </div>

      <hr />

      <div>
        <MUIButton variant="contained" onClick={toggleSaveModal}>
          모달 이벤트
        </MUIButton>
        <CustomModal
          open={saveModalVisible}
          title="저장?"
          description="저장함?"
          onConfirm={handleSave}
          onClose={toggleSaveModal}
        />
        <CustomModal
          open={publicModalVisible}
          title="공개?"
          description="공개함?"
          onConfirm={handlePublic}
          onClose={togglePublicModal}
        />
        <h1>저장상태 : {saveStat}</h1>
      </div>
      <hr />
    </div>
  );
};

export default BattleRoom;
