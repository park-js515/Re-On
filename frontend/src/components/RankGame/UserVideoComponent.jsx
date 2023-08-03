import React from 'react';
import OpenViduVideoComponent from './OvVideo';

export default function UserVideoComponent({ streamManager }) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <div>
            <p className="text-white b">{getNicknameTag()}</p>
          </div>
          <OpenViduVideoComponent streamManager={streamManager} />
        </div>
      ) : null}
    </div>
  );
}
