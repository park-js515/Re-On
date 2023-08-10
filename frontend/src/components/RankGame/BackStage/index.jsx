import LeftSide from './LeftSide';
import RightSide from './RightSide';

function BackStage({ myUserName, mySessionId, joinSession }) {
  return (
    <div id="join">
      <div id="img-div"></div>
      <div id="join-dialog">
        <div className="flex justify-around h-screen">
          
          {/* Left and Right Side Container */}
          <div className="flex w-4/5 justify-between">
            
            {/* Left Side */}
            <div className="w-3/5 h-[100%] flex flex-col justify-center">
              <LeftSide/>
            </div>
            
            {/* Right Side */}
            <div className="w-2/5 h-[90%] flex flex-col justify-center">
              <RightSide />

              {/* Info and Button below RightSide */}
              <div className='flex flex-col justify-center items-center mt-4'>
                <div>{myUserName}</div>
                <div>{mySessionId}</div>
                <button onClick={joinSession} className=" bg-info py-6 px-12">
                  입장
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
