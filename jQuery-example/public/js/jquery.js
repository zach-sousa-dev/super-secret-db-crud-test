/**
 * @author      Zachary Sousa
 * @version     1
 */

var reqURL = "http://localhost/super-secret-db-crud-test/jquery-example/private/php/example-query.php";     //the URL of the php server

//This code uses standard js to verify that the 
//js has been successfuly loaded
window.addEventListener("load", (event) => {
    console.log("ready -js");
});

//This code uses jQuery to verify that the 
//js has been successfuly loaded
//$()is shorthand for the ready function
$( document ).ready(function() {
    console.log( "ready -jQuery" );                     //for debugging
    $( "button#query" ).on("click", function() {        //select button with id="query", and add an on click listener with anon function
        console.log( "pressed" );                       //for debugging
        $.get(reqURL, function(result, status){         //send a get request, with a callback anon function which expects a result and status
            alert("Incoming: " + result + "\nRequest Status: " + status);       //display an alert on the page
        });
    });
});



