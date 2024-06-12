if(new URLSearchParams(window.location.search).has("id")) {
    loadPage(new URLSearchParams(window.location.search).get("id"));
}

function loadPage(id) {
    fetch("../private/php/get-item.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                id: id
        })
    })
    .then( (response)=> response.json() )
    .then(res=> {
        inputs = document.querySelectorAll("input, textarea");
        inputs.forEach(element => {
            element.disabled = true;
            if(res[element.name] != "NULL" && res[element.name] != null) {
                if(element.type == "checkbox") {
                    element.checked = (res[element.name] == 1) ? true : false;
                }
                element.value = res[element.name];
            }
        });
        console.log(res);
    });
}