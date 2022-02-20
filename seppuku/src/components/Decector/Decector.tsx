import React, { createRef, FC, useEffect, useState } from 'react';
import styles from './Decector.module.css';
import Point from '../../model/Point';
import cannyEdgeDetector from '../../model/CannyEdgeDetector';
import HoughTransform from '../../model/HoughTransform';
import Image from 'image-js';
import Intersection from '../../model/Intersection';
import Square from '../../model/Square';

interface DecectorProps {canvas: any}

const Decector: FC<DecectorProps> = ({canvas}) => {
  const ctx = canvas.getContext('2d');
  const [threshholdDone, setThreshholdDone] = useState<any>(false);
  const [edges, setEdges] = useState<any>(null);
  const [origin, setOrigin] = useState<any>(null);
  const [points, setPoints] = useState<any>(null);

  const maxGap = 20;
  const lineThreshold = 20;
  const globalThreshold = 80;
  const xColour = "red";
  const yColour = "green";
  const imageWidth = 640;
  const imageHeight = 480;
  const imageRef = createRef() as any;
  const orgImageRef = createRef() as any;
  const intersectionPoints: Intersection[] = [];
  const squares: Square[] = [];

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
        setOrigin(img.toDataURL());
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
    ctx.drawImage(orgImageRef.current, 0, 0);
    points.forEach((point: Point) => {
      const inX = point.x > 170 && point.x < (170+300);
      const inY = point.y > 90 && point.y < (90+300);
      if(inX && inY && point.getColourMagnitued(pixelData.data) > 10){
        houghTransform.houghAcc(point.x,point.y);
      }
    });
    const lines = houghTransform.findMaxInHough();
    const hlines = lines.filter(l =>  l.y1 + 5 > l.y2 && l.y1 - 5 < l.y2);
    const vlines = lines.filter(l =>  l.x1 + 5 > l.x2 && l.x1 - 5 < l.x2);
    hlines.forEach((hl) => {
      vlines.forEach((vl) => {
          intersects(vl.x1 + 320, hl.y1 + 240);
      });
    });
    console.log(intersectionPoints);
    findSquares();
  }

  const findSquares = () => {
    intersectionPoints.forEach(
        (p, i) => {
            if (i + 11 < intersectionPoints.length && (i - 9) % 10 != 0) {
                const sq = new Square(i, ctx, canvas, p, intersectionPoints[i + 11]);
                squares.push(sq);
            }
        });
    squares.forEach((s, i) => {
        if (i % 2 == 0) {
            s.draw();
        } else {
            s.draw('green');
        }
        setTimeout(function () {
            s.getLetter();
        }, i * 50);
    });
}

  const intersects = (x:number, y:number) => {
    intersectionPoints.push(new Intersection(x, y));
  }

  const putImageData = (imageData: ImageData) => {
    ctx.putImageData(imageData, 0, 0);
  };

  // const drawLine = (x1:number, y1:number, x2:number, y2:number, width: number, height: number) => {
  //   ctx.beginPath();
  //   ctx.strokeStyle='rgba(255,0,0,1)';
  //   ctx.moveTo(x1+width/2,y1+height/2);
  //   ctx.lineTo(x2+width/2,y2+height/2);
  //   ctx.stroke();
  //   ctx.strokeStyle='rgba(0,0,0,1)';
  //   ctx.closePath();
  // }
  // const renderLine = (pixelData: ImageData, start: Point, end: Point) => {
  //   // const boxLines = [3, 6];
  //   // const colour = boxLines.includes(i) ? 'purple' : dir == 'y' ? 'cyan' : 'teal';
  //   // const r = boxLines.includes(i) ? 3 : 3;
  //   // console.log(line);
  //   // var x, y;
  //   // switch (dir) {
  //   //     case 'y':
  //   //         for (x = line.sx; x < line.ex; x++) {
  //   //             plotPoint(x, line.y, colour, r);
  //   //         }
  //   //         break;
  //   //     case 'x':
  //   //         for (y = line.sy; y < line.ey; y++) {
  //   //             plotPoint(line.x, y, colour, r);
  //   //         }
  //   //         break;
  //   // }
  // }
  // const threshold = () => {
  //     const pixelData: ImageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
  //     points.forEach( (point: Point) => {
  //       if(point.getColourMagnitued(pixelData.data) / 3 < globalThreshold) {
  //         point.plot(pixelData.data, "#000000");
  //       }
  //     });
  //     putImageData(pixelData);
  // }

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
  {origin && <img ref={orgImageRef} src={origin} alt="Captured Image" id="image" hidden />}
  </>;
};

export default Decector;
