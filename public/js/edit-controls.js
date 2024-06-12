const viewButtons = document.querySelectorAll(".view-mode");
const addButtons = document.querySelectorAll(".add-mode");
const editButtons = document.querySelectorAll(".edit-mode");

const editButton = document.querySelector("#edit-button");
const cancelEditButton = document.querySelector("#cancel-edit-button");

let inputs = document.querySelectorAll("input, textarea");

var isEditing = false;



if(new URLSearchParams(window.location.search).has("id")) {
    enterViewMode();
} else {
    enterAddMode();
}



editButton.addEventListener("click", function(event) {
    enterEditMode();
});

cancelEditButton.addEventListener("click", function(event) {
    enterViewMode();
    loadPage(new URLSearchParams(window.location.search).get("id"));
});



function enterAddMode() {
    addButtons.forEach((element)=>{
        element.classList.remove("hidden");
    });

    editButtons.forEach((element)=>{
        element.classList.add("hidden");
    });

    viewButtons.forEach((element)=>{
        element.classList.add("hidden");
    });

    inputs.forEach(element => {
        element.disabled = false;
    });
}

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