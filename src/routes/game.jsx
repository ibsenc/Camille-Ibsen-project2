import Title from "../components/Title";
import Board from "../components/Board";
import KeyBoard from "../components/Keyboard";
import { useState, useEffect } from "react";
import { processButtonClick, generateRandomWord } from "../GameLogic";

import "./game.css";

export default function Game(props) {
  const { wordLength, tries } = props;
  const [gameState, setGameState] = useState();
  const [currentCoordinate, setCurrentCoordinate] = useState([0, 0]);
  const [targetWord, setTargetWord] = useState("");

  useEffect(() => {
    if (targetWord === "") {
      setTargetWord(generateRandomWord(wordLength));
    }
  }, []);

  console.log("target word: " + targetWord);

  useEffect(() => {}, [gameState, currentCoordinate]);
  useEffect(() => {
    const initialBoard = [];
    for (let i = 0; i < tries; i++) {
      const tryRow = [];
      for (let j = 0; j < wordLength; j++) {
        tryRow.push({ text: "", color: null });
      }
      initialBoard.push(tryRow);
    }
    setGameState(initialBoard);
  }, []);

  const onButtonClick = (buttonText) => {
    processButtonClick(
      targetWord,
      buttonText,
      wordLength,
      gameState,
      setGameState,
      currentCoordinate,
      setCurrentCoordinate
    );
  };

  // console.log(gameState);

  return (
    <div>
      <Title headerHeight='100px' textSize='40px' />
      {gameState && (
        <Board
          wordLength={wordLength}
          tries={tries}
          gameState={gameState}
          currentCoordinate={currentCoordinate}
        />
      )}
      <KeyBoard onButtonClick={onButtonClick} />
    </div>
  );
}
