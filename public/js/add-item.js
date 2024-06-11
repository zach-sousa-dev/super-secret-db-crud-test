async function submitItem(data) {
    fetch("../private/php/add-item.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response)=>response.json())
    .then((response)=>{
        return response;
    });
}

const submitButton = document.querySelector("#confirm-button");

const form = document.querySelector("form");

function getFormData(formEl) {
    fd = new FormData(formEl);
    console.log(...fd);
    return fd;
}

form.addEventListener("submit", async function(event) {
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
        data[checkbox.name] = checkbox.checked;
    });

    submitItem(data).then((res)=>{
        window.location.href="../public/create.html?id="+res.id;
    });
    
});