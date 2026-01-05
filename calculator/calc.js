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
  } else {
    buffer += value.toString();
  }
}

function handleOperator(pressedOperator) {
  if (pressedOperator === "C") {
    buffer = "0";
    runningTotal = 0;
    lastOperator = null;
    updateResult(buffer);
    console.log("C button pressed. Everything is erased. Buffer is", buffer);
  } else if (pressedOperator === "←") {
    if (buffer.length < 2) {
      buffer = "0";
    } else {
      buffer = buffer.slice(0, -1);
    }
    updateResult(buffer);
    console.log("← button pressed. Last character erased. Buffer is", buffer);
  } else if (pressedOperator === "=") {
    console.log("I am in equal");
    handleMath(pressedOperator);
    updateResult(runningTotal);
    lastOperator = null;
    runningTotal = 0;
    buffer = "0";
  } else {
    handleMath(pressedOperator);
    buffer = "0";
    updateResult(buffer);
    console.log("Buffer is", buffer, "Running total is", runningTotal);
  }
}

function handleMath(pressedOperator) {
  if (lastOperator === null) {
    runningTotal += Number(buffer);
    lastOperator = pressedOperator;
    console.log("No lastOperator, so I set it to be", pressedOperator);
  } else {
    console.log("Last operator is", lastOperator);
    switch (lastOperator) {
      case "+":
        runningTotal += Number(buffer);
        lastOperator = pressedOperator;
        break;
      case "-":
        runningTotal -= Number(buffer);
        lastOperator = pressedOperator;
        break;
      case "x":
        runningTotal *= Number(buffer);
        lastOperator = pressedOperator;
        break;
      case "÷":
        runningTotal /= Number(buffer);
        lastOperator = pressedOperator;
        break;
    }
  }
}
