import React, { FC, useEffect, useState } from 'react';
import styles from './Decector.module.css';

interface DecectorProps {canvas: any}

const Decector: FC<DecectorProps> = ({canvas}) => {
  const ctx = canvas.getContext('2d');
  const [threshholdDone, setThreshholdDone] = useState<any>(false);

  const maxGap = 20;
  const lineThreshold = 20;
  const globalThreshold = 210;
  const xColour = "red";
  const yColour = "green";

  const minLineLength = 210;

  useEffect(() => {
    threshold();
    // getYLines(pixelData);
    getXLines();
  }, [threshholdDone]);

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
    const pixelData = ctx.getImageData(0, 0, 640, 480);
    const lines = [];
    for (let y = 0; y < pixelData.height; y++) {
      let length = 0;
      let gap = 0;
      for (let x = 0; x < pixelData.width; x++) {
          // get this pixel's data blue channel and nabours values
          const index = (x + y * 640) * 4;
          const pixel = pixelData.data[index];
          const bottom = pixelData.data[index + (640 * 4)];

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
      renderLine(l, 'y' , i);
    });
  }

  const renderLine = (line: any, dir: string, i: number) => {
    const boxLines = [3, 6];
    const colour = boxLines.includes(i) ? 'purple' : dir == 'y' ? 'cyan' : 'teal';
    const r = boxLines.includes(i) ? 3 : 3;
    console.log(line);
    var x, y;
    switch (dir) {
        case 'y':
            for (x = line.sx; x < line.ex; x++) {
                plotPoint(x, line.y, colour, r);
            }
            break;
        case 'x':
            for (y = line.sy; y < line.ey; y++) {
                plotPoint(line.x, y, colour, r);
            }
            break;
    }
}

  const threshold = () => {
      const pixelData = ctx.getImageData(0, 0, 640, 480);
      for (let y = 0; y < pixelData.height; y++) {
        for (let x = 0; x < pixelData.width; x++) {
            const index = (x + y * 640) * 4;
            const whiteLevel = pixelData.data[index];
            if(whiteLevel < globalThreshold) {plotPoint(x, y, "black", 1);}else{
              plotPoint(x, y, "white", 1);
            }
        }
      }
  }

  const plotPoint = (x:any, y:any, colour = 'green', r = 0.5) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.beginPath();
  }

  if(!threshholdDone){
    setThreshholdDone(true);
  }
  return <></>;
};

export default Decector;
