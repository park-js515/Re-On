
import React from "react";
import { useLottie } from "lottie-react";
import animationData from '../assets/animation/test';

const NormalGamePage = () => {
  const options = {
    animationData: animationData,
    loop: true
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export default NormalGamePage;