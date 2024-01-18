let msg = document.querySelector(".msg");
await new Promise(r => setTimeout(r, 5000));
if (msg) {
    msg.parentNode.removeChild(msg);
}