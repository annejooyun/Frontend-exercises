let buffer = "0";
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
  });
});

// Update the result shown on the screen
function updateResult() {
  document.querySelector(".result").innerText = buffer;
}

//
function handleNumber(value) {
  if (buffer === "0") {
    buffer = value.toString();
  } else {
    buffer += value.toString();
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
