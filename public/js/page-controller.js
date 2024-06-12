var firstId;    //these will be init on page load
var lastId;
var count = 0;

const itemQuantityDropDown = document.querySelector("#items-per-page-dropdown");
const pageNumber = document.querySelector("#page-number");

window.addEventListener("load", (event)=>{
    reset();
});

function nextPressed() {
    getItems("fwd", lastId, itemQuantityDropDown.value);
}

function backPressed() {
    getItems("bwd", firstId, itemQuantityDropDown.value);
}

function reload() {
    getItems("fwd-inclusive", firstId, itemQuantityDropDown.value);
}

itemQuantityDropDown.addEventListener("change", function(event) {
    reset();
}); 

async function reset() {
    firstId = 0;
    lastId = 0;
    count = 0;
    await getItems("fwd", 0, itemQuantityDropDown.value);
}

async function getItems(dir, id, qty) {
    return fetch("../private/php/get-list.php", {
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
            console.log(dir);
            if(dir == "fwd") {
                count ++;
            } else {
                count --;
            }
            pageNumber.innerText = count + "/" + (Math.ceil(response.count/qty));

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
