async function submitItem(data) {
    const res = await fetch("../private/php/add-item.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then((response)=>{
        return response.id;
    });

    return res;
}

async function updateItem(data) {
    const res = await fetch("../private/php/update-item.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then((response)=>{
        return response.id;
    });

    return res;
}

const submitButton = document.querySelector("#confirm-button");
const saveButton = document.querySelector("#save-button");

const form = document.querySelector("form");

function getFormData(formEl) {
    const fd = new FormData(formEl);
    return fd;
}

submitButton.addEventListener("click", async function(event) {
    
    event.preventDefault();
    fd = getFormData(form);

    let data = {};
    fd.forEach((value, key) => {
        const element = document.querySelector(`[name="${key}"]`);
        if (!(element.type === "checkbox")) {
            data[key] = value;
        }
    });

    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        console.log("what");
        data[checkbox.name] = checkbox.checked;
        console.log(checkbox.checked);
    });

    console.log("got here");
    let newId = await submitItem(data);
    window.location.href="../public/create.html?id="+newId;
    
});

saveButton.addEventListener("click", async function(event) {
    
    event.preventDefault();
    if(confirm("Are you sure you wish to overwrite the item's data?")) {
        fd = getFormData(form);

        let data = {};
        fd.forEach((value, key) => {
            const element = document.querySelector(`[name="${key}"]`);
            if (!(element.type === "checkbox")) {
                data[key] = value;
            }
        });

        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            data[checkbox.name] = checkbox.checked;
            console.log(checkbox.checked);
        });

        let id = new URLSearchParams(window.location.search).get("id");
        data["id"] = id;
        await updateItem(data);
        window.location.href="../public/create.html?id="+id;
    }
    
});