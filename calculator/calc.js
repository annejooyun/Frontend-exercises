
let lastResult = 0;
let currentInput = "";
let lastbutton = null;

// Operator buttons
const clearButton = document.querySelector(".clear");
const delButton = document.querySelector(".del");
const divButton = document.querySelector(".div");
const mulButton = document.querySelector(".mul");
const subButton = document.querySelector(".sub");
const addButton = document.querySelector(".add");
const equalButton = document.querySelector(".equal");

// Number button
const numberButtons = document.querySelectorAll(".number");

// Number button event listener
numberButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        currentInput += Number(button.innerText);
        document.querySelector(".result").innerText = currentInput;
    });
});


// Operator button event listeners
clearButton.addEventListener("click", function () {
    lastResult = 0;
    currentInput = "";
    lastButton = "clear";
    document.querySelector(".result").innerText = lastResult;
});

delButton.addEventListener("click", function () {
    lastResult = Number(lastResult.toString().slice(0,-1));
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
    }
    else if (lastButton === "sub") {
            lastResult = Number(lastResult) - Number(currentInput);
            currentInput = "";
    }

    document.querySelector(".result").innerText = lastResult;
    lastButton = "equal";
}); 
