let inputedGuess = "";
let numGuesses = 0;

const maxLengthGuess = 5;
const maxNumGuesses = 6;

async function getWordOfTheDay() {
  const promise = await fetch("https://words.dev-apis.com/word-of-the-day");
  const processedResponse = await promise.json();
  return processedResponse.word;
}

async function checkGuess() {
  const word = await getWordOfTheDay();
  console.log("Your guess", inputedGuess, "word", word);
  return word === inputedGuess;
}

async function checkIsWord() {
  //const promise = await
}

window.addEventListener("keyup", handleKeyUp);

async function handleKeyUp(event) {
  const key = event.key;
  if (isLetter(key)) {
    if (inputedGuess.length < maxLengthGuess && numGuesses < maxNumGuesses) {
      inputedGuess += key;
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
        console.log("Congrats!!!");
      }
      // check if guess is a word
      // check if guess is correct
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
