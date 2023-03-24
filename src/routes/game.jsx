import { useContext, useEffect } from "react";
import Board from "../components/Board";
import KeyBoard from "../components/Keyboard";
import Message from "../components/Message";
import Title from "../components/Title";
import words from "../words.json";

import PlayButton from "../components/PlayButton";
import "../components/PlayButton.css";
import { GameData } from "../GameContext";
import "./game.css";

export default function Game(props) {
  const gameDataObj = useContext(GameData);
  const currentCoordinate = gameDataObj.currentCoordinate;
  const gameOver = gameDataObj.gameOver;
  const gameState = gameDataObj.gameState;
  const isError = gameDataObj.isError;
  const message = gameDataObj.message;
  const setCurrentCoordinate = gameDataObj.setCurrentCoordinate;
  const setGameOver = gameDataObj.setGameOver;
  const setGameState = gameDataObj.setGameState;
  const setIsError = gameDataObj.setIsError;
  const setMessage = gameDataObj.setMessage;
  const setTargetWord = gameDataObj.setTargetWord;
  const targetWord = gameDataObj.targetWord;
  const tries = gameDataObj.tries;
  const wordLength = gameDataObj.wordLength;
  const wordCount = 50;

  function randomNumber(n) {
    /* Generates a random number between 0 and n.*/

    return Number(Date.now() % n);
  }

  function generateRandomWord(wordLength) {
    return wordLength === 6
      ? words.sixLetterWords[randomNumber(wordCount)]
      : words.sevenLetterWords[randomNumber(wordCount)];
  }

  const analyzeWord = (
    targetWord,
    wordLength,
    currentCoordinate,
    gameState,
    setGameState
  ) => {
    const gameStateCopy = { ...gameState };

    // Get frequencies of letters in target word
    const letterFrequencies = new Map();
    for (let i = 0; i < wordLength; i++) {
      if (letterFrequencies[targetWord[i]]) {
        letterFrequencies[targetWord[i]] += 1;
      } else {
        letterFrequencies[targetWord[i]] = 1;
      }
    }

    // Find letters in the correct spot and letters not in the word
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

  function hasWon(wordLength, gameState, currentCoordinate, targetWord) {
    const guessedWordArr = [];
    for (let i = 0; i < wordLength; i++) {
      guessedWordArr.push(gameState[currentCoordinate[0]][i].text);
    }

    const guessedWord = guessedWordArr.join("");
    if (guessedWord === targetWord) {
      return true;
    }

    return false;
  }

  function processButtonClick(buttonText) {
    setMessage("");
    setIsError(false);

    switch (buttonText) {
      case "Enter":
        // Reached end of line
        if (
          currentCoordinate[1] === wordLength - 1 &&
          gameState[currentCoordinate[0]][currentCoordinate[1]].text !== ""
        ) {
          analyzeWord(
            targetWord,
            wordLength,
            currentCoordinate,
            gameState,
            setGameState
          );

          // Check for loss
          if (
            currentCoordinate[0] === tries - 1 &&
            !hasWon(wordLength, gameState, currentCoordinate, targetWord)
          ) {
            setMessage(
              `Oh no! You did not guess the correct word. \nWould you like to play again?`
            );
            setIsError(false);
            setGameOver(true);
            return;
          }

          const newCoordinate = [currentCoordinate[0] + 1, 0];
          setCurrentCoordinate(newCoordinate);

          // Check for win
          if (hasWon(wordLength, gameState, currentCoordinate, targetWord)) {
            setMessage(
              `Congratulations! You guessed the word "${targetWord}" correctly.\nWould you like to play again?`
            );
            setIsError(false);
            setGameOver(true);
            return;
          }
        } else {
          setMessage(
            `The word you have entered is too short. It must to be ${wordLength} letters long.`
          );
          setIsError(true);
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

        gameStateCopy[newCoordinate[0]][newCoordinate[1]].text = "";

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
  }

  useEffect(() => {
    if (targetWord === "") {
      setTargetWord(generateRandomWord(wordLength).toUpperCase());
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
    processButtonClick(buttonText);
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
      {gameState && <Board />}
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
