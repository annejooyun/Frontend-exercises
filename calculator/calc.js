
let lastResult = 20;
let lastbutton = null;


const clearButton = document.querySelector(".clear");
const delButton = document.querySelector(".del");
const divButton = document.querySelector(".div");
const mulButton = document.querySelector(".mul");
const subButton = document.querySelector(".sub");
const addButton = document.querySelector(".add");
const equalButton = document.querySelector(".equal");

const


clearButton.addEventListener("click", function () {
    lastResult = 0;
    document.querySelector(".result").innerText = lastResult;
});

delButton.addEventListener("click", function () {
    lastResult = lastResult.toString().slice(0,-1);
    document.querySelector(".result").innerText = lastResult;
});

