import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/notFound.json';

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={500} />
    </div>
  );
};

export default NotFound;
