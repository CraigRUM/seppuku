import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Camera from './components/Camera/Camera';
import Decector from './components/Decector/Decector';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function App() {
  const { height, width } = useWindowDimensions();
  const imageWidth = width * 0.8;
  const imageHeight = height * 0.8;

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