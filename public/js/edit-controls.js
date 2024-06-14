const viewButtons = document.querySelectorAll(".view-mode");
const addButtons = document.querySelectorAll(".add-mode");
const editButtons = document.querySelectorAll(".edit-mode");

const editButton = document.querySelector("#edit-button");
const cancelEditButton = document.querySelector("#cancel-edit-button");

let inputs = document.querySelectorAll("input, textarea");

var isEditing = false;


//check if we are viewing an item (true) or making an item (false)
if(new URLSearchParams(window.location.search).has("id")) {
    enterViewMode();
} else {
    enterAddMode();
}


//add listeners
editButton.addEventListener("click", function(event) {
    enterEditMode();
});

cancelEditButton.addEventListener("click", function(event) {
    enterViewMode();
    loadPage(new URLSearchParams(window.location.search).get("id"));
});


//show buttons for creating an item
function enterAddMode() {
    addButtons.forEach((element)=>{     //show all the adding related buttons
        element.classList.remove("hidden");
    });

    editButtons.forEach((element)=>{    //hide all the editing related buttons
        element.classList.add("hidden");
    });

    viewButtons.forEach((element)=>{    //hide all the viewing related buttons
        element.classList.add("hidden");
    });

    inputs.forEach(element => {
        element.disabled = false;
    });
}

//show buttons for viewing an item
function enterViewMode() {
    addButtons.forEach((element)=>{
        element.classList.add("hidden");
    });

    editButtons.forEach((element)=>{
        element.classList.add("hidden");
    });

    viewButtons.forEach((element)=>{
        element.classList.remove("hidden");
    });

    inputs.forEach(element => {
        element.disabled = true;
    });
}

//show buttons for editing an item
function enterEditMode() {
    addButtons.forEach((element)=>{
        element.classList.add("hidden");
    });

    editButtons.forEach((element)=>{
        element.classList.remove("hidden");
    });

    viewButtons.forEach((element)=>{
        element.classList.add("hidden");
    });

    inputs.forEach(element => {
        element.disabled = false;
    });
}