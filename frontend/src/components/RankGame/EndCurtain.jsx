import React, { useState } from 'react';
import './EndCurtain.css';

const EndCurtain = ({
  resultGame,
  userOneName,
  userOneScore,
  userTwoName,
  userTwoScore,
}) => {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <div className="curtain">
      <div className="curtain__wrapper">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <div
          className={`curtain__panel curtain__panel--left ${
            isChecked ? '' : 'open'
          }`}
        ></div>
        <div className="curtain__prize text-white">
          {resultGame === 1 ? '승' : resultGame === -1 ? '패' : '무'}
          <br />
          {userOneName} : {userOneScore}
          <br />
          {userTwoName} : {userTwoScore}
        </div>
        <div
          className={`curtain__panel curtain__panel--right ${
            isChecked ? '' : 'open'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default EndCurtain;
