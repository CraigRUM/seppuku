import React from 'react';
import logo from './logo.svg';
import './App.css';
import Decector from './components/Decector/Decector';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Decector></Decector>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
