import LeftSide from './LeftSide';
import RightSide from './RightSide';

function BackStage({ myUserName, mySessionId, joinSession }) {
  return (
    <div id="join">
      <div id="img-div"></div>
      <div id="join-dialog">
        <div className="flex justify-around h-screen">
          
          {/* Container */}
          <div className="flex w-4/5 justify-between">
            
            {/* Left Side */}
            <div className="w-3/5 h-[100%] flex flex-col justify-center">
              <LeftSide/>
            </div>
            
            {/* Right Side */}
            <div className="w-2/5 h-[90%] flex flex-col justify-center z-10">
              <RightSide />

              {/* 선수입장 */}
              <div className="flex flex-col justify-center items-center my-12 mb-6 space-y-4">
                  <button onClick={joinSession} className="bg-[#BCD570] text-white font-extrabold text-4xl px-20 py-6 rounded-full transform transition-transform duration-300 hover:scale-110 hover:bg-[#C3E166] shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-2 focus:ring-offset-2">
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
