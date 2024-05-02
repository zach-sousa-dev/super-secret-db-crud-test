/**
 * this function checks the current href of the css, and stores the new 
 * one in the localStorage
 */
function toggleTheme() { 
    var themeStyling = document.querySelector("#css");
    if (window.localStorage.getItem("theme") == './public/css/lightstyle.css') { 
        window.localStorage.setItem("theme", "./public/css/darkstyle.css");
    } else { 
        window.localStorage.setItem("theme", "./public/css/lightstyle.css");
    } 
    getTheme();
}

/**
 * this function is used to retrieve the current theme from the
 * localStorage
 */
function getTheme() {
    var themeStyling = document.querySelector("#css");
    themeStyling.setAttribute('href', window.localStorage.getItem("theme"));
}

/**
 * call the getTheme function on page load
 */
window.addEventListener("load", (event) => {
    getTheme();
});