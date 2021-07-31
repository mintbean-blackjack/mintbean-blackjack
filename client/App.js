import React from 'react'
import Navbar from './components/Navbar'
import { GameTable } from './components/GameTable'
import Routes from './Routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <GameTable />
      <Routes />
    </div>
  )
}

export default App
