import React from 'react';
import Webcam from 'react-webcam';

const CameraComponent = () => {
  const webcamRef = React.useRef(null);

  return (
    <Webcam
      audio={false}
      height={720}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={1280}
    />
  );
};

export default CameraComponent;
