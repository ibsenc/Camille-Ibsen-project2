import Title from "../components/Title";
import Board from "../components/Board";
import KeyBoard from "../components/Keyboard";
import { useState, useEffect } from "react";

import "./game.css";

export default function Game(props) {
  const { wordLength, tries } = props;
  const [gameState, setGameState] = useState();
  const [currentCoordinate, setCurrentCoordinate] = useState([0, 0]);

  const targetWord = "BALLOT";

  const analyzeWord = () => {
    const gameStateCopy = { ...gameState };

    const letterFrequencies = new Map();
    for (let i = 0; i < wordLength; i++) {
      // Get frequences of target letters
      if (letterFrequencies[targetWord[i]]) {
        letterFrequencies[targetWord[i]] += 1;
      } else {
        letterFrequencies[targetWord[i]] = 1;
      }
    }

    for (let i = 0; i < wordLength; i++) {
      const guessedLetter = gameState[currentCoordinate[0]][i].text;

      if (guessedLetter === "" + targetWord[i]) {
        gameState[currentCoordinate[0]][i].color = "green";
        letterFrequencies[guessedLetter]--;
      } else {
        gameState[currentCoordinate[0]][i].color = "grey";
      }
    }

    // Find letters that exist in the wrong spot
    for (let i = 0; i < wordLength; i++) {
      const guessedLetter = gameState[currentCoordinate[0]][i].text;
      if (
        guessedLetter !== "" + targetWord[i] &&
        letterFrequencies[guessedLetter]
      ) {
        gameState[currentCoordinate[0]][i].color = "yellow";
        letterFrequencies[guessedLetter]--;
      }
    }

    setGameState(gameStateCopy);
  };

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
    switch (buttonText) {
      case "Enter":
        if (currentCoordinate[1] === wordLength - 1) {
          const newCoordinate = [currentCoordinate[0] + 1, 0];
          setCurrentCoordinate(newCoordinate);

          // TODO: Evaluate line
          analyzeWord();
        } else {
          // TODO: Enter error message for too short of a word
        }

        break;
      case "⌫":
        const gameStateCopy = { ...gameState };
        const newCoordinate = [...currentCoordinate];

        while (
          newCoordinate[1] > 0 &&
          gameStateCopy[newCoordinate[0]][newCoordinate[1]].text === ""
        ) {
          newCoordinate[1]--;
        }

        if (currentCoordinate[1] > 0) {
          gameStateCopy[newCoordinate[0]][newCoordinate[1]].text = "";
          newCoordinate[1]--;
        }

        setCurrentCoordinate(newCoordinate);
        setGameState(gameStateCopy);

        break;
      default:
        if (currentCoordinate[1] < wordLength) {
          const gameStateCopy = { ...gameState };
          gameStateCopy[currentCoordinate[0]][currentCoordinate[1]].text =
            buttonText;
          setGameState(gameStateCopy);

          const newCoordinate = [...currentCoordinate];

          if (newCoordinate[1] < wordLength - 1) {
            newCoordinate[1]++;
          }
          setCurrentCoordinate(newCoordinate);
        }
    }
  };

  console.log(gameState);

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
