import React, { useState } from 'react';
import './EndCurtain.css';

const EndCurtain = ({
  className,
  resultGame,
  userOneName,
  userOneScore,
  userTwoName,
  userTwoScore,
}) => {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <div className={`curtain ${className}`}>
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
        <div className="curtain__prize text-white fixed inset-0 flex justify-center items-center">
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
