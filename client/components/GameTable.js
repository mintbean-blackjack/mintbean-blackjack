import React, { useState } from 'react';
import Game from '../classes/Game';
import Dealer from '../classes/Dealer';
import Player from '../classes/Player';
import ComputerPlayer from '../classes/ComputerPlayer';

export default function GameTable() {
  let game;
  let dealer;
  const [player, setPlayer] = useState({});
  const [computerPlayer, setComputerPlayer] = useState({});
}