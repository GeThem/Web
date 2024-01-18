var img = document.querySelector("img");
var load_img = document.querySelector('img + input[type="file"][name="image"]');
var del_img = document.querySelector('.del-img');

img.addEventListener('click', event => {
    load_img.click();
})

load_img.addEventListener('change', event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
        img.attributes['src'].value = reader.result;
    }
})

del_img.addEventListener('click', event => {
    img.attributes['src'].value = 'pfp/default.jpg';
    load_img.value = '';
})