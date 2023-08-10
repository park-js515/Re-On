import React from 'react';
import { useLottie } from 'lottie-react';
import animationData from 'assets/animation/rankMacthing.json';

const Mainlottie = () => {
  const defaultOptions = {
    loop: true,
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

export default Mainlottie;
