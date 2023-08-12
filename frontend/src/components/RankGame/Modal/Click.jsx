import React from 'react';
import { useLottie } from 'lottie-react';
import click from 'assets/animation/click.json';

const Click = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: click,
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

export default Click;
