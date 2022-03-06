import React, { createRef, FC, useCallback, useEffect, useState } from 'react';
import styles from './Camera.module.css';
import Webcam from "react-webcam";
import cameraIcon from'./camera.svg';
import binIcon from'./bin.svg';

interface CameraProps {ctxReady: Function, width: number, height: number}

const Camera: FC<CameraProps> = ({ctxReady, width, height}) => {
  const videoConstraints = {
    width: width,
    height: height,
    facingMode: "environment"
  };

  // States
  const [imageSrc, setImageSrc] = useState<any>('');
  const [imageElement, setImageElement] = useState<any>('');
  const [imageRef, setImageRef] = useState<any>('');
  const [loadedImage, setLoadedImage] = useState<any>('');
  const canvasRef = createRef() as any;

  // Web Cam setup
  const webcamRef = React.useRef(null) as any;
  const capture = useCallback(() => {
    if(webcamRef.current){setImageSrc(webcamRef.current.getScreenshot()); }
    },[webcamRef]
  );
  const webcam = <Webcam ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints}/>;

  useEffect(() => {
    setImageElement(<img onLoad={getImageHeight} ref={onRefChange} src={imageSrc} alt="Captured Image" id="image" />);
  }, [imageSrc]);

  const onRefChange = useCallback(node => {
    setImageRef(node);
  }, [imageElement]);

  const getImageHeight = function({target: img} :any){
    setLoadedImage(img);
  }

  useEffect(() => {
    if(canvasRef.current){
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(imageRef, 0, 0);
      setImageElement('');
      ctxReady(canvasRef.current);
    }
  }, [loadedImage]);

  const reset = useCallback((callback) => {
    setImageSrc(null);
    setLoadedImage(null);
    setImageElement('');
    ctxReady(null);
  },[]);

  const uiButton = imageSrc ? 
    <button className={styles.uiButton} onClick={reset}><img src={binIcon} alt="reset" /></button> : 
    <button className={styles.uiButton} onClick={capture}><img src={cameraIcon} alt="take a picture" /></button>;

  const canvas = <canvas ref={canvasRef} height={height} width={width}/>;
  
  return <>
    <div className={styles.CameraWrapper}>
      {imageSrc && imageElement}
      {loadedImage && canvas}
      {!imageSrc && webcam}
    </div>
    {uiButton}
  </>;
};

export default Camera;