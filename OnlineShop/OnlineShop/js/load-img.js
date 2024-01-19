var img = document.querySelector("form img");
var load_img = document.querySelector('img + input[type="file"][name="image"]');
var del_img = document.querySelector('.del-img');

img.addEventListener('click', event => {
    load_img.click();
})

img.addEventListener('dragover', event => {
    event.preventDefault();
})
img.addEventListener('drop', event => {
    event.preventDefault();
    load_img.files = event.dataTransfer.files;
    load_img.dispatchEvent(new Event('change'));
})

load_img.addEventListener('change', event => {
    const file = load_img.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        img.attributes['src'].value = reader.result;
    }
})

del_img.addEventListener('click', event => {
    img.attributes['src'].value = 'pfp/default.jpg';
    var file = new File([""], 'del', {type: 'text/plain'});
    var dt = new DataTransfer();
    dt.items.add(file);
    load_img.files = dt.files;
})