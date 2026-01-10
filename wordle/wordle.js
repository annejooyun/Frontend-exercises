let inputedGuess = "";
let numGuesses = 0;

const maxLengthGuess = 5;
const maxNumGuesses = 6;

const wordOfTheDayPromise = getWordOfTheDay();
window.addEventListener("keyup", handleKeyUp);

async function getWordOfTheDay() {
  const promise = await fetch("https://words.dev-apis.com/word-of-the-day");
  const { word: wordRes } = await promise.json();
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
  if (isLetter(key)) {
    if (inputedGuess.length < maxLengthGuess && numGuesses < maxNumGuesses) {
      inputedGuess += key.toLowerCase();
      showLetter(key);
    }
  } else if (key === "Backspace") {
    removeLastLetter();
    inputedGuess = inputedGuess.slice(0, -1);
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
      case 0:
        break;
      case 1:
        document.querySelector(className).style.backgroundColor = "orange";
        document.querySelector(className).style.color = "white";
        break;
      case 2:
        document.querySelector(className).style.backgroundColor = "green";
        document.querySelector(className).style.color = "white";
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

  let guessArray = [];

  for (let i = 0; i < maxLengthGuess; i++) {
    let letter = inputedGuess.charAt(i);
    if (wordOfTheDayArray.includes(letter)) {
      if (wordOfTheDayArray[i] === letter) {
        guessArray[i] = 2;
        wordOfTheDayArray[i] = "0";
      } else {
        guessArray[i] = 1;
        const letterIndex = wordOfTheDayString.indexOf(letter);
        wordOfTheDayArray[letterIndex] = "0";
      }
    } else {
      guessArray[i] = 0;
    }
  }
  return guessArray;
}
