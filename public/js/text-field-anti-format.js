/**
 * What does this do?
 * -Do not allow new lines in my text fields
 * -Do not allow any HTML in my text fields
 */

//add event listeners to each input field to clean up the input
document.querySelectorAll('.item-param-input, .item-param-input-tall').forEach(element => {
    element.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            let elm = this;
            setTimeout(() => {
                elm.innerText = strip(elm.innerText);
            }, 0);
        }
    })
    element.addEventListener('paste', function(event) {
        let elm = this;
        setTimeout(() => {
            elm.innerText = strip(elm.innerText);
        }, 0);
    })
});

/**
 * lifted from https://stackoverflow.com/questions/822452/strip-html-tags-from-text-using-plain-javascript/47140708#47140708
 * This function strips garbage HTML from the string. This includes styles and <br>.
 * @param html      the string to strip
 * @return          the string without any html tags
 */
function strip(html){
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
 }