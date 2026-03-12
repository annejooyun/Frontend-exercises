let inputedGuess = "";
let numGuesses = 0;
let lastKeyEnter = false;
let hardModeEnabled = false;
let hardModeLettersGuessed = "";

const maxLengthGuess = 5;
const maxNumGuesses = 6;

const wordOfTheDayPromise = getWordOfTheDay();


async function getWordOfTheDay() {
  const promise = await fetch("https://words.dev-apis.com/word-of-the-day");
  const { word: wordRes } = await promise.json();
  //console.log(wordRes);
  return wordRes;
}


async function checkGuess() {
  const wordOfTheDayString = await wordOfTheDayPromise;
  return wordOfTheDayString === inputedGuess;
}


async function checkIsWord() {
  const promise = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({ word: inputedGuess }),
  });
  const processedResponse = await promise.json();
  return processedResponse.validWord;
}


function handleLetter(letter) {
  if (inputedGuess.length < maxLengthGuess && numGuesses < maxNumGuesses) {
      inputedGuess += letter.toLowerCase();
      showLetter(letter);
  }
}

function handleBackspace() {
  if (inputedGuess === "") {
      // Do nothing
    } else {
      removeLastLetter();
      inputedGuess = inputedGuess.slice(0, -1);
    }
}

async function handleEnter() {
    // If guess is not long enough
  if (inputedGuess.length < maxLengthGuess) {
    alert("The guess is not long enough. Insert a 5-letter word!");
  } else {
    // Check if guess is correct
    if (await checkGuess()) {
      changeButtonColors([2, 2, 2, 2, 2]);
      changeGuessColors([2, 2, 2, 2, 2]);
      await new Promise(resolve => setTimeout(resolve, 100));
      alert("Congrats, you guessed it!!");
    } else {
      // Check if guess is a valid word
      if (await checkIsWord()) {
        const resultArray = await handleIncorrectGuess();
        changeButtonColors(resultArray);
        changeGuessColors(resultArray);
        numGuesses += 1;
        inputedGuess = "";
        // Check if user is out of guesses
        if (numGuesses === maxNumGuesses) {
          word = await wordOfTheDayPromise;
          await new Promise(resolve => setTimeout(resolve, 100));
          alert("Out of guesses. The word was " +  word.toUpperCase())
        }
        // Alert if guess is not a valid word
      } else {
        alert("That is not a valid word!");
      }
    }
  }
}

async function handleEnterHardMode() {
    // If guess is not long enough
  if (inputedGuess.length < maxLengthGuess) {
    alert("The guess is not long enough. Insert a 5-letter word!");
  } else {
    // Check if guess is correct
    if (await checkGuess()) {
      changeButtonColors([2, 2, 2, 2, 2]);
      changeGuessColors([2, 2, 2, 2, 2]);
      await new Promise(resolve => setTimeout(resolve, 100));
      alert("Congrats, you guessed it!!");
    } else {
      // Check hardmode logic
      let copyHardModeLettersGuessed = hardModeLettersGuessed;

      for(i = 0; i < maxLengthGuess; i++){
        let letter = inputedGuess[i];

        if (hardModeLettersGuessed.includes(letter)) {
          copyHardModeLettersGuessed = copyHardModeLettersGuessed.replace(letter, "");
        }
      }
      console.log(hardModeLettersGuessed);
      if (copyHardModeLettersGuessed.length !== 0) {
        alert("Guess does not include found letters.")
      } else {
        // Reset HardModeLettersGuessed
        hardModeLettersGuessed  = "";
        // Check if guess is a valid word
        if (await checkIsWord()) {
          const resultArray = await handleIncorrectGuess();
          changeButtonColors(resultArray);
          changeGuessColors(resultArray);
          numGuesses += 1;
          inputedGuess = "";
          // Check if user is out of guesses
          if (numGuesses === maxNumGuesses) {
            word = await wordOfTheDayPromise;
            await new Promise(resolve => setTimeout(resolve, 100));
            alert("Out of guesses. The word was " +  word.toUpperCase())
          }
          // Alert if guess is not a valid word
        } else {
          alert("That is not a valid word!");
        }
      }
      
    }
  }
}


async function handleKeyUp(event) {
  const key = event.key;

  // If key is a letter
  if (isLetter(key)) {
    lastKeyEnter = false;
    handleLetter(key);

    // If key is Backspace
  } else if (key === "Backspace") {
    lastKeyEnter = false;
    handleBackspace();

    // If key is Enter
  } else if (key === "Enter" && !lastKeyEnter) {
    lastKeyEnter = true;
    if(hardModeEnabled) {
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

    lastKeyEnter = false;
    handleLetter(buttonValue);

  // If Backspace was pressed
  } else if (buttonValue === "Back") {

    lastKeyEnter = false;
    handleBackspace();

  // If Enter was pressed 
  } else if (buttonValue === "Enter") {
    
    lastKeyEnter = true;
    handleEnter();
    }
}


function showLetter(letter) {
  let row = String(numGuesses + 1);
  let col = String(inputedGuess.length);

  let className = ".box_" + row + "-" + col;
  document.querySelector(className).innerText = letter.toUpperCase();
}


function removeLastLetter() {
  let row = String(numGuesses + 1);
  let col = String(inputedGuess.length);

  let className = ".box_" + row + "-" + col;
  document.querySelector(className).innerText = "";
}


function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}


function changeGuessColors(resultArray) {
  for (let i = 1; i <= maxLengthGuess; i++) {
    row = numGuesses + 1;
    className = ".box_" + row + "-" + i;
    switch (resultArray[i - 1]) {
      case 0: // Wrong letter
        document.querySelector(className).style.backgroundColor = "gray";
        document.querySelector(className).style.color = "white";
        break;
      case 1: // Correct letter in wrong spot
        document.querySelector(className).style.backgroundColor = "goldenrod";
        document.querySelector(className).style.color = "white";
        break;
      case 2: // Correct letter in correct spot
        document.querySelector(className).style.backgroundColor = "darkgreen";
        document.querySelector(className).style.color = "white";
        break;
    }
  }
}


function changeButtonColors(resultArray) {
  for (let i = 0; i < maxLengthGuess; i++) {
    const letter = inputedGuess[i].toUpperCase();


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

  // 0: Incorrect letter, 1: Correct letter in incorrect spot
  // 2: Correct letter in correct spot
  let guessArray = [0, 0, 0, 0, 0];

  // Check for correct letters in correct spots
  // This is done first, in case of correct letters in incorrect spots early in the guess
  // F. ex: Guess: POPPY word: HOPPY
  for (let i = 0; i < maxLengthGuess; i++) {
    let letter = inputedGuess.charAt(i);

    if (wordOfTheDayArray.includes(letter)) {
      if (wordOfTheDayArray[i] === letter) {
        guessArray[i] = 2;
        wordOfTheDayArray[i] = "0";
        // Save correct letters if HardModeEnabled
        if (hardModeEnabled) {
          hardModeLettersGuessed += letter;
        }
      }
    }
  }

  // Now check the rest of the letters
  for (let j = 0; j < maxLengthGuess; j++) {
    let letter = inputedGuess.charAt(j);

    // Check for correct letters in incorrect spots
    if (wordOfTheDayArray.includes(letter)) {
      guessArray[j] = 1;
      // Find index for the letter in guess
      k = wordOfTheDayArray.indexOf(letter);
      wordOfTheDayArray[k] = "0";

      if(hardModeEnabled) {
        hardModeLettersGuessed += letter;
      }

      // Check for incorrect letters but do not overwrite the correct ones
    } else if (wordOfTheDayArray[j] !== "0") {
      guessArray[j] = 0;
    }
  }
  console.log(hardModeLettersGuessed);

  return guessArray;
}


function toggleHardMode() {
  if (numGuesses === 0) {
    hardModeEnabled = !hardModeEnabled;
    const button = document.querySelector("#hard-mode-button");
    
    if (hardModeEnabled) {
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