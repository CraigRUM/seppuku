import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Camera from './components/Camera/Camera';
import Decector from './components/Decector/Decector';

function App() {
  const [canvas, setCanvas] = useState<any>('');

  const cameraComponent = <Camera ctxReady={setCanvas}></Camera>;
  const detectorComponent = <Decector canvas={canvas} />;


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
