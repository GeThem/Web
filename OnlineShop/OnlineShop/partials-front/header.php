<?php 
include("../variables.php");
include("../auth.php");

$pfp = $URL.'user/pfp/default.jpg'; 
if ($userdata['pfp']) {
	$pfp =  $URL.'user/pfp/'.$userdata['user_id'].'.png';
}

?>

<header class="header-area">
	<div class="content">
		<h1><a href="<?php print $URL ?>index.php">My site</a></h1>
		<?php 
		if (!isset($userdata["loggedin"]) or !$userdata["loggedin"]) {
            echo '<ul></ul>';
			echo '<button class="login">Вход</button> 
			<button class="register">Регистрация</button>';
		} else {
			echo '<ul><li><a href="'.$URL.'secret-place.php">Registered Users Special</a></h2></li></ul>';
			echo '<a class="pfp" href="'.$URL.'user/profile.php"><img src="'.$pfp.'" alt=""></a>';
			echo '<a href="'.$URL.'logout.php">Выйти</a>';
		}  
		?>
	</div>
</header>