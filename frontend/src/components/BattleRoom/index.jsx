import { useState, useEffect, useRef } from "react";

import UserCam from "components/common/UserCam";
import CustomModal from "components/common/CustomModal";
import styled from "styled-components";
import Button from "components/common/Button";

import useModal from "hooks/useModal";

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

  // // #################       게임 규칙      ####################
  const [log, setLog] = useState(["게임 상태를 기록합니다."]);

  const logMessage = "No one in the room.";

  const [userOneListen, setUserOneListen] = useState(false);
  const [userTwoListen, setUserTwoListen] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    setLog((prevLog) => [...prevLog, logMessage]);
  }, [logMessage]);

  const handleClickUserOneCam = () => {
    if (connecting) {
      setLog((prevLog) => [...prevLog, "이미 연결중."]);
    } else {
      if (userOneListen) {
        setLog((prevLog) => [...prevLog, "유저1 이미 Listen."]);
      } else if (userTwoListen) {
        setLog((prevLog) => [...prevLog, "연결!"]);
        setUserOneListen(true);
        setConnecting(true);
      } else {
        setLog((prevLog) => [...prevLog, "유저1 Listen."]);
        setUserOneListen(true);
      }
    }
  };

  const handleClickUserTwoCam = () => {
    if (connecting) {
      setLog((prevLog) => [...prevLog, "이미 연결중."]);
    } else {
      if (userTwoListen) {
        setLog((prevLog) => [...prevLog, "유저2 이미 Listen."]);
      } else if (userOneListen) {
        setLog((prevLog) => [...prevLog, "연결!"]);
        setUserTwoListen(true);
        setConnecting(true);
      } else {
        setUserTwoListen(true);
        setLog((prevLog) => [...prevLog, "유저2 Listen."]);
      }
    }
  };
  // #################################################
  const logContainerRef = useRef(null);
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [log]);

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
        <UserCam onClick={handleClickUserOneCam} />
        <UserCam onClick={handleClickUserTwoCam} />
      </SLayout>
      <hr />
      <SLayout>
        <Button name="저장모달" onClick={toggleSaveModal} />
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
