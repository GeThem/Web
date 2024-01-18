<?php
include("auth.php");
$_SESSION['frompage'] = "index.php";

// function removeFilename($url)
// {
//     $file_info = pathinfo($url);
//     return isset($file_info['extension'])
//         ? str_replace($file_info['filename'] . "." . $file_info['extension'], "", $url)
//         : $url;
// }

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="css/styles.css">
	<link media="print" rel="stylesheet" href="css/styles-print.css">
	<link rel="stylesheet" href="css/styles-login.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
	<title>Document</title>
</head>
<body>
	<?php include("partials-front/header.php"); ?>
	
	<div class="content">
		<div class="filter-area"></div>
		<div class="goods-area"></div>
	</div>

	<script type="module" src="js/script.js"></script>
	<script type="module" src="js/scroll.js"></script>
	<script type="module" src="js/login-window.js"></script>
	
</body>
</html>