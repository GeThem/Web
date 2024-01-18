<?php
function checkEmail($email) {
    $find1 = strpos($email, '@');
    $find2 = strpos($email, '.');
    return ($find1 !== false && $find2 !== false && $find2 > $find1);
 }

function checkEmailFull($db, $email) {
    $err = array();
    if (strlen($email) > 30) {
        $err[] = "Почтовый адрес должен быть не больше 30 символов";
    } 
    if (!checkEmail($email)) {
        $err[] = "Строка не является почтовым адресом";
    } 
    return $err;
}

 function checkLogin($db, $login) {
    $err = array();
    if (strlen($login) < 5 or strlen($login) > 30) {
        $err[] = "Логин должен быть не меньше 5-и символов и не больше 30";
    }
    if (!preg_match("/^[a-zA-Z0-9_-]+$/", $login)) {
        $err[] = "Логин не соответствует паттерну";
    }
    return $err;
 }