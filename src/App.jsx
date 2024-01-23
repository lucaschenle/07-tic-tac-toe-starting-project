import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;

}


if (gameTurns.length === 0) {
    return 'X';
  }

const lastTurn = gameTurns[0];
const { player } = lastTurn;

return player === 'X' ? 'O' : 'X';

function App() {
  const [gameTurns, setGameTurns] = useState([]); 
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        
    gameBoard[row][col] = player;
  }
  
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol && firstSquareSymbol != null) {
      winner = firstSquareSymbol;
      break;
    }
  } 

  function handleSelectSquare({rowIndex, colIndex}) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(
      (prevGameTurns) => {
        let currentPlayer = 'X';
        if (prevGameTurns.length > 0 && prevGameTurns[0].player === 'X') {
          currentPlayer = 'O';
        }

        const updateTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevGameTurns,];
        
        return updateTurns;
      }
    );
  }

  function handleReset() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {winner && <GameOver winner={winner} onReset={handleReset} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
