import * as utils from './utils.js';

var login = document.querySelector('.login');
var register = document.querySelector('.register');
var body = document.querySelector('body');

var register_html = utils.htmlToElement(`
<div class="login-register-content" style="max-width: 500px">
        <form class="login-register" novalidate action="registration.php" method="post"> 
            <span class="grid-first-col">Почта:</span>
            <div class="input-wrapper">
                <input type="email" name="email" maxlength=30 required>
                <span class="grid-sec-col error hide"></span>
            </div>
            <span class="grid-first-col">Логин:</span>
            <div class="input-wrapper">
                <input type="text" name="login" minlength=5 maxlength=30 pattern="[a-zA-Z0-9_\-]+" required">
                <span class="grid-sec-col error hide"></span>
            </div>
            <span class="grid-first-col">Пароль:</span>
            <div class="input-wrapper">
                <input type="password" name="password" minlength=5 maxlength=32 required>
                <span class="grid-sec-col error hide"></span>
            </div>
            <span class="grid-first-col">Повторите пароль:</span>
            <div class="input-wrapper">
                <input type="password" name="password2" minlength=5 maxlength=32 required>
                <span class="grid-sec-col error hide"></span>
            </div>
            <label class="filter-checkbox grid-row-span-2 grid-third-row grid-third-col">
                <input type="checkbox">
                <svg class="hide-pw" fill="none" width="1.7rem" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M22.6928 1.55018C22.3102 1.32626 21.8209 1.45915 21.6 1.84698L19.1533 6.14375C17.4864 5.36351 15.7609 4.96457 14.0142 4.96457C9.32104 4.96457 4.781 7.84644 1.11993 13.2641L1.10541 13.2854L1.09271 13.3038C0.970762 13.4784 0.967649 13.6837 1.0921 13.8563C3.79364 17.8691 6.97705 20.4972 10.3484 21.6018L8.39935 25.0222C8.1784 25.4101 8.30951 25.906 8.69214 26.1299L9.03857 26.3326C9.4212 26.5565 9.91046 26.4237 10.1314 26.0358L23.332 2.86058C23.553 2.47275 23.4219 1.97684 23.0392 1.75291L22.6928 1.55018ZM18.092 8.00705C16.7353 7.40974 15.3654 7.1186 14.0142 7.1186C10.6042 7.1186 7.07416 8.97311 3.93908 12.9239C3.63812 13.3032 3.63812 13.8561 3.93908 14.2354C6.28912 17.197 8.86102 18.9811 11.438 19.689L12.7855 17.3232C11.2462 16.8322 9.97333 15.4627 9.97333 13.5818C9.97333 11.2026 11.7969 9.27368 14.046 9.27368C15.0842 9.27368 16.0317 9.68468 16.7511 10.3612L18.092 8.00705ZM15.639 12.3137C15.2926 11.7767 14.7231 11.4277 14.046 11.4277C12.9205 11.4277 12 12.3906 12 13.5802C12 14.3664 12.8432 15.2851 13.9024 15.3624L15.639 12.3137Z" fill="black" fill-rule="evenodd"/><path d="M14.6873 22.1761C19.1311 21.9148 23.4056 19.0687 26.8864 13.931C26.9593 13.8234 27 13.7121 27 13.5797C27 13.4535 26.965 13.3481 26.8956 13.2455C25.5579 11.2677 24.1025 9.62885 22.5652 8.34557L21.506 10.2052C22.3887 10.9653 23.2531 11.87 24.0894 12.9239C24.3904 13.3032 24.3904 13.8561 24.0894 14.2354C21.5676 17.4135 18.7903 19.2357 16.0254 19.827L14.6873 22.1761Z" fill="black"/></svg>
            </label>
            <input class="grid-col-span-3" type="submit" name="submit" value="Подтвердить"> 
        </form> 
    </div>
`);

var login_html = utils.htmlToElement(`
    <div class="login-register-content" style="width: 500px">
    <form class="login-register" novalidate action="login.php" method="post"> 
            <span class="grid-first-col">Логин:</span>
            <div class="input-wrapper">
                <input type="text" name="login" minlength=5 maxlength=30 pattern="[a-zA-Z0-9_\-]+">
                <span class="grid-sec-col error hide"></span>
            </div>
            <span class="grid-first-col">Пароль:</span>
            <div class="input-wrapper">
                <input type="password" name="password" minlength=5 maxlength=32>
                <span class="grid-sec-col error hide"></span>
            </div>
            <label class="filter-checkbox">
                <input type="checkbox">
                <svg class="hide-pw" fill="none" width="1.7rem" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M22.6928 1.55018C22.3102 1.32626 21.8209 1.45915 21.6 1.84698L19.1533 6.14375C17.4864 5.36351 15.7609 4.96457 14.0142 4.96457C9.32104 4.96457 4.781 7.84644 1.11993 13.2641L1.10541 13.2854L1.09271 13.3038C0.970762 13.4784 0.967649 13.6837 1.0921 13.8563C3.79364 17.8691 6.97705 20.4972 10.3484 21.6018L8.39935 25.0222C8.1784 25.4101 8.30951 25.906 8.69214 26.1299L9.03857 26.3326C9.4212 26.5565 9.91046 26.4237 10.1314 26.0358L23.332 2.86058C23.553 2.47275 23.4219 1.97684 23.0392 1.75291L22.6928 1.55018ZM18.092 8.00705C16.7353 7.40974 15.3654 7.1186 14.0142 7.1186C10.6042 7.1186 7.07416 8.97311 3.93908 12.9239C3.63812 13.3032 3.63812 13.8561 3.93908 14.2354C6.28912 17.197 8.86102 18.9811 11.438 19.689L12.7855 17.3232C11.2462 16.8322 9.97333 15.4627 9.97333 13.5818C9.97333 11.2026 11.7969 9.27368 14.046 9.27368C15.0842 9.27368 16.0317 9.68468 16.7511 10.3612L18.092 8.00705ZM15.639 12.3137C15.2926 11.7767 14.7231 11.4277 14.046 11.4277C12.9205 11.4277 12 12.3906 12 13.5802C12 14.3664 12.8432 15.2851 13.9024 15.3624L15.639 12.3137Z" fill="black" fill-rule="evenodd"/><path d="M14.6873 22.1761C19.1311 21.9148 23.4056 19.0687 26.8864 13.931C26.9593 13.8234 27 13.7121 27 13.5797C27 13.4535 26.965 13.3481 26.8956 13.2455C25.5579 11.2677 24.1025 9.62885 22.5652 8.34557L21.506 10.2052C22.3887 10.9653 23.2531 11.87 24.0894 12.9239C24.3904 13.3032 24.3904 13.8561 24.0894 14.2354C21.5676 17.4135 18.7903 19.2357 16.0254 19.827L14.6873 22.1761Z" fill="black"/></svg>
            </label>
            <a style="font-size: 1.2rem; justify-self: center; color: blue; text-decoration: underline;" class="grid-col-span-3" href="forgor-password.php">Забыли пароль?</a>
            <input class="grid-col-span-3" type="submit" name="submit" value="Подтвердить"> 
        </form> 
</div>`
);

console.log(body.childNodes);

window.addEventListener('click', () => {
    if (body.lastChild == register_html || body.lastChild == login_html) {
        body.removeChild(body.lastChild)
    }
    if (body.lastChild == register_html || body.lastChild == login_html) {
        body.removeChild(body.lastChild)
    }
})

login.addEventListener('click', event => {
    if (body.lastChild == register_html) {
		body.removeChild(register_html)
    }
    body.appendChild(login_html);
    event.stopPropagation();
})

register.addEventListener('click', event => {
    if (body.lastChild == login_html) {
		body.removeChild(login_html)
    }
    body.appendChild(register_html);
    event.stopPropagation();
})

register_html.addEventListener('click', event => {
    event.stopPropagation();
})

login_html.addEventListener('click', event => {
    event.stopPropagation();
})
