import LeftSide from './LeftSide';
import RightSide from './RightSide';

function BackStage({ myUserName, mySessionId, joinSession }) {
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
            <div className="w-3/5 h-[100%] flex flex-col justify-center">
              <LeftSide />
            </div>

            {/* Right Side */}
            <div className="w-2/5 h-[90%] flex flex-col justify-center z-1 ml-8">
              <RightSide />

              {/* 선수입장 */}
              <div className="flex flex-col justify-center items-center my-12 mb-6 space-y-4">
                <button
                  onClick={handleGameStart}
                  className="bg-[#BCD570] text-white font-extrabold text-4xl px-20 py-6 rounded-full transform transition-transform duration-300 hover:scale-110 hover:bg-[#C3E166] shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C3E166]"
                >
                  게임시작
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}

export default BackStage;
