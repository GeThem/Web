<?php

include("sanitize-input.php");

function checkEmail($email) {
    $find1 = strpos($email, '@');
    $find2 = strpos($email, '.');
    return ($find1 !== false && $find2 !== false && $find2 > $find1);
 }

if(isset($_POST['submit']))
{    
    $db = new mysqli("localhost", "root", "1234", "onlineshop");
    $err = array();
    $_POST['email'] = sanitize($_POST['email']);
    $_POST['login'] = sanitize($_POST['login']);
    $_POST['password'] = trim($_POST['password']);

    if(strlen($_POST['login']) < 5 or strlen($_POST['login']) > 30)
    {
        $err[] = "Логин должен быть не меньше 5-и символов и не больше 30";
    }
    else if(!preg_match("/^[a-zA-Z0-9_-]+$/",$_POST['login']))
    {
        $err[] = "Логин не соответствует паттерну";
    }
    else
    {
        $query = $db->execute_query("SELECT * FROM users WHERE user_login=? LIMIT 1", [$_POST['login']]);
        if($query->num_rows > 0)
        {
            $err[] = "Пользователь с таким логином уже существует в базе данных";
        }
    }

    if(strlen($_POST['email']) > 30)
    {
        $err[] = "Почтовый адрес должен быть не больше 30 символов";
    }
    else if (!checkEmail($_POST['email'])) 
    {
        $err[] = "Строка не является почтовым адресом";
    }
    else
    {
        $query = $db->execute_query("SELECT * FROM users WHERE user_email=? LIMIT 1", [$_POST['email']]);
        if($query->num_rows > 0)
        {
            $err[] = "Данная почта привязана к другому аккаунту";
        }
    }
    
    if(strlen($_POST['password']) < 5 or strlen($_POST['password']) > 32)
    {
        $err[] = "Пароль должен быть не меньше 5-и символов и не больше 32";
    }
        
    if(count($err) == 0)
    {
        $password = md5(md5($_POST['password']));
        $db->execute_query("INSERT INTO users SET user_login=?, user_password=?, user_email=?, user_hash=0, user_ip=0", [$_POST['login'], $password, $_POST['email']]);
        header("Location: login.php"); exit();
    }
    else
    {
        print '<div style="position: absolute; z-index: 99; background: rgb(200, 50, 50, 0.8); border: 1px solid black; padding: 20px; left: 5%; top: 10rem; width: 30%;">
        <b>При регистрации произошли следующие ошибки:</b><br>';
        foreach($err AS $error)
        {
            print $error."<br>";
        }
        print('</div>');
        $_POST['password'] = "";
        sleep(1);
    }
}

?>

<!DOCTYPE html>
<html lang="en">
    <head> 
        <title>Авторизация пользователя</title> 
        <link rel="stylesheet" href="css/styles.css">
        <link rel="stylesheet" href="css/styles-login.css">
    </head> 
    <body> 
        <?php include("partials-front/header.php"); ?>

        <div class="content-grid">
            <form novalidate action="registration.php" method="post"> 
                <span class="grid-first-col">Почта:</span>
                <div class="input-wrapper">
                    <input type="email" name="email" maxlength=30 required value="<?php echo $_POST['email']?>">
                    <span class="grid-sec-col error hide"></span>
                </div>
                <span class="grid-first-col">Логин:</span>
                <div class="input-wrapper">
                    <input type="text" name="login" minlength=5 maxlength=30 pattern="[a-zA-Z0-9_-]+" required value="<?php echo $_POST['login']?>">
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

        <script type="module" src="js/login-page-script.js"></script>
    </body> 
</html> 
