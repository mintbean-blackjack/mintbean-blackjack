import React from 'react';
import { GamePage } from './components/GamePage';
import LandingPageNavbar from './components/LandingPageNavbar';
import Routes from './Routes';

const App = () => {
  return (
    <div>
      <GamePage />
      {/* <LandingPageNavbar /> */}
      <Routes />
    </div>
  );
};

export default App;
