import Title from "../components/Title";
import Board from "../components/Board";
import KeyBoard from "../components/Keyboard";
import Message from "../components/Message";
import { useState, useEffect } from "react";
import { processButtonClick, generateRandomWord } from "../GameLogic";

import "./game.css";
import "../components/PlayButton.css";
import PlayButton from "../components/PlayButton";

export default function Game(props) {
  const { wordLength, tries } = props;
  const [gameState, setGameState] = useState();
  const [currentCoordinate, setCurrentCoordinate] = useState([0, 0]);
  const [targetWord, setTargetWord] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (targetWord === "") {
      setTargetWord(generateRandomWord(wordLength));
    }
  }, [gameState]);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const initialBoard = [];
    for (let i = 0; i < tries; i++) {
      const tryRow = [];
      for (let j = 0; j < wordLength; j++) {
        tryRow.push({ text: "", color: null });
      }
      initialBoard.push(tryRow);
    }
    setGameState(initialBoard);
  };

  const onButtonClick = (buttonText) => {
    processButtonClick(
      targetWord.toUpperCase(),
      buttonText,
      tries,
      wordLength,
      gameState,
      setGameState,
      currentCoordinate,
      setCurrentCoordinate,
      message,
      setMessage,
      isError,
      setIsError,
      gameOver,
      setGameOver
    );
  };

  const resetGame = () => {
    setGameOver(false);
    setCurrentCoordinate([0, 0]);
    setTargetWord("");
    setMessage("");
    setIsError(false);

    initializeBoard();
  };

  return (
    <div>
      <Title
        headerHeight='100px'
        textSize='40px'
        hasBackButton={true}
        titleText={"Wordle"}
      />
      {gameState && (
        <Board
          wordLength={wordLength}
          tries={tries}
          gameState={gameState}
          currentCoordinate={currentCoordinate}
        />
      )}
      <Message error={isError} text={message} />
      {!gameOver && <KeyBoard onButtonClick={onButtonClick} />}
      {gameOver && (
        <PlayButton
          func={resetGame}
          text={"Play Again"}
          isStartButton={false}
        />
      )}
    </div>
  );
}
