import LeftSide from './LeftSide';
import RightSide from './RightSide';
import TutorialModal from 'components/RankGame/Modal/TutorialModal';

import { useState } from 'react';
import './UserInfo/UserInfo.css';

function BackStage({ myUserName, mySessionId, joinSession, leaveSession }) {
  const [toggleTutorialModal, setToggleTutorialModal] = useState(false);

  const handleGameStart = async () => {
    try {
      // 마이크와 카메라에 대한 권한 요청
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      // 권한이 허용되면 joinSession 함수 호출
      joinSession();
    } catch (error) {
      // 권한 거부 또는 다른 오류 처리
      alert('카메라와 마이크 권한이 필요합니다. 설정에서 허용해주세요.');
    }
  };

  return (
    <div id="join">
      <div id="img-div"></div>
      <div id="join-dialog">
        <div className="flex justify-around h-screen ">
          {/* Container */}
          <div className="flex w-4/5 justify-between">
            {/* Left Side */}
            <div className="w-3/5 h-[100%] flex flex-col justify-center animate-slideInFromLeft">
              <LeftSide />
            </div>

            {/* Right Side */}
            <div className="w-2/5 h-[90%] flex flex-col justify-center z-1 ml-8 animate-slideInFromRight">
              <RightSide />

              {/* 선수입장 */}
              <div className="flex flex-row justify-center items-center my-12 mb-6 space-y-4">
                <button
                  onClick={handleGameStart}
                  className="bg-[#BCD570] text-white font-extrabold text-4xl mt-6 px-20 py-6 rounded-full transform transition-transform duration-300 hover:scale-105 hover:bg-[#C3E166] shadow-2xl hover:shadow-3xl focus:outline-none"
                >
                  게임시작
                </button>
                <div>
                  {/* 튜토리얼 버튼 */}
                  {toggleTutorialModal && (
                    <TutorialModal
                      type="tutorial"
                      onConfirm={leaveSession}
                      isOpen={toggleTutorialModal}
                      onClose={() => setToggleTutorialModal(false)}
                    />
                  )}
                  <button
                    className="m-0 flex items-center justify-center"
                    onClick={() => setToggleTutorialModal(true)}
                  >
                    <img
                      src="image/rank/rank-tutorial-btn.png"
                      alt="tutorial-btn"
                      className="w-[250px] hover:scale-110 "
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackStage;
