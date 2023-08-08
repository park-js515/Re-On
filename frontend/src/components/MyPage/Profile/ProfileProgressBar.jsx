import './Profile.css';
import { useState, useEffect } from 'react';

const ProgressBar = ({ per = 100 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let width = 0;
    const interval = setInterval(() => {
      width++;
      if (width <= per) {
        setProgress(width);
      } else {
        clearInterval(interval);
      }
    }, 50);
  }, [per]);

  return (
    <div className="Profile-progressBarContainer">
      <div
        className="Profile-progressBar"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export { ProgressBar };
