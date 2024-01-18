<?php 
include("../variables.php")
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
			echo '<span style="font-size: 1.5rem;"><a href="'.$URL.'user/profile.php">'.$userdata['user_login'].'</a>';
			echo '<a href="'.$URL.'logout.php">Выйти</a>';
		}  
		?>
	</div>
</header>