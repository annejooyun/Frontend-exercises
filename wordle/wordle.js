const gameState = {
  inputedGuess: "",
  numGuesses: 0,
  lastKeyEnter: false,
  hardModeEnabled: false,
  hardModeLettersGuessed: ""
}

const maxLengthGuess = 5;
const maxNumGuesses = 6;

const RESULT = {
  WRONG: 0,
  WRONG_POSITION: 1,
  CORRECT: 2
};

const wordOfTheDayPromise = getWordOfTheDay();


async function getWordOfTheDay() {
  try {
    const promise = await fetch("https://words.dev-apis.com/word-of-the-day");
    const { word: wordRes } = await promise.json();
    //console.log(wordRes);
    return wordRes;
  } catch (error) {
    alert("Error loarding game. Please refresh.")
    throw(error);
  }
}


async function checkGuess() {
  const wordOfTheDayString = await wordOfTheDayPromise;
  return wordOfTheDayString === gameState.inputedGuess;
}


async function checkIsWord() {
  const promise = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({ word: gameState.inputedGuess}),
  });
  const processedResponse = await promise.json();
  return processedResponse.validWord;
}


function handleLetter(letter) {
  if (gameState.inputedGuess.length < maxLengthGuess && gameState.numGuesses < maxNumGuesses) {
      gameState.inputedGuess += letter.toLowerCase();
      showLetter(letter);
  }
}

function handleBackspace() {
  if (gameState.inputedGuess === "") {
      // Do nothing
    } else {
      removeLastLetter();
      gameState.inputedGuess = gameState.inputedGuess.slice(0, -1);
    }
}

async function handleEnter() {
    // If guess is not long enough
  if (gameState.inputedGuess.length < maxLengthGuess) {
    alert("The guess is not long enough. Insert a 5-letter word!");
  } else {
    // Check if guess is correct
    if (await checkGuess()) {
      processCorrectGuess();

    } else {
      // Check if guess is a valid word
      if (await checkIsWord()) {
        validateAndProcessWrongGuess();

      // Alert if guess is not a valid word
      } else {
        alert("That is not a valid word!");
      }
    }
  }
}

async function handleEnterHardMode() {
    // If guess is not long enough
  if (gameState.inputedGuess.length < maxLengthGuess) {
    alert("The guess is not long enough. Insert a 5-letter word!");
  } else {
    // Check if guess is correct
    if (await checkGuess()) {
      processCorrectGuess();
    } else {
      // Check hardmode logic
      missingLetters = checkForMissingLetters();
    
      if (missingLetters.length !== 0) {
        alert(`Guess must include: ${missingLetters.join(', ').toUpperCase()}`);

      } else {
        // Reset HardModeLettersGuessed
        gameState.hardModeLettersGuessed  = "";

        // Check if guess is a valid word
        if (await checkIsWord()) {
          validateAndProcessWrongGuess();

        // Alert if guess is not a valid word
        } else {
          alert("That is not a valid word!");
        }
      }
      
    }
  }
}


async function processCorrectGuess() {
  changeButtonColors([RESULT.CORRECT, RESULT.CORRECT, RESULT.CORRECT, RESULT.CORRECT, RESULT.CORRECT]);
  changeGuessColors([RESULT.CORRECT, RESULT.CORRECT, RESULT.CORRECT, RESULT.CORRECT, RESULT.CORRECT]);
  await new Promise(resolve => setTimeout(resolve, 100));
  alert("Congrats, you guessed it!!");
}


async function validateAndProcessWrongGuess() {
  const resultArray = await handleIncorrectGuess();
  changeButtonColors(resultArray);
  changeGuessColors(resultArray);
  gameState.numGuesses+= 1;
  gameState.inputedGuess= "";
  
  if (gameState.numGuesses=== maxNumGuesses) {
    const word = await wordOfTheDayPromise;
    alert("Out of guesses. The word was " + word.toUpperCase());
  }
}


function checkForMissingLetters() {
  const missingLetters = gameState.hardModeLettersGuessed
    .split('')
    .filter((letter, index, self) => self.indexOf(letter) === index) // unique
    .filter(letter => !gameState.inputedGuess.includes(letter));
  
    return (missingLetters);
}


async function handleKeyUp(event) {
  const key = event.key;

  // If key is a letter
  if (isLetter(key)) {
    gameState.lastKeyEnter = false;
    handleLetter(key);

    // If key is Backspace
  } else if (key === "Backspace") {
    gameState.lastKeyEnter = false;
    handleBackspace();

    // If key is Enter
  } else if (key === "Enter" && !gameState.lastKeyEnter) {
    gameState.lastKeyEnter = true;
    if(gameState.hardModeEnabled) {
      handleEnterHardMode();
    } else {
      handleEnter();
    }
  }
}


async function handleButtonClick(event) {
  const buttonValue = event.target.innerHTML;
 
  if (event.target.tagName !== "BUTTON") {
    // Do nothing
    return;
  }

  // If button pressed was a letter
  if (isLetter(buttonValue)) {

    gameState.lastKeyEnter = false;
    handleLetter(buttonValue);

  // If Backspace was pressed
  } else if (buttonValue === "Back") {

    gameState.lastKeyEnter = false;
    handleBackspace();

  // If Enter was pressed 
  } else if (buttonValue === "Enter") {
    
    gameState.lastKeyEnter = true;
    if (gameState.hardModeEnabled) {
      handleEnterHardMode();
    } else {
      handleEnter();
    }
  }
}


function showLetter(letter) {
  const row = String(gameState.numGuesses + 1);
  const col = String(gameState.inputedGuess.length);

  const className = ".box_" + row + "-" + col;
  document.querySelector(className).innerText = letter.toUpperCase();
}


function removeLastLetter() {
  const row = String(gameState.numGuesses + 1);
  const col = String(gameState.inputedGuess.length);

  const className = ".box_" + row + "-" + col;
  document.querySelector(className).innerText = "";
}


function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}


function changeGuessColors(resultArray) {
  for (let i = 1; i <= maxLengthGuess; i++) {
    const row = gameState.numGuesses + 1;
    const className = ".box_" + row + "-" + i;
    switch (resultArray[i - 1]) {
      case RESULT.WRONG: // Wrong letter
        document.querySelector(className).style.backgroundColor = "gray";
        document.querySelector(className).style.color = "white";
        break;
      case RESULT.WRONG_POSITION: // Correct letter in wrong spot
        document.querySelector(className).style.backgroundColor = "goldenrod";
        document.querySelector(className).style.color = "white";
        break;
      case RESULT.CORRECT: // Correct letter in correct spot
        document.querySelector(className).style.backgroundColor = "darkgreen";
        document.querySelector(className).style.color = "white";
        break;
    }
  }
}


function changeButtonColors(resultArray) {
  for (let i = 0; i < maxLengthGuess; i++) {
    const letter = gameState.inputedGuess[i].toUpperCase();


    // Find the button with matching text content
    const buttons = document.querySelectorAll(".keyboard button");
    const button = Array.from(buttons).find(btn => btn.innerHTML === letter);
    
    if (button) {
      switch (resultArray[i]) {
        case 0: // Wrong letter
          button.style.backgroundColor = "gray";
          button.style.color = "white";
          break;
        case 1: // Correct letter in wrong spot
          button.style.backgroundColor = "goldenrod";
          button.style.color = "white";
          break;
        case 2: // Correct letter in correct spot
          button.style.backgroundColor = "darkgreen";
          button.style.color = "white";
          break;
      }
    }
  }
}


async function handleIncorrectGuess() {
  // Find number of correct letters in correct spaces
  // Find number of correct letters in incorrect spaces
  // Handle duplicates: guess: HOPPY and answer: PANTS should only give one yellow letter
  const wordOfTheDayString = await wordOfTheDayPromise;
  let wordOfTheDayArray = wordOfTheDayString.split("");

  let guessArray = [RESULT.WRONG, RESULT.WRONG, RESULT.WRONG, RESULT.WRONG, RESULT.WRONG];

  // Check for correct letters in correct spots
  // This is done first, in case of correct letters in incorrect spots early in the guess
  // F. ex: Guess: POPPY word: HOPPY
  for (let i = 0; i < maxLengthGuess; i++) {
    let letter = gameState.inputedGuess.charAt(i);

    if (wordOfTheDayArray.includes(letter)) {
      if (wordOfTheDayArray[i] === letter) {
        guessArray[i] = RESULT.CORRECT;
        wordOfTheDayArray[i] = "0";
        // Save correct letters if HardModeEnabled
        if (gameState.hardModeEnabled) {
          gameState.hardModeLettersGuessed += letter;
        }
      }
    }
  }

  // Now check the rest of the letters
  for (let j = 0; j < maxLengthGuess; j++) {
    let letter = gameState.inputedGuess.charAt(j);

    // Check for correct letters in incorrect spots
    if (wordOfTheDayArray.includes(letter)) {
      guessArray[j] = RESULT.WRONG_POSITION;
      // Find index for the letter in guess
      const k = wordOfTheDayArray.indexOf(letter);
      wordOfTheDayArray[k] = "0";

      if(gameState.hardModeEnabled) {
        gameState.hardModeLettersGuessed += letter;
      }

      // Check for incorrect letters but do not overwrite the correct ones
    } else if (wordOfTheDayArray[j] !== "0") {
      guessArray[j] = 0;
    }
  }
  return guessArray;
}


function toggleHardMode() {
  if (gameState.numGuesses=== 0) {
    gameState.hardModeEnabled = !gameState.hardModeEnabled;
    const button = document.querySelector("#hard-mode-button");
    
    if (gameState.hardModeEnabled) {
      button.textContent = "Hard mode: ON ";
      button.classList.add("on");
    } else {
      button.textContent = "Hard mode: OFF";
      button.classList.remove("on");
    }
  } else {
    alert("Hard mode cannot be enabled after initial guess. Refresh the page and enable then.");
  }
}


// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("keyup", handleKeyUp);
  document.querySelector(".keyboard").addEventListener("click", handleButtonClick);
  document.querySelector("#hard-mode-button").addEventListener("click", toggleHardMode);
});