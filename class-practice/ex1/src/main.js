import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import Score from './score';
import Board from './board';
import Person from "../../../09-class-syntax/before/src/person";

const GameManager = ({ size }) => {
    /**
     * Entities:
     * GameManager
     * ControlPanel
     *     -Reset button
     *     -1P/2P button
     * Player, X or O
     * Board(3x3)
     *  Cell
     *
     * Logic:
     * Create players with X and O
     * - main loop
     *      -Turn, which player(X,O) plays now
     *      -To take next move coordinates
     *        - check valid move
     *          - ("in board" and) not occupied
 *          -Each turn need to check for winner
     *
     *
     *
     */
    const [board, setBoard] = useState([ new Board(3)])

  return (
    <div>


    </div>
  )
};

GameManager.defaultProps = {
    size : 3
}


// main.js
const root = document.querySelector('main');
ReactDOM.render(<GameManager size={3}  />, root);
