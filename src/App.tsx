import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Camera from './components/Camera/Camera';
import Decector from './components/Decector/Decector';

function App() {
  const imageWidth = 1024;
  const imageHeight = 576;

  const [canvas, setCanvas] = useState<any>(null);

  const cameraComponent = <Camera ctxReady={setCanvas} imageWidth={imageWidth} imageHeight={imageHeight}/>;
  const detectorComponent = canvas ? <Decector canvas={canvas} imageWidth={canvas.scrollWidth} imageHeight={canvas.scrollHeight} reset={setCanvas}/> : '';

  return (
    <div className="App">
      <header className="App-header">
          {cameraComponent}
          {canvas && detectorComponent}
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;