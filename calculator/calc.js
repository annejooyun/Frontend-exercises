let buffer = "0";
let runningTotal = 0;
let lastOperator = null;

// Operator button
const operatorButtons = document.querySelectorAll(".operator");

// Number button
const numberButtons = document.querySelectorAll(".number");

// Number button event listener
numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    handleNumber(Number(button.innerText));
    updateResult();
    console.log(buffer);
  });
});

// Operator button event listener
operatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    handleOperator(button.innerText);
  });
});

// Update the result shown on the screen
function updateResult() {
  document.querySelector(".result").innerText = buffer;
}

// Updates buffer when a number is clicked
function handleNumber(value) {
  if (buffer === "0") {
    buffer = value.toString();
    console.log("buffer is zero");
  } else {
    console.log("buffer before", buffer);
    buffer += value.toString();
    console.log("buffer after", buffer);
  }
}

function handleOperator(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      console.log("C button pressed. Buffer is", buffer);
      break;
    case "←":
      buffer = buffer.slice(0, -1);
      console.log(buffer);
      break;
    case "÷":
      console.log("Divide pressed");
      break;
    case "x":
      console.log("Multiply pressed");
      break;
    case "-":
      console.log("Minus pressed");
      break;
    case "+":
      console.log("Plus pressed");
      break;
    case "=":
      console.log("Equals pressed");
      break;
  }
  updateResult();
}

function flushBuffer() {
  runningTotal = Number(buffer);
  buffer = "0";
}

/*
// Operator button event listeners
clearButton.addEventListener("click", function () {
  lastResult = 0;
  currentInput = "";
  lastButton = "clear";
  document.querySelector(".result").innerText = lastResult;
});

delButton.addEventListener("click", function () {
  lastResult = Number(lastResult.toString().slice(0, -1));
  lastButton = "del";
  document.querySelector(".result").innerText = lastResult;
});

divButton.addEventListener("click", function () {
  lastButton = "div";
});

mulButton.addEventListener("click", function () {
  lastButton = "mul";
});

subButton.addEventListener("click", function () {
  lastButton = "sub";
  lastResult = Number(lastResult) - Number(currentInput);
  currentInput = "";
  document.querySelector(".result").innerText = lastResult;
});

addButton.addEventListener("click", function () {
  lastButton = "add";
  lastResult = Number(lastResult) + Number(currentInput);
  currentInput = "";
  document.querySelector(".result").innerText = lastResult;
});

equalButton.addEventListener("click", function () {
  if (lastButton === "add") {
    lastResult = Number(lastResult) + Number(currentInput);
    currentInput = "";
  } else if (lastButton === "sub") {
    lastResult = Number(lastResult) - Number(currentInput);
    currentInput = "";
  }

  document.querySelector(".result").innerText = lastResult;
  lastButton = "equal";
});


function buttonClick(value) {
  if (!isNaN(Number(value))) {
    handleNumber(value);
  } else {
    handleOperator();
  }
  updateResult();
}

function handleNumber(value) {
  if (lastResult === 0){
    lastResult = value
  }
  else{
    lastResult += value
  }
}

function handleOperator(value) {
  switch (value){
    case "C":
      lastResult = 0;

    case "←":
    case "÷":
    case "x":
    case "-":
    case "+":
    case "=":
  }
}

function updateResult() {
  document.querySelector(".result").innerText = lastResult;
}

function init() {
  document.addEventListener("click", function () {
    buttonClick(event.target.innerText);
  });
}

init();
*/
