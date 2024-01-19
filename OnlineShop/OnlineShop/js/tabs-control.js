var buttons = document.querySelectorAll(".tabs .tabs-menu .tabs-menu-item");
var tabs = document.querySelectorAll(".tabs .tabs-content");
var params = new URLSearchParams(window.location.href)

function changeUrl(section) {
    let i = window.location.href.indexOf('?') ;
    if (i == -1) {
        var ref = window.location.href;
    } else {
        var ref = window.location.href.slice(0, i)
    }
    window.history.replaceState({},"", `${ref}?&edit=${params.get('edit')}&section=${section}`)
}

buttons.forEach(element => {
    element.addEventListener("click", () => {
        for (var i = 0; i < buttons.length; i++) {                
            if (buttons[i] !== element) {
                buttons[i].classList.remove("is-active");
                tabs[i].classList.remove("active");
            }
            else {
                buttons[i].classList.add("is-active");
                tabs[i].classList.add("active");
                changeUrl(buttons[i].attributes['data-key'].value);
            }
        }
    })
});

var i = -1;
if (params.get('section') != null) {
    var i = Array.from(buttons).findIndex((elem) => { return elem.attributes["data-key"].value == params.get('section'); });
}
if (i != -1) {
    buttons[i].classList.add("is-active");
    tabs[i].classList.add("active");
    changeUrl(buttons[i].attributes['data-key'].value);
}
else {
    buttons[0].classList.add("is-active");
    tabs[0].classList.add("active");
    changeUrl(buttons[0].attributes['data-key'].value);
}