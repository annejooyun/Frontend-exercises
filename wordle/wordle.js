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
  console.log("Your guess", inputedGuess);
  return word === inputedGuess;
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
        turnGuessGreen();
      } else {
        if (await checkIsWord()) {
          console.log("Hmm not quite");
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

function turnGuessGreen() {
  for (let i = 1; i <= maxLengthGuess; i++) {
    row = numGuesses + 1;
    className = ".box_" + row + "-" + i;
    document.querySelector(className).style.backgroundColor = "green";
    document.querySelector(className).style.color = "white";
  }
}
