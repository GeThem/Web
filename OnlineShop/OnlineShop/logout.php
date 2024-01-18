<?php
unset($_COOKIE['id']);
unset($_COOKIE['hash']);
setcookie("id", "", time() - 3600 * 24 * 30 * 12, "/");
setcookie("hash", "", time() - 3600 * 24 * 30 * 12, "/");
$userdata["loggedin"] = false;
if (isset($_SESSION['frompage'])) {
    header("Location: " . $_SESSION['frompage']);
    exit();
} else {
    header("Location: index.php");
    exit();
}