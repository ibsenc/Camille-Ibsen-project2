const sixLetterWords = [
  "artist",
  "afford",
  "record",
  "normal",
  "patent",
  "modest",
  "market",
  "ticket",
  "accept",
  "change",
];

const sevenLetterWords = [
  "retired",
  "referee",
  "context",
  "hunting",
  "protect",
  "century",
  "glacier",
  "overall",
  "soldier",
  "abridge",
];

function random(n) {
  /* Generates a random number between 0 and n.*/

  return Number(Date.now() % n);
}

export function generateRandomWord(wordLength) {
  return wordLength === 6
    ? sixLetterWords[random(6)]
    : sevenLetterWords[random(7)];
}

const analyzeWord = (
  targetWord,
  wordLength,
  currentCoordinate,
  gameState,
  setGameState,
  message,
  setMessage,
  isError,
  setIsError,
  enableKeyboard,
  setEnableKeyboard
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

  // Check for a win
  const guessedWordArr = [];
  for (let i = 0; i < wordLength; i++) {
    guessedWordArr.push(gameState[currentCoordinate[0]][i].text);
  }
  const guessedWord = guessedWordArr.join("");
  if (guessedWord === targetWord) {
    setMessage(
      `Congratulations! You guessed the word "${targetWord}" correctly.
      \nWould you like to play again?`
    );
    setIsError(false);
    setEnableKeyboard(false);
    return;
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

export function processButtonClick(
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
) {
  setMessage("");
  setIsError(false);

  switch (buttonText) {
    case "Enter":
      if (
        currentCoordinate[1] === wordLength - 1 &&
        gameState[currentCoordinate[0]][currentCoordinate[1]].text !== ""
      ) {
        const newCoordinate = [currentCoordinate[0] + 1, 0];
        setCurrentCoordinate(newCoordinate);

        analyzeWord(
          targetWord.toUpperCase(),
          wordLength,
          currentCoordinate,
          gameState,
          setGameState,
          message,
          setMessage,
          isError,
          setIsError,
          enableKeyboard,
          setEnableKeyboard
        );
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
