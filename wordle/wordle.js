let inputedGuess = "";
let numGuesses = 0;

const maxLengthGuess = 5;
const maxNumGuesses = 6;

window.addEventListener("keyup", handleKeyUp);

function handleKeyUp(event) {
  const key = event.key;
  if (isLetter(key)) {
    if (inputedGuess.length < maxLengthGuess) {
      inputedGuess += key;
      showLetter(key);
    }
    // else if backspace -> removeLetter.
    // Slice inputedGuess and remove inner text from prev className
    //
    // else if enter -> enterGuess
    // check if guess is a word
    // check if guess is correct
    // looots of logic is needed here
    //
    // maybe code hardmode?
  }
}

function showLetter(letter) {
  let row = String(numGuesses + 1);
  let col = String(inputedGuess.length);

  let className = ".box_" + row + "-" + col;
  console.log(className);
  document.querySelector(className).innerText = letter;
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
