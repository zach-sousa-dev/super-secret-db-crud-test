function submitItem() {
    fetch("../private/php/add-item.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( { 
            //it is required that the variable names here are the same as the db
            name: document.querySelector("#item-name").innerHTML.trim(),
            quantity: document.querySelector("#item-qty").innerHTML.trim(),
            min_qty: document.querySelector("#item-notice-qty").innerHTML.trim(),
            unit: document.querySelector("#item-unit").innerHTML.trim(),
            value: document.querySelector("#item-value").innerHTML.trim(),
            available: document.querySelector("#item-value").checked,
            notes: document.querySelector("#item-notes").innerHTML.trim()
        })
    }).then((response)=>response.json())
    .then((response)=>{
        if (!response.ok) {
            return response.json().then(errorInfo => {
                // Throwing an error with the details
                throw new Error(JSON.stringify(errorInfo));
            });
        }
        return response.json();
    })
    .catch(error=> {
        console.log(error.message);
        console.log(error.input);
        console.log(error.sql);
        console.log(generateJSON());
    });
}

function generateJSON() {
    json = {
        name: document.querySelector("#item-name").innerHTML.trim(),
        quantity: document.querySelector("#item-qty").innerHTML.trim(),
        min_qty: document.querySelector("#item-notice-qty").innerHTML.trim(),
        unit: document.querySelector("#item-unit").innerHTML.trim(),
        value: document.querySelector("#item-value").innerHTML.trim(),
        available: document.querySelector("#item-value").checked,
        notes: document.querySelector("#item-notes").innerHTML.trim()
    };
    return json;
}