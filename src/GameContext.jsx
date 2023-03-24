import React, { useState, createContext } from "react";
import GameRoute from "./routes/GameRoute.jsx";

export const GameData = createContext();
export function GameContext(props) {
  const { wordLength, tries } = props;
  const [gameState, setGameState] = useState();
  const [currentCoordinate, setCurrentCoordinate] = useState([0, 0]);
  const [targetWord, setTargetWord] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const gameData = {
    wordLength,
    tries,
    gameState,
    setGameState,
    currentCoordinate,
    setCurrentCoordinate,
    targetWord,
    setTargetWord,
    message,
    setMessage,
    isError,
    setIsError,
    gameOver,
    setGameOver,
  };

  return (
    <GameData.Provider value={gameData}>
      <GameRoute />
    </GameData.Provider>
  );
}
