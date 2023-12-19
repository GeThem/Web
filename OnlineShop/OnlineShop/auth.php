<?php

if (isset($_POST['submit'])) 
{
    unset($_COOKIE['id']);
    unset($_COOKIE['hash']);
    setcookie("id", "", time() - 3600*24*30*12, "/");
    setcookie("hash", "", time() - 3600*24*30*12, "/");
    $userdata["loggedin"] = false;
    header("Location: ".$_SESSION['frompage']); exit();
} 
elseif (isset($_COOKIE['id']) and isset($_COOKIE['hash']))
{   
    $db = new mysqli("localhost", "root", "1234", "onlineshop");
    $query = $db->execute_query("SELECT *,INET_NTOA(user_ip) AS user_ip FROM users WHERE user_id=? LIMIT 1", [intval($_COOKIE['id'])]);
    $userdata = $query->fetch_assoc(); 
    if(($userdata['user_hash'] !== $_COOKIE['hash']) or 
        ($userdata['user_id'] !== intval($_COOKIE['id'])) or 
        (($userdata['user_ip'] !== $_SERVER['REMOTE_ADDR']) and 
        ($userdata['user_ip'] !== "0.0.0.0")))
    {
        setcookie("id", "", time() - 3600*24*30*12, "/");
        setcookie("hash", "", time() - 3600*24*30*12, "/");
        $userdata["loggedin"] = false;
    }
    else
    {
        $userdata["loggedin"] = true;
    }
}
?>
