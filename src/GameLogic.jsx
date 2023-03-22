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

const processButtonClick = (
  targetWord,
  buttonText,
  wordLength,
  gameState,
  setGameState,
  currentCoordinate,
  setCurrentCoordinate
) => {
  switch (buttonText) {
    case "Enter":
      if (currentCoordinate[1] === wordLength - 1) {
        const newCoordinate = [currentCoordinate[0] + 1, 0];
        setCurrentCoordinate(newCoordinate);

        analyzeWord(
          targetWord,
          wordLength,
          currentCoordinate,
          gameState,
          setGameState
        );
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

export default processButtonClick;
