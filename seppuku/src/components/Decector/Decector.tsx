import React, { createRef, FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Decector.module.css';
import Webcam from "react-webcam";
import cameraIcon from'./camera.svg';

interface DecectorProps {}

const Decector: FC<DecectorProps> = () => {
  // States
  const [imageSrc, setImageSrc] = useState<any>('');
  const [imageElement, setImageElement] = useState<any>('');
  const [imageRef, setImageRef] = useState<any>('');
  const [loadedImage, setLoadedImage] = useState<any>('');
  const [ctx, setCtx] = useState<any>('');
  const [pixelData, setPixelData] = useState<any>('');
  const canvasRef = createRef() as any;

  // Web Cam setup
  const webcamRef = React.useRef(null) as any;
  const capture = useCallback(() => {
    if(webcamRef.current){setImageSrc(webcamRef.current.getScreenshot()); }
    },[webcamRef]
  );
  const webcam = <Webcam ref={webcamRef} screenshotFormat="image/jpeg"/>;

  const onRefChange = useCallback(node => {
    setImageRef(node);
  }, [imageElement]);

  const getImageHeight = function({target: img} :any){
    setLoadedImage(img);
  }

  useEffect(() => {
    console.log(imageRef);
    console.log(imageRef.src);
    console.log(imageRef.height);
    console.log(canvasRef.current);
    if(canvasRef.current){
      const ctx = canvasRef.current.getContext('2d')
      ctx.drawImage(imageRef, 0, 0);
      setCtx(ctx);
      const pixelData = ctx.getImageData(0, 0, 640, 480);
      console.log(pixelData);
      setPixelData(pixelData);
      setImageElement('');
    }
  }, [loadedImage]);

  useEffect(() => {
    setImageElement(<img onLoad={getImageHeight} ref={onRefChange} src={imageSrc} alt="Captured Image" id="image" />);
  }, [imageSrc]);

  useEffect(() => {
    let x = 0;
    let y = 0;
    let bottom = undefined;
    const colour = 'green';
    let threshold = 10;
    const plotPoint = (x:any, y:any, colour = 'green', r = 0.5) =>{
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI, false);
      ctx.fillStyle = colour;
      ctx.fill();
      ctx.beginPath();
    }
    for (y = 0; y < pixelData.height; y++) {
        for (x = 0; x < pixelData.width; x++) {
            // get this pixel's data
            // currently, we're looking at the blue channel only.
            // Since this is a B/W photo, all color channels are the same.
            // ideally, we would make this work for all channels for color photos.
            const index = (x + y * 640) * 4;
            const pixel = pixelData.data[index + 2];

            // Get the values of the surrounding pixels
            // Color data is stored [r,g,b,a][r,g,b,a]
            // in sequence.
            const bottom = pixelData.data[index + (640 * 4)];

            //Compare it all.
            // (Currently, just the left pixel)
            if (pixel > bottom + threshold) {
                plotPoint(x, y, colour);
            }
            else if (pixel < bottom - threshold) {
                plotPoint(x, y, colour);
            }
        }
    }
  }, [pixelData]);

  const canvas = <canvas ref={canvasRef} height="480" width="640"/>;
  
  return <>
    {imageSrc && imageElement}
    {loadedImage && canvas}
    {!imageSrc && webcam}
    {/* {imageSrc && copyCanvas} */}
    <button onClick={capture}>
      <img src={cameraIcon} className="App-logo" alt="take a picture" />
    </button>
    <div className={styles.Decector} data-testid="Decector">
      Decector Component
    </div>
  </>;
};

export default Decector;
