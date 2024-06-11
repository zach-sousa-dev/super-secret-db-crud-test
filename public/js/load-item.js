const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if(urlParams.has("id")) {
    fetch("../private/php/get-item.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                id: urlParams.get("id")
            }
        )
    })
    .then( (response)=> response.json() )
    .then(res=> {
        inputs = document.querySelectorAll("input, textarea");
        inputs.forEach(element => {
            element.disabled = true;
            if(res[element.name] != null) {
                if(element.type == "checkbox") {
                    element.checked = (res[element.name] == 1) ? true : false;
                }
                element.value = res[element.name];
            }
        });
        console.log(res);
    });

}