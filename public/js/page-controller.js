var firstId;    //these will be init on page load
var lastId;

window.addEventListener("load", (event)=>{
    getItems("fwd", 0, document.querySelector("#items-per-page-dropdown").value);
});

function nextPressed() {
    getItems("fwd", lastId, document.querySelector("#items-per-page-dropdown").value);
}

function backPressed() {
    getItems("bwd", firstId, document.querySelector("#items-per-page-dropdown").value);
}

function reload() {
    getItems("fwd-inclusive", firstId, document.querySelector("#items-per-page-dropdown").value);
}

function getItems(dir, id, qty) {
    fetch("../private/php/get-list.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            id: id,
            dir: dir,
            qty: qty
        } )
    }).then((response)=>response.json())
    .then((response)=>{
        if(!response.error) {
            itemsContainer = document.querySelector("#items-container");
            itemsContainer.innerHTML = "";
            console.log(response);
            response.items.forEach(element => {

                parentDiv = document.createElement("div");
                parentDiv.classList.add("item");
                parentDiv.classList.add("pointer");
                parentDiv.addEventListener("click", function(event) {
                    window.location.href = "../public/create.html?id="+element.id;
                });

                parentDiv.innerHTML += ("<div class='item-name'>" + element.name + "</div><div class='item-details'><div class='item-qty'>QTY: " + element.quantity + "</div><div class='item-availability'>" + (element.available ? "AVAILABLE" : "UNAVAILABLE") + "</div></div>");
                itemsContainer.appendChild(parentDiv);
            
            });
            firstId = response.firstId;
            lastId = response.lastId;
        }
    });
}
