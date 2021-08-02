import React from 'react'
import Navbar from './components/Navbar'
import { GameTable } from './components/GameTable'
import LandingPageNavbar from './components/LandingPageNavbar';
import Routes from './Routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <GameTable />
    {/* <LandingPageNavbar /> */}
      <Routes />
    </div>
  );
};

export default App;
