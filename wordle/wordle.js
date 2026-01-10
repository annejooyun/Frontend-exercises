let inputedGuess = "";
let numGuesses = 0;

const maxLengthGuess = 5;
const maxNumGuesses = 6;

const wordOfTheDayPromise = getWordOfTheDay();

async function getWordOfTheDay() {
  const promise = await fetch("https://words.dev-apis.com/word-of-the-day");
  const { word: wordRes } = await promise.json();
  return wordRes;
}

async function checkGuess() {
  const wordOfTheDayString = await wordOfTheDayPromise;
  console.log("Your guess", inputedGuess);
  console.log(typeof wordOfTheDayString);
  return wordOfTheDayString === inputedGuess;
}

async function checkIsWord() {
  const promise = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({ word: inputedGuess }),
  });
  const processedResponse = await promise.json();
  console.log(processedResponse);
  return processedResponse.validWord;
}

window.addEventListener("keyup", handleKeyUp);

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
      console.log("The guess is not long enough. Insert a 5-letter word!");
    } else {
      if (await checkGuess()) {
        console.log("Congrats, you guessed it!!");
        changeGuessColorsCorrect();
      } else {
        if (await checkIsWord()) {
          console.log("Hmm not quite");
          resultArray = await handleIncorrectGuess();

          numGuesses += 1;
          inputedGuess = "";
        }
      }
      // include logic for checking for duplicates in guess, but not in answer
      // update colors for letters
      //
      // numGuesses += 1;
      // maybe code hardmode?
    }
  }
}

function showLetter(letter) {
  let row = String(numGuesses + 1);
  let col = String(inputedGuess.length);

  let className = ".box_" + row + "-" + col;
  console.log(className);
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

function changeGuessColorsCorrect() {
  // This function could recieve an array input instead, and change color of the letter positon depending on the array input
  // 0: Letter is not in word, 1: Letter is in word, but at the wrong place, 2: Letter is in the correct spot
  // F. ex., Word: HEARTH and guess: EARTH would give [1,1,2,2,1]
  // And Word: NOVEL and guess: EARTH would give [1, 0, 0, 0]
  // This would merge changeGuessColorsCorrect and changeGuessColorsIncorrect
  for (let i = 1; i <= maxLengthGuess; i++) {
    row = numGuesses + 1;
    className = ".box_" + row + "-" + i;
    document.querySelector(className).style.backgroundColor = "green";
    document.querySelector(className).style.color = "white";
  }
}

async function changeGuessColorsIncorrect() {}

async function handleIncorrectGuess() {
  // Find number of correct letters in correct spaces
  // Find number of correct letters in incorrect spaces
  // Handle duplicates: guess: HOPPY and answer: PANTS should only give one yellow letter
  //return ??
  const wordOfTheDayString = await wordOfTheDayPromise;
  let wordOfTheDayArray = wordOfTheDayString.split("");

  let guessArray = [];

  for (let i = 0; i < maxLengthGuess; i++) {
    let letter = inputedGuess.charAt(i);
    if (wordOfTheDayArray.includes(letter)) {
      console.log(letter, "in word", wordOfTheDayString);
      if (wordOfTheDayArray[i] === letter) {
        guessArray[i] = 2;
        wordOfTheDayArray[i] = "0";
        console.log(wordOfTheDayArray);
      } else {
        guessArray[i] = 1;
        wordOfTheDayArray[i] = "0";
        console.log(wordOfTheDayArray);
      }
    } else {
      console.log(letter, "not in word", wordOfTheDayString);
      guessArray[i] = 0;
    }
  }
  console.log(guessArray);
  return guessArray;
}
