//get all of the data on the page and send it to the PHP
//NOTE: I currently don't have any checking to see if parameters are empty.
function submitItem() {
    fetch("../private/php/add-item.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( { 
            // NOTE: it is required that the variable names here are the same as in the db
            name: document.querySelector("#item-name").innerText.trim(),
            quantity: document.querySelector("#item-qty").innerText.trim(),
            min_qty: document.querySelector("#item-notice-qty").innerText.trim(),
            unit: document.querySelector("#item-unit").innerText.trim(),
            value: document.querySelector("#item-value").innerText.trim(),
            available: (document.querySelector("#item-available").checked ? "1" : "0"),
            notes: document.querySelector("#item-notes").innerText.trim()
        })
    }).then((response)=>response.json())
    .then((response)=>{
        //console.log(response);
    });
}