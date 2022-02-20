import React, { createRef, FC, useEffect, useState } from 'react';
import styles from './Decector.module.css';
import Point from '../../model/Point';
import cannyEdgeDetector from '../../model/CannyEdgeDetector';
import HoughTransform from '../../model/HoughTransform';
import Image from 'image-js';

interface DecectorProps {canvas: any}

const Decector: FC<DecectorProps> = ({canvas}) => {
  const ctx = canvas.getContext('2d');
  const [threshholdDone, setThreshholdDone] = useState<any>(false);
  const [edges, setEdges] = useState<any>(null);
  const [points, setPoints] = useState<any>(null);

  const maxGap = 20;
  const lineThreshold = 20;
  const globalThreshold = 80;
  const xColour = "red";
  const yColour = "green";
  const imageWidth = 640;
  const imageHeight = 480;
  const imageRef = createRef() as any;

  const minLineLength = 120;

  useEffect(() => {
    setTimeout(()=>{
      if(!points){
        const freshPoints = new Array<Point>();
        for (let y = 0; y < imageHeight; y++) {
          for (let x = 0; x < imageWidth; x++) {
            freshPoints.push(new Point(x, y, 640));
          }
        }
        setPoints(freshPoints);
      }
    }, 1);
  }, [threshholdDone]);

  useEffect(() => {
    setTimeout(()=>{
      //threshold();
      Image.load(canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")).then((img: Image) => {
        const grey = img.grey();
        setEdges(cannyEdgeDetector(grey));
      });
      // getYLines(pixelData);
      //getXLines();
    }, 1);
  }, [points]);
  


  const makeImage = () => {
    const img = <img onLoad={copyToCanvas} ref={imageRef} src={edges.toDataURL()} alt="Captured Image" id="image" />;
    return ;
  }

  const copyToCanvas = () =>{
    ctx.drawImage(imageRef.current, 0, 0);
    boxImage();
    setTimeout(() =>{
      doHueTransform();
    }, 1000);
  }

  const doHueTransform = () => {
    const houghTransform = new HoughTransform(canvas);
    const pixelData:ImageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    points.forEach((point: Point) => {
      const inX = point.x > 170 && point.x < (170+300);
      const inY = point.y > 90 && point.y < (90+300);
      if(inX && inY && point.getColourMagnitued(pixelData.data) > 10){
        houghTransform.houghAcc(point.x,point.y);
      }
    });
    houghTransform.findMaxInHough();
  }

  // const getYLines = (pixelData: any) => {
  //   const lines = [];
  //   for (let x = 0; x < pixelData.width; x++) {
  //     let isLine = true;
  //     let gap = 0;
  //     for (let y = 0; y < pixelData.height; y++) {
  //       // get this pixel's data blue channel
  //       const index = (x + y * 640) * 4;
  //       const pixel = pixelData.data[index + 2];

  //       // Get the values of the surrounding pixels
  //       const left = pixelData.data[index - 4];
  //       if (pixel > left + lineThreshold) {
  //           plotPoint(x-1, y, xColour, 1);
  //           gap = 0;
  //       }
  //       if (gap < maxGap) {
  //         gap++;
  //       } else {
  //         isLine = false;
  //         break;
  //       }
  //     }
  //     if (isLine) {
  //       lines.push(x);
  //     }
  //   }
  // }

  const getXLines = () => {
    const pixelData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    const lines = [];
    for (let y = 0; y < pixelData.height; y++) {
      let length = 0;
      let gap = 0;
      for (let x = 0; x < pixelData.width; x++) {
          // get this pixel's data blue channel and nabours values
          const index = (x + y * imageWidth) * 4;
          const pixel = pixelData.data[index];
          const bottom = pixelData.data[index + (imageWidth * 4)];

          if (pixel > bottom + lineThreshold) {
            //plotPoint(x, y+1, yColour, 1);
            gap = 0;
            length++;
          } else if(gap < maxGap){
            gap++; length++;
          } else{
            length = length - gap;
            if(length > minLineLength){
              console.log(length);
              lines.push({y:y, sx:x-length, ex:x});
            }
            length = 0;
            gap = 0;
          }

      }

    }
    console.log(lines);
    lines.forEach((l, i) => {
      //renderLine(l, 'y' , i);
    });
  }

  const putImageData = (imageData: ImageData) => {
    ctx.putImageData(imageData, 0, 0);
  };

  const drawLine = (x1:number, y1:number, x2:number, y2:number, width: number, height: number) => {
    ctx.beginPath();
    ctx.strokeStyle='rgba(255,0,0,1)';
    ctx.moveTo(x1+width/2,y1+height/2);
    ctx.lineTo(x2+width/2,y2+height/2);
    ctx.stroke();
    ctx.strokeStyle='rgba(0,0,0,1)';
    ctx.closePath();
  }

  

  const renderLine = (pixelData: ImageData, start: Point, end: Point) => {
    // const boxLines = [3, 6];
    // const colour = boxLines.includes(i) ? 'purple' : dir == 'y' ? 'cyan' : 'teal';
    // const r = boxLines.includes(i) ? 3 : 3;
    // console.log(line);
    // var x, y;
    // switch (dir) {
    //     case 'y':
    //         for (x = line.sx; x < line.ex; x++) {
    //             plotPoint(x, line.y, colour, r);
    //         }
    //         break;
    //     case 'x':
    //         for (y = line.sy; y < line.ey; y++) {
    //             plotPoint(line.x, y, colour, r);
    //         }
    //         break;
    // }
}

  const threshold = () => {
      const pixelData: ImageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
      points.forEach( (point: Point) => {
        if(point.getColourMagnitued(pixelData.data) / 3 < globalThreshold) {
          point.plot(pixelData.data, "#000000");
        }
      });
      putImageData(pixelData);
  }

  const boxImage = () => {
    const pixelData: ImageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    points.forEach( (point: Point) => {
      const inX = point.x > 170 && point.x < (170+300);
      const inY = point.y > 90 && point.y < (90+300);
      if(!(inX && inY)){
        point.plot(pixelData.data, "#000000");
      }
    });
    putImageData(pixelData);
}

  if(!threshholdDone){
    setThreshholdDone(true);
  }
  return <> 
  {edges && <img onLoad={copyToCanvas} ref={imageRef} src={edges.toDataURL()} alt="Captured Image" id="image" hidden />}
  </>;
};

export default Decector;
