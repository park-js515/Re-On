import React from 'react';
import OpenViduVideoComponent from './OvVideo';

export default function UserVideoComponent({ streamManager, mySide }) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <div>
            <p className="text-white font-bold text-[24px]">
              {getNicknameTag()}
            </p>
          </div>
          <OpenViduVideoComponent streamManager={streamManager} mySide={mySide}/>
        </div>
      ) : null}
    </div>
  );
}
