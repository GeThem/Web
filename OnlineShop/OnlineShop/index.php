<?php
include("auth.php");
$_SESSION['frompage'] = "index.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="css/styles.css">
	<link media="print" rel="stylesheet" href="css/styles-print.css">
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

</body>
</html>