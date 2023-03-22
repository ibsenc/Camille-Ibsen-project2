import "./board.css";
import Tile from "../components/Tile";
import { useEffect } from "react";

export default function Board({
  tries,
  wordLength,
  gameState,
  currentCoordinate,
}) {
  const tiles = [];
  for (let row = 0; row < tries; row++) {
    for (let column = 0; column < wordLength; column++) {
      const isCurrentCoordinate =
        currentCoordinate[0] === row && currentCoordinate[1] === column;
      if (isCurrentCoordinate) {
        console.log(`${currentCoordinate} --- ${[row, column]}`);
        console.log(isCurrentCoordinate);
      }

      tiles.push(
        <Tile data={gameState[row][column]} isCurrent={isCurrentCoordinate} />
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
