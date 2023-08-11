import React from 'react';
import { useLottie } from 'lottie-react';
import animationData from 'assets/animation/fiveCount.json';

const CountLoading = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { View } = useLottie(defaultOptions);

  return (
    <>
      <div>{View}</div>
    </>
  );
};

export default CountLoading;
