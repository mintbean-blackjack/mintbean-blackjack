import React from 'react'
import GamePageNavBar from "./components/GamePageNavBar";
import { GameTable } from './components/GameTable'
import LandingPageNavbar from './components/LandingPageNavbar';
import Routes from './Routes'

const App = () => {
  return (
    <div>
      <Routes />
      <GamePageNavBar />
      <GameTable />
    {/* <LandingPageNavbar /> */}
    </div>
  );
};

export default App;
