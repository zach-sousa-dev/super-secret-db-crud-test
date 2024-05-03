function setElement(fileName, element) {
    fetch(fileName)
    .then(response => response.text())
    .then(data => element.innerHTML = data);
}

function addElement(fileName, element) {
    fetch(fileName)
    .then(response => response.text())
    .then(data => element.innerHTML += data);
}