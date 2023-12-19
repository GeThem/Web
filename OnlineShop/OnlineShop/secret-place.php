<?php
include("auth.php");
$_SESSION['frompage'] = "secret-place.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php include("partials-front/header.php"); ?>

    <div class="content">
        <span style="margin-inline: auto; margin-block-start: 6rem; font-size: 5rem; text-wrap: wrap; text-align: center;">
            <?php 
                if ($userdata['loggedin']) {
                    print 'You are special, '.$userdata['user_login'].'. I mean it.';
                } else {
                    print "Hey, you can't be here! Go away.";
                }
            ?>
        </span>
    </div>
</body>
</html>