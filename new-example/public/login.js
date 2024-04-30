const b_login = document.querySelector("#b_login");

const isValid = localStorage.getItem("valid");

console.log(isValid);
console.log(localStorage);

b_login.addEventListener("click", (e)=>{
    window.location.href = "./public/main.html";
    localStorage.setItem("valid", "true");
});