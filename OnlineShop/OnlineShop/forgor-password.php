<?php

include("sanitize-input.php");

function blur($email) {
    return substr($email, 0, 1).str_repeat("*", 8).substr($email, strpos($email, "@") - min(2, strpos($email, "@")));
}

$success = false;
$query = "";
if(isset($_POST['submit']))
{   
    $_POST['login-email'] = sanitize($_POST['login-email']);
    $db = new mysqli("localhost", "root", "1234", "onlineshop");
    if(str_contains($_POST['login-email'], "@")) 
    {
        $query = $db->execute_query("SELECT * FROM users WHERE user_email=? LIMIT 1", [$_POST['login-email']]);
        if($query->num_rows === 0)
        {
            echo '<div style="position: absolute; z-index: 99; background: rgb(200, 50, 50, 0.8); border: 1px solid black; padding: 20px; left: 5%; top: 10rem; width: 30%;">
            Данная почта не привязана ни к одному аккаунту</div>';
        }
        else
        {
            $success = true;
        }
    }
    else 
    {
        $err = array();
        if(strlen($_POST['login-email']) < 5 or strlen($_POST['login-email']) > 30)
        {
            $err[] = "Логин должен быть не меньше 5-х символов и не больше 30";
        }
        else if(!preg_match("/^[a-zA-Z0-9_-]+$/",$_POST['login-email']))
        {
            $err[] = "Логин не соответствует паттерну";
        }
        else {
            $query = $db->execute_query("SELECT * FROM users WHERE user_login=? LIMIT 1", [$_POST['login-email']]);
            if($query->num_rows === 0)
            {
                $err[] = "Пользователя с таким логином не существует";
            }
        }
        
        if(count($err) == 0)
        {
            $success = true;
        }
        else
        {
            print '<div style="position: absolute; z-index: 99; background: rgb(200, 50, 50, 0.8); border: 1px solid black; padding: 20px; left: 5%; top: 10rem; width: 30%;">
            <b>Произошли следующие ошибки:</b><br>';
            foreach($err AS $error)
            {
                print $error."<br>";
            }
            print('</div>');
        }
    }
    sleep(1);
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
        
        <div class="content-grid" style="width: 60%; margin: auto">
        
            <?php
            if (!$success) {
                echo '
                    <form novalidate action="forgor-password.php" method="post"> 
                        <span class="grid-first-col">Введите логин или почту:</span>
                        <div class="input-wrapper">
                            <input type="text" name="login-email" maxlength=32 required value="'.$_POST['login-email'].'">
                            <span class="grid-sec-col error hide"></span>
                        </div>
                        <input class="grid-col-span-3" type="submit" name="submit" value="Подтвердить"> 
                    </form>';
            } else {
                echo '
                    <form novalidate action="registration.php" method="post"> 
                        <span style="font-size: 3rem; text-align: center;">Ссылка для восстановления пароля была отправлена по адресу '.blur($query->fetch_assoc()['user_email']).'</span>
                    </form>';
            }
            ?>
           
        </div>
    </body> 
</html> 