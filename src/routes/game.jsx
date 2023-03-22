import Title from "../components/Title";
import Board from "../components/Board";
import KeyBoard from "../components/Keyboard";
import Message from "../components/Message";
import { useState, useEffect } from "react";
import { processButtonClick, generateRandomWord } from "../GameLogic";

import "./game.css";

export default function Game(props) {
  const { wordLength, tries } = props;
  const [gameState, setGameState] = useState();
  const [currentCoordinate, setCurrentCoordinate] = useState([0, 0]);
  const [targetWord, setTargetWord] = useState("");
  const [message, setMessage] = useState("");
  const [enableKeyboard, setEnableKeyboard] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (targetWord === "") {
      setTargetWord(generateRandomWord(wordLength));
    }

    // setMessage("blah");
    // setIsError(true);
  }, []);

  console.log("target word: " + targetWord);

  useEffect(() => {
    console.log(currentCoordinate);
  }, [gameState, currentCoordinate]);
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
      setCurrentCoordinate,
      message,
      setMessage,
      isError,
      setIsError,
      enableKeyboard,
      setEnableKeyboard
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
      <Message error={isError} text={message} />
      {enableKeyboard && <KeyBoard onButtonClick={onButtonClick} />}
    </div>
  );
}
