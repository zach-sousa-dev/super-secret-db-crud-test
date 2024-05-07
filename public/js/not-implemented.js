var buttons = document.querySelectorAll(".not-implemented");
console.log(buttons);

buttons.forEach(element => {
    element.addEventListener("click", (event) => {
        console.log("clicked");
        alert("This feature has not yet been implemented.");
    });
});