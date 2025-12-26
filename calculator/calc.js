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
    updateResult(buffer);
  });
});

// Operator button event listener
operatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    handleOperator(button.innerText);
  });
});

// Update the result shown on the screen
function updateResult(value) {
  document.querySelector(".result").innerText = value;
}

// Updates buffer when a number is clicked
function handleNumber(value) {
  if (buffer === "0") {
    buffer = value.toString();
    console.log("buffer is zero");
  } else {
    buffer += value.toString();
  }
}

function handleOperator(value) {
  if (value === "C") {
    buffer = "0";
    runningTotal = 0;
    console.log("C button pressed. Buffer is", buffer);
  } else if (value === "←") {
    buffer = buffer.slice(0, -1);
    console.log(buffer);
  } else if (value === "=") {
    handleMath();
    buffer = "0";
    updateResult(runningTotal);
  } else {
    handleMath();
    switch (value) {
      case "÷":
        console.log("Divide pressed");
        lastOperator = "div";
        break;
      case "x":
        console.log("Multiply pressed");
        lastOperator = "mul";
        break;
      case "-":
        console.log("Minus pressed");
        lastOperator = "min";
        break;
      case "+":
        console.log("Plus pressed");
        lastOperator = "plu";
        break;
    }
    runningTotal = Number(buffer);
    console.log("runningtotal updated to", runningTotal);
    buffer = "0";
  }
  updateResult(runningTotal);
}

function handleMath() {
  if (buffer !== 0 && runningTotal !== 0) {
    switch (lastOperator) {
      case "plu":
        runningTotal += Number(buffer);
        console.log("running total is", runningTotal);
        break;
      case "min":
        runningTotal -= Number(buffer);
        break;
      case "mul":
        runningTotal *= Number(buffer);
        break;
      case "div":
        runningTotal /= Number(buffer);
        break;
    }
  }
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
