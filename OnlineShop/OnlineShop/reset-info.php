<?php

include("sanitize-input.php");
include("utils.php");
include("variables.php");
include("auth.php");

if (isset($_POST['submit']) and isset($_SESSION['token']) and $_SESSION['token_expiry'] > time() and md5($_POST['token']) == $_SESSION['token']) {
    $err = array();
    $_POST['email'] = sanitize($_POST['email']);
    $_POST['login'] = sanitize($_POST['login']);
    $err = array_merge($err, checkLogin($db, $_POST['login']));
    $err = array_merge($err, checkEmailFull($db, $_POST['email']));
    $query = $db->execute_query("SELECT * FROM users WHERE user_email=? AND user_id<>? LIMIT 1", [$_POST['email'], $userdata['user_id']]);
    if ($query->num_rows > 0) {
        $err[] = "Данная почта привязана к другому аккаунту";
    }
    $query = $db->execute_query("SELECT * FROM users WHERE user_login=? AND user_id<>? LIMIT 1", [$_POST['login'], $userdata['user_id']]);
    if ($query->num_rows > 0) {
        $err[] = "Пользователь с таким логином уже существует в базе данных";
    }

    if ($_FILES['image']['tmp_name']) {
        imagepng(imagecreatefromstring(file_get_contents($_FILES['image']['tmp_name'])), $userdata['user_id'].'.png');
        if(is_uploaded_file($_FILES['image']['tmp_name'])) {
            if(!move_uploaded_file($_FILES['image']['tmp_name'], "user/pfp/".$userdata['user_id'].'.png')) {
                $err[] = "Failed to move your image.";
            }
        }
        else {
            $err[] = "Failed to upload your image.";
        }    
    }
    if (count($err) == 0) {
        $userdata['user_email'] = $_POST['email'];
        $userdata['user_login'] = $_POST['login'];
        $userdata['pfp'] = 1;
        if (!strcmp("user/pfp/default.jpg", $_FILES['image']['path'])) {
            $_FILES['image']['tmp_name'] = 0;
        } else if ($_FILES['image']['tmp_name'] === '') {
            $_FILES['image']['tmp_name'] = 0;
        } else {
            $_FILES['image']['tmp_name'] = 1;
        }
        $_SESSION['msg'] = array("информация успешно изменена!");
        $db->execute_query('UPDATE users SET user_login=?, user_email=?, pfp='.$_FILES['image']['tmp_name'].' WHERE user_id=?', [$userdata['user_login'], $userdata['user_email'], $userdata['user_id']]);
        //http://localhost:3000/OnlineShop/OnlineShop/user/profile.php?&edit=1&section=security&a=b
    } else {
        $_SESSION['error'] = $err;
    }
    $_SESSION['token_expiry'] = 0;
    header('Location: '.$URL.'user/profile.php?edit='.$userdata['user_id'].'&section=info');
}