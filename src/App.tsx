import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Camera from './components/Camera/Camera';
import Decector from './components/Decector/Decector';
import cameraIcon from'./camera.svg';
import binIcon from'./bin.svg';

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

  //const { height, width } = useWindowDimensions();
  // const height = 768;
  // const width = 1366;
  // const portion = 0.6;
  const imageWidth = 800;
  const imageHeight = 600;


  const [canvas, setCanvas] = useState<any>(null);
  const cameraRef = React.createRef() as any;
  const cameraComponent = <Camera ctxReady={setCanvas} width={imageWidth} height={imageHeight}></Camera>;
  const detectorComponent = <Decector canvas={canvas} imageWidth={imageWidth} imageHeight={imageHeight} reset={setCanvas}/>;



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
