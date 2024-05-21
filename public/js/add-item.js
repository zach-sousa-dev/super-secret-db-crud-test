console.log(JSON.stringify( { 
    //it is required that the variable names here are the same as the db
    name: document.querySelector("#item-name").innerHTML.trim(),
    quantity: document.querySelector("#item-qty").innerHTML.trim(),
    min_qty: document.querySelector("#item-notice-qty").innerHTML.trim(),
    unit: document.querySelector("#item-unit").innerHTML.trim(),
    value: document.querySelector("#item-value").innerHTML.trim(),
    available: document.querySelector("#item-value").checked,
    notes: document.querySelector("#item-notes").innerHTML.trim()
}));

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
        console.log(response);
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