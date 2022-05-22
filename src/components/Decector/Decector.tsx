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
  const [edges, setEdges] = useState<any>(null);
  const [origin, setOrigin] = useState<any>(null);
  const [points, setPoints] = useState<any>(null);

  const imageRef = createRef() as any;
  const orgImageRef = createRef() as any;
  var intersectionPoints: Intersection[] = [];
  const squares: Square[] = [];
  const gameBoard = new GameBoard();
  const boxSize = imageHeight * 0.5;
  const xMod = (imageWidth - boxSize) / 2;
  const yMod = (imageHeight - boxSize) / 2;


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
  }, []);

  useEffect(() => {
    setTimeout(()=>{
      Image.load(canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")).then((img: Image) => {
        setOrigin(img.toDataURL());
        const grey = img.grey();
        setEdges(cannyEdgeDetector(grey));
      });
    }, 1);
  }, [points]);

  const copyToCanvas = () =>{
    ctx.drawImage(imageRef.current, 0, 0);
    setTimeout(() =>{
      doHueTransform();
    }, 2000);
  }

  const doHueTransform = () => {
    const maxTilt = (boxSize*0.3);
    const houghTransform = new HoughTransform(canvas, (boxSize*0.08), (boxSize*0.7), maxTilt);
    const pixelData:ImageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.drawImage(orgImageRef.current, 0, 0);
    //upContrast(50);
    points.forEach( (point: Point) => {
      if(point.inBox(imageWidth, imageHeight, xMod, yMod) && point.getColourMagnitued(pixelData.data) > 10){
        houghTransform.houghAcc(point.x,point.y);
      }
    });

    const lines = houghTransform.findMaxInHough();
    const hlines = lines.filter(l =>  l.a.y + maxTilt > l.b.y && l.a.y - maxTilt < l.b.y);
    const vlines = lines.filter(l =>  l.a.x + maxTilt > l.b.x && l.a.x - maxTilt < l.b.x);
    if(vlines.length != 10 || hlines.length != 10) return reset(null);
    var i = 0;
    hlines.forEach((hl) => {
      vlines.forEach((vl) => {
          i++; console.log(i);
          const intersection: Point = vl.intersects(hl);
          if(intersection){
            intersection.x = intersection.x + xMod * 1.6;
            intersection.y = intersection.y + yMod * 2;
            intersectionPoints.push(intersection);
          }
      });
    });
    findSquares();
    waitForSquares();
  }

  const findSquares = () => {
    const sortedIntersectionPoints: Intersection[] = [];
    // Sorter intersections top left to bottom right
    intersectionPoints = intersectionPoints.sort((a : Intersection, b: Intersection) => {return a.y - b.y;});
    while(intersectionPoints.length > 0){ 
      const sortedSlice = intersectionPoints.splice(0, 10).sort((a : Intersection, b: Intersection) => {return a.x - b.x;})
      sortedIntersectionPoints.push.apply(
        sortedIntersectionPoints, sortedSlice
      );
    }

    sortedIntersectionPoints.forEach(
        (p, i) => {
            if (i + 11 < sortedIntersectionPoints.length && (i - 9) % 10 != 0) {
                const sq = new Square(i, ctx, canvas, p, sortedIntersectionPoints[i + 11]);
                squares.push(sq);
            }
        });

    squares.forEach((s, i) => { setTimeout(function () {s.getLetter();}, i * 10);} );
  }

  const putImageData = (imageData: ImageData) => {
    ctx.putImageData(imageData, 0, 0);
  };

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

  const solveLoop = function(){
      gameBoard.solve();
      console.log(`HMMMMMM`);
      setTimeout(gameBoard.solved() ? () => {solved()} : solveLoop, 10);
  }

  const solved = function(){
      console.log('we did it')
      gameBoard.cells.forEach((c: Square) => {
          gameBoard.fillCell(c, c.number);
      });
  }

const solveGame = function(){
    gameBoard.populateBoard(squares)
    solveLoop();
}

  return <> 
    {edges && <img onLoad={copyToCanvas} ref={imageRef} src={edges.toDataURL()} alt="edges" id="image" hidden />}
    {origin && <img ref={orgImageRef} src={origin} alt="orgImageRef" id="orgin" hidden />}
  </>;
};

export default Decector;
