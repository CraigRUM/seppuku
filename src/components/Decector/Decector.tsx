import React, { createRef, FC, useEffect, useState } from 'react';
import styles from './Decector.module.css';
import Point from '../../model/Point';
import cannyEdgeDetector from '../../model/CannyEdgeDetector';
import HoughTransform from '../../model/HoughTransform';
import Image from 'image-js';
import Intersection from '../../model/Intersection';
import Square from '../../model/Square';
import GameBoard from '../../model/GameBoard';

interface DecectorProps {
  canvas: any,
  imageWidth: number,
  imageHeight: number,
  reset: Function
}

const Decector: FC<DecectorProps> = ({canvas, imageWidth, imageHeight, reset}) => {
  const ctx = canvas.getContext('2d');
  const [threshholdDone, setThreshholdDone] = useState<any>(false);
  const [edges, setEdges] = useState<any>(null);
  const [origin, setOrigin] = useState<any>(null);
  const [points, setPoints] = useState<any>(null);

  const maxGap = 20;
  const lineThreshold = 20;
  const globalThreshold = 100;
  const xColour = "red";
  const yColour = "green";
  const imageRef = createRef() as any;
  const orgImageRef = createRef() as any;
  const intersectionPoints: Intersection[] = [];
  const squares: Square[] = [];
  const gameBoard = new GameBoard();
  const boxSize = imageHeight * 0.5;
  const xMod = (imageWidth - boxSize) / 2;
  const yMod = (imageHeight - boxSize) / 2;

  const minLineLength = 120;

  useEffect(() => {
    setTimeout(()=>{
      if(!points){
        const freshPoints = new Array<Point>();
        for (let y = 0; y < imageHeight; y++) {
          for (let x = 0; x < imageWidth; x++) {
            freshPoints.push(new Point(x, y, imageWidth));
          }
        }
        setPoints(freshPoints);
      }
    }, 1);
  }, [threshholdDone]);

  useEffect(() => {
    setTimeout(()=>{
      Image.load(canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")).then((img: Image) => {
        setOrigin(img.toDataURL());
        const grey = img.grey();
        setEdges(cannyEdgeDetector(grey));
      });
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
    }, 2000);
  }

  const doHueTransform = () => {
    const maxTilt = (boxSize*0.05);
    const houghTransform = new HoughTransform(canvas, (boxSize*0.08), (boxSize*0.7), maxTilt);
    const pixelData:ImageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.drawImage(orgImageRef.current, 0, 0);
    upContrast(95);
    threshold();
    points.forEach( (point: Point) => {
      if(inBox(point) && point.getColourMagnitued(pixelData.data) > 10){
        houghTransform.houghAcc(point.x,point.y);
      }
    });

    const lines = houghTransform.findMaxInHough();
    const hlines = lines.filter(l =>  l.y1 + maxTilt > l.y2 && l.y1 - maxTilt < l.y2);
    const vlines = lines.filter(l =>  l.x1 + maxTilt > l.x2 && l.x1 - maxTilt < l.x2);
    if(vlines.length != 10 || hlines.length != 10) return reset(null);
    hlines.forEach((hl) => {
      vlines.forEach((vl) => {
          intersects(vl.x1 + (imageWidth / 2), hl.y1 + (imageHeight / 2));
      });
    });
    console.log(intersectionPoints);
    findSquares();
    waitForSquares();
  }

  const findSquares = () => {
    intersectionPoints.reverse().forEach(
        (p, i) => {
            if (i + 11 < intersectionPoints.length && (i - 9) % 10 != 0) {
                const sq = new Square(i, ctx, canvas, p, intersectionPoints[i + 11]);
                squares.push(sq);
            }
        });
    squares.forEach((s, i) => {
        setTimeout(function () {
            s.getLetter();
        }, i * 10);
    });
}

  const intersects = (x:number, y:number) => {
    intersectionPoints.push(new Intersection(x, y));
  }

  const putImageData = (imageData: ImageData) => {
    ctx.putImageData(imageData, 0, 0);
  };

  const threshold = () => {
      const pixelData: ImageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
      points.forEach( (point: Point) => {
        if(point.getColourMagnitued(pixelData.data) / 3 < globalThreshold) {
          point.plot(pixelData.data, "#000000");
        }else{
          point.plot(pixelData.data, "#FFFFFF");
        }
      });
      putImageData(pixelData);
  }

  const boxImage = () => {
    const pixelData: ImageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    points.forEach( (point: Point) => {
      if(!(inBox(point))){
        point.plot(pixelData.data, "#000000");
      }
    });
    putImageData(pixelData);
  }

  const inBox = (point: Point) => {
    return point.x > xMod && point.x < (imageWidth - xMod) && point.y > yMod && point.y < (imageHeight - yMod);
  }

  const upContrast = (contrast: any) => {
    const pixelData: ImageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    contrast = (contrast/100) + 1;  //convert to decimal & shift range: [0..2]
    var intercept = 128 * (1 - contrast);
    for(var i=0;i<pixelData.data.length;i+=4){   //r,g,b,a
      pixelData.data[i] = pixelData.data[i]*contrast + intercept;
      pixelData.data[i+1] = pixelData.data[i+1]*contrast + intercept;
      pixelData.data[i+2] = pixelData.data[i+2]*contrast + intercept;
    }
    putImageData(pixelData);
  }

  const squaresInitilized = () => {
    return squares.filter(s => !s.intialised).length == 0;
  }

const waitForSquares = function(){
    console.log(`Waiting for sqaures to be done!`);
    setTimeout(squaresInitilized() ? solveGame : waitForSquares, 1000);
}

const solvecb = function(){
    gameBoard.solve();
    console.log(`HMMMMMM`);
    setTimeout(gameBoard.solved() ? () => {solved()} : solvecb, 10);
}

const solved = function(){
    console.log('we did it')
    gameBoard.cells.forEach((c: Square) => {
        gameBoard.fillCell(c, c.number);
    });
}

const solveGame = function(){
    gameBoard.populateBoard(squares)
    solvecb();
}

  if(!threshholdDone){
    setThreshholdDone(true);
  }
  return <> 
  {edges && <img onLoad={copyToCanvas} ref={imageRef} src={edges.toDataURL()} alt="Captured Image" id="image" hidden />}
  {origin && <img ref={orgImageRef} src={origin} alt="Captured Image" id="orgin" hidden />}
  </>;
};

export default Decector;
