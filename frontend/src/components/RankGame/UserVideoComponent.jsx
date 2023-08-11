import React from 'react';
import OpenViduVideoComponent from './OvVideo';

export default function UserVideoComponent({
  streamManager,
  mySide,
  recordOn,
  userCamBorder,
}) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <div className="flex">
            <p className=" text-white relative font-semibold text-[24px] z-550">
              {getNicknameTag()}
            </p>
          </div>
          <OpenViduVideoComponent
            streamManager={streamManager}
            mySide={mySide}
            recordOn={recordOn}
            userCamBorder={userCamBorder}
          />
          <div className="h-[100px] w-[100px]">
            {mySide === 'USER_ONE' && (
              <img src="image/rank/rank-first-turn.png" alt="First Turn" />
            )}
            {mySide === 'USER_TWO' && (
              <img src="image/rank/rank-second-turn.png" alt="Second Turn" />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
