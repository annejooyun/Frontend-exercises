let inputedGuess = "";
let numGuesses = 0;

const maxLengthGuess = 5;
const maxNumGuesses = 6;

const wordOfTheDayPromise = getWordOfTheDay();
window.addEventListener("keyup", handleKeyUp);

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

async function handleKeyUp(event) {
  const key = event.key;

  // If key is a letter
  if (isLetter(key)) {
    if (inputedGuess.length < maxLengthGuess && numGuesses < maxNumGuesses) {
      inputedGuess += key.toLowerCase();
      showLetter(key);
    }

    // If key is Backspace
  } else if (key === "Backspace") {
    if (inputedGuess === "") {
      // Do nothing
    } else {
      removeLastLetter();
      inputedGuess = inputedGuess.slice(0, -1);
    }

    // If key is Enter
  } else if (key === "Enter") {
    if (inputedGuess.length < maxLengthGuess) {
      window.confirm("The guess is not long enough. Insert a 5-letter word!");
    } else {
      if (await checkGuess()) {
        changeGuessColors([2, 2, 2, 2, 2]);
        window.confirm("Congrats, you guessed it!!");
      } else {
        if (await checkIsWord()) {
          const resultArray = await handleIncorrectGuess();
          changeGuessColors(resultArray);
          numGuesses += 1;
          inputedGuess = "";
          if (numGuesses === maxNumGuesses) {
            console.log(await wordOfTheDayPromise);
          }
        }
      }
      // maybe code hardmode?
    }
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
      case 3: //Error
        console.log("ERROR!");
        break;
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
  // 2: Correct letter in correct spot, 3: Error case
  let guessArray = [3, 3, 3, 3, 3];

  // Check for correct letters in correct spots
  // This is done first, in case of correct letters in incorrect spots early in the guess
  // F. ex: Guess: POPPY word: HOPPY
  for (let i = 0; i < maxLengthGuess; i++) {
    let letter = inputedGuess.charAt(i);

    if (wordOfTheDayArray.includes(letter)) {
      if (wordOfTheDayArray[i] === letter) {
        guessArray[i] = 2;
        wordOfTheDayArray[i] = "0";
      }
    }
  }

  // Now check the rest of the letters
  for (let j = 0; j < maxLengthGuess; j++) {
    let letter = inputedGuess.charAt(j);

    // Check for correct letters in incorrect spots
    if (wordOfTheDayArray.includes(letter)) {
      console.log("yes, the word includes letter ", letter);
      guessArray[j] = 1;
      wordOfTheDayArray[j] = "0";

      // Check for incorrect letters but do not overwrite the correct ones
    } else if (wordOfTheDayArray[j] !== "0") {
      guessArray[j] = 0;

      // If all else fails
    } else {
      console.log("Error: could not place letter in a category");
    }
  }
  return guessArray;
}
