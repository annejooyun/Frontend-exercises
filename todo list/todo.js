let numTasks = 0;
const todoList = document.querySelector(".todo-list");
const input = document.getElementById("task");

function handleKeyUp(event) {
    const key = event.key;
    if (key === "Enter") {
        console.log("Enter pressed");
        console.log(input.value);

    }
    return(0);
}

function handleClearBtnPress() {
    console.log("Button pressed")
    return(0);
}





document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keyup", handleKeyUp);
    document.querySelector("#clear-btn").addEventListener("click", handleClearBtnPress);
});