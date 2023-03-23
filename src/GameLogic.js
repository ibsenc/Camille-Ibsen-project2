import words from "./words.json";

const wordCount = 50;

function randomNumber(n) {
  /* Generates a random number between 0 and n.*/

  return Number(Date.now() % n);
}

export function generateRandomWord(wordLength) {
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

export function processButtonClick(
  targetWord,
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
) {
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
