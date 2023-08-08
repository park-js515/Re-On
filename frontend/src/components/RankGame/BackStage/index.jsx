import LeftSide from './LeftSide';
import RightSide from './RightSide';

function BackStage({ myUserName, mySessionId, joinSession }) {
  return (
    <div id="join">
      <div id="img-div"></div>
      <div id="join-dialog">
        <div className=" flex justify-around h-screen">
          <div className="w-128 flex flex-col justify-center">
            <LeftSide />
          </div>
          <div className="w-128 flex flex-col justify-center">
            <RightSide />
          </div>
        </div>
      </div>
      <div>{myUserName}</div>
      <div>{mySessionId}</div>
      <button onClick={joinSession}>입장</button>
    </div>
  );
}

export default BackStage;
