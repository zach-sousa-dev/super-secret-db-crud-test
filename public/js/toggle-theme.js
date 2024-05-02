console.log("loaded");

function toggleTheme() { 
    var theme = document.querySelector("#css");

    if (theme.getAttribute('href') == './public/css/lightstyle.css') { 
        theme.setAttribute('href', './public/css/darkstyle.css'); 
    } else { 
        theme.setAttribute('href', './public/css/lightstyle.css'); 
    } 
} 