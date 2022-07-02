import React, { ReactNode } from 'react';
import './Game.css';
import Board from './components/Board/Board';


class Game extends React.Component {
  render(): ReactNode {
    return (
      <Board/>
    );
  }
}

export default Game;
