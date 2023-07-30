import { useState, useEffect, useRef } from "react";

import UserCam from "components/common/UserCam";
import CustomModal from "components/common/CustomModal";
import styled from "styled-components";
import Button from "components/common/Button";

import useModal from "hooks/useModal";
import useLoading from "hooks/useLoading";
import useVideoPlayer from "hooks/useVideoPlayer";

const SLayout = styled.div`
  display: flex;
`;

const SLogContainer = styled.div`
  height: 100px; /* 원하는 높이 설정 */
  font-size: 15px;
  overflow-y: auto; /* 스크롤 설정 */
`;

const SLogMessage = styled.p`
  margin: 0;
  padding: 0;
`;

const SVideo = styled.video`
  width: 300px;
  height: 300px;
  border: ${({ $isPlaying }) => ($isPlaying ? "2px solid red" : "none")};
`;

const BattleRoom = () => {
  // #################       모달      ####################
  const [saveStat, setSaveStat] = useState("");
  const { modalVisible: saveModalVisible, toggleModal: toggleSaveModal } =
    useModal(); // use the hook
  const { modalVisible: publicModalVisible, toggleModal: togglePublicModal } =
    useModal(); // use the hook

  const [isSave, SetIsSave] = useState(false);
  const [isPublic, SetIsPublic] = useState(false);

  const handleSave = () => {
    SetIsSave(true); // Save = True
    toggleSaveModal(); // Save모달 꺼짐
    togglePublicModal(); // Public모달 켜짐
  };

  const handlePublic = () => {
    SetIsPublic(true); // Public = True
    togglePublicModal(); // Public모달 꺼짐
  };

  // 모달 상태 변화 감지
  useEffect(() => {
    setSaveStat(`isSave : '${isSave}' / isPublic : '${isPublic}'`);
  }, [isSave, isPublic]);
  // #################################################

  // // #################       게임 로그 저장      ####################
  const currentTime = new Date();
  const logMessageTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

  const [log, setLog] = useState(["게임 상태를 기록합니다."]);
  const logContainerRef = useRef(null); // log 스크롤 유지
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [log]);

  // ################# useLoading 훅 사용 #################
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

  const logMessage = "No one in the room.";

  // // #################       유저 입장 이벤트      ####################
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

  // ##################유저 매칭 후 이벤트###############
  const [stage, setStage] = useState("NOT_READY"); // 현재 게임 상태 관리
  const [userCamOneBorder, setUserCamOneBorder] = useState(false); // 유저1 플레이시 테두리
  const [userCamTwoBorder, setUserCamTwoBorder] = useState(false); // 유저2 플레이시 테두리

  const { videoRef, videoDuration, isPlaying, handlePlayVideo } =
    useVideoPlayer(); // 비디오 플레이 훅

  // 턴 시작
  useEffect(() => {
    // 영화 미리보기
    if (stage === "PREVIEW") {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 작품 미리보기`]);
      // 유저 1 차례
    } else if (stage === "USER_ONE_TURN") {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 첫번째 연기 시작`]);
      userOnePlay();
      // 유저 2 차례
    } else if (stage === "USER_TWO_TURN") {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 두번째 연기 시작`]);
      userTwoPlay();
    } else if (stage === "END") {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 연기 종료`]);
    }
  }, [stage]);

  // 턴 종료
  useEffect(() => {
    if (videoRef.current) {
      const handleEnded = () => {
        // 영화 미리보기 종료
        if (stage === "PREVIEW") {
          setStage("USER_ONE_TURN");
          // 유저1 턴 종료
        } else if (stage === "USER_ONE_TURN") {
          setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 1 종료`]);
          setUserCamOneBorder(false);
          setStage("USER_TWO_TURN");
          // 유저2 턴 종료
        } else if (stage === "USER_TWO_TURN") {
          setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 2 종료`]);
          setUserCamTwoBorder(false);
          setStage("END");
        }
      };
      // 비디오 요소에 이벤트 리스너 추가
      videoRef.current.addEventListener("ended", handleEnded); // ended면 handleEnded() 실행
      // 클린업 함수에서 이벤트 리스너 제거
      return () => {
        videoRef.current.removeEventListener("ended", handleEnded);
      };
    }
  }, [videoRef, stage]); // videoRef 변화 시 useEffect 실행

  const handleConnect = async () => {
    await startLoading(5000); // 로딩
    setLog((prevLog) => [
      ...prevLog,
      `${logMessageTime} |  작품 : ${videoRef.current.src} 작품 길이 : ${videoDuration} `,
    ]);
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 작품 미리보기`]);
    handlePlayVideo(); // 영화시작
    setStage("PREVIEW");
  };

  // 유저1 플레이 함수 생성
  const userOnePlay = async () => {
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 1 대기`]);
    await startLoading(5000); // 로딩
    setUserCamOneBorder(true);
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 1 시작`]);
    handlePlayVideo();
  };

  // 유저2 플레이 함수 생성
  const userTwoPlay = async () => {
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 2 대기`]);
    await startLoading(5000); // 로딩
    setUserCamTwoBorder(true);
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 2 시작`]);
    handlePlayVideo();
  };

  console.log(stage);
  return (
    <div>
      <div>컴포넌트 확인용</div>
      <SLayout>
        <div>
          <h5>게임상태로그</h5>
          <SLogContainer ref={logContainerRef}>
            {log.map((log, index) => (
              <SLogMessage key={index}>{log}</SLogMessage>
            ))}
          </SLogContainer>
        </div>
      </SLayout>
      <hr />
      <SLayout>
        <SVideo
          ref={videoRef}
          src="video/ISawTheDevil.mp4"
          $isPlaying={isPlaying}
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
      </SLayout>
      <hr />
      <SLayout>
        <Button name="모달 이벤트" onClick={toggleSaveModal} />
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
      </SLayout>
      <hr />
    </div>
  );
};

export default BattleRoom;
