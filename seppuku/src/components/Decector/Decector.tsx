import React, { FC, useEffect, useState } from 'react';
import styles from './Decector.module.css';

interface DecectorProps {canvas: any}

const Decector: FC<DecectorProps> = ({canvas}) => {
  const ctx = canvas.getContext('2d');
  const getLines = () => {
    const pixelData = ctx.getImageData(0, 0, 640, 480);
    const colour = 'green';
    let threshold = 40;

    for (let y = 0; y < pixelData.height; y++) {
      for (let x = 0; x < pixelData.width; x++) {
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
          const left = pixelData.data[index - 4];

          //Compare it all.
          if (pixel > left + threshold) {
              plotPoint(x, y, 'red', 1);
          }
          else if (pixel < left - threshold) {
              plotPoint(x, y, 'red', 1);
          }
          else if (pixel > bottom + threshold) {
              plotPoint(x, y, colour, 1);
          }
          else if (pixel < bottom - threshold) {
              plotPoint(x, y, colour, 1);
          }
      }
    }
  }

  const threshold = () => {
    const pixelData = ctx.getImageData(0, 0, 640, 480);
    const threshold = 380;
    for (let y = 0; y < pixelData.height; y++) {
      for (let x = 0; x < pixelData.width; x++) {
          const index = (x + y * 640) * 4;
          const whiteLevel = pixelData.data[index] + pixelData.data[index + 1] + pixelData.data[index + 2];
          if(whiteLevel < threshold)  plotPoint(x, y, "black");
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

  const detect = () => {
    threshold();
    setTimeout(() => {getLines()}, 10);
  }

  setTimeout(() => {detect()}, 10);
  return <></>;
};

export default Decector;
