import "./Board.css";
import Tile from "../components/Tile";
import { GameData } from "../GameContext";
import { useContext } from "react";

export default function Board() {
  const gameDataObj = useContext(GameData);
  const tries = gameDataObj.tries;
  const wordLength = gameDataObj.wordLength;
  const gameState = gameDataObj.gameState;
  const currentCoordinate = gameDataObj.currentCoordinate;

  const tiles = [];
  for (let row = 0; row < tries; row++) {
    for (let column = 0; column < wordLength; column++) {
      const isCurrentCoordinate =
        currentCoordinate[0] === row && currentCoordinate[1] === column;

      tiles.push(
        <Tile
          data={gameState[row][column]}
          isCurrent={isCurrentCoordinate}
          key={`tile-${row}-${column}`}
        />
      );
    }
  }

  const boardSize = wordLength * 75;

  return (
    <div className='board-container'>
      <div
        className='board'
        style={{ minWidth: boardSize, maxWidth: boardSize }}
      >
        {tiles}
      </div>
    </div>
  );
}
