const delButton = document.querySelector("#delete-button");

delButton.addEventListener("click", function(event) {
    event.preventDefault();
    if(confirm("Are you sure you wish to permanently delete the item?") == true) {
        deleteItem(new URLSearchParams(window.location.search).get("id"));
    }
});

function deleteItem(id) {

    fetch("../private/php/delete-item.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            id: id
        })
    })
    .then( ()=> {
        window.location.href = "./list.html";
    });

}