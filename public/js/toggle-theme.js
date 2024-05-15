/**
 * this function checks the current href of the css, and stores the new 
 * one in the localStorage
 */
function toggleTheme() { 
    //var themeStyling = document.querySelector("#css");
    if (window.localStorage.getItem("theme") == './css/lightstyle.css') {    //make dark if light
        window.localStorage.setItem("theme", "./css/darkstyle.css");
    } else { 
        window.localStorage.setItem("theme", "./css/lightstyle.css");        //make light if dark
    } 

    getTheme();
}

/**
 * this function is used to retrieve the current theme from the
 * localStorage and use it in the DOM
 */
function getTheme() {
    var themeStyling = document.querySelector("#css");
    if(window.localStorage.getItem("theme") === null) {                                  //check if the theme is in local storage
        console.log("THEME NOT FOUND... CREATING...");
        window.localStorage.setItem("theme", "./css/lightstyle.css");            //make light if not set
        themeStyling.setAttribute('href', window.localStorage.getItem("theme"));
    } else {
        themeStyling.setAttribute('href', window.localStorage.getItem("theme"));
    }
    
}

/**
 * call the getTheme function on page load
 */
window.addEventListener("load", (event) => {
    getTheme();
});