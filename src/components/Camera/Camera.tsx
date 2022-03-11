import React, { createRef, FC, useCallback, useEffect, useState } from 'react';
import styles from './Camera.module.css';
import Webcam from "react-webcam";
import cameraIcon from'./camera.svg';
import binIcon from'./bin.svg';

interface CameraProps {ctxReady: Function, imageWidth: number, imageHeight: number}

const Camera: FC<CameraProps> = ({ctxReady, imageWidth, imageHeight}) => {
  const videoConstraints = {
    width: { max: imageWidth },
    height: { max: imageHeight },
    facingMode: "environment"
  };

  // States
  const [imageSrc, setImageSrc] = useState<any>('');
  const [imageElement, setImageElement] = useState<any>('');
  const [imageRef, setImageRef] = useState<any>('');
  const [loadedImage, setLoadedImage] = useState<any>('');
  const [dimentions, setDimensions] = useState<any>(null);
  const canvasRef = createRef() as any;

  // Web Cam setup
  const webcamRef = React.useRef(null) as any;
  const capture = useCallback(() => {
    if(webcamRef.current){
      setImageSrc(webcamRef.current.getScreenshot());
    }
    },[webcamRef]
  );

  const getDimentions = useCallback(() => {
    const video: HTMLVideoElement = webcamRef.current.video;
    console.log(video.videoWidth);
    setTimeout(() => { 
      setDimensions({width: video.videoWidth, height: video.videoHeight});
      console.log(video.videoWidth); 
    }, 1000);
  }, []);
  const webcam = <Webcam  onUserMedia={getDimentions} className={styles.camera} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints}/>;

  useEffect(() => {
    setImageElement(<img onLoad={handleImageLoad} ref={onRefChange} src={imageSrc} alt="Captured Image" id="image" />);
  }, [imageSrc]);

  const onRefChange = useCallback(node => {
    setImageRef(node);
  }, [imageElement]);

  const handleImageLoad = function({target: img} :any){
    setLoadedImage(img);
  }

  useEffect(() => {
    if(canvasRef.current && imageRef){
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(imageRef, 0, 0);
      setImageElement('');
      ctxReady(canvasRef.current);
    }
  }, [loadedImage]);

  useEffect(() => {
    if(canvasRef.current){

      const boxSize = dimentions.height * 0.5;
      const xMod = (dimentions.width - boxSize) / 2;
      const yMod = (dimentions.height - boxSize) / 2;
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, dimentions.width , dimentions.height);
      for (let y = 0; y < dimentions.height; y++) {
        for (let x = 0; x < dimentions.width; x++) {
          if(!(x > xMod && x < (dimentions.width - xMod) && y > yMod && y < (dimentions.height - yMod))){
            ctx.fillStyle = `rgba(${x},${y},0, 0.7)`;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  }, [dimentions]);

  const reset = useCallback((callback) => {
    setImageSrc(null);
    setLoadedImage(null);
    setImageElement('');
    ctxReady(null);
  },[]);

  const uiButton = imageSrc ? 
    <button className={styles.uiButton} onClick={reset} style={dimentions && {"margin-top":`${dimentions.height*0.75}px`}}><img src={binIcon} alt="reset" /></button> : 
    <button className={styles.uiButton} onClick={capture} style={dimentions && {"margin-top":`${dimentions.height*0.75}px`}}><img src={cameraIcon} alt="take a picture" /></button>;

    
  const canvas = dimentions ? <canvas className={styles.canvas} ref={canvasRef} height={dimentions.height} width={dimentions.width}/> : '';
  
  return <>
    <div className={styles.CameraWrapper}  style={dimentions && {"height":dimentions.height, "width":dimentions.width}}>
      <div className={styles.InnerWrapper}>
        {imageSrc && imageElement}
        {canvas}
        {!imageSrc && webcam}
        {uiButton}
      </div>
    </div>

  </>;
};

export default Camera;