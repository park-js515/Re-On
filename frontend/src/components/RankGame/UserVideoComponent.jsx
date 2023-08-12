import React from 'react';
import OpenViduVideoComponent from './OvVideo';

export default function UserVideoComponent({
  streamManager,
  mySide,
  recordOn,
  userCamBorder,
  type,
  handleSaveblob,
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
            <p className="text-white relative font-bold text-[24px] z-550">
              {getNicknameTag()}
              {mySide === 'USER_ONE' && '1️⃣'}
              {mySide === 'USER_TWO' && '2️⃣'}
            </p>
          </div>
          <OpenViduVideoComponent
            streamManager={streamManager}
            mySide={mySide}
            recordOn={recordOn}
            userCamBorder={userCamBorder}
            type={type}
            handleSaveblob={handleSaveblob}
          />
        </div>
      ) : null}
    </div>
  );
}
