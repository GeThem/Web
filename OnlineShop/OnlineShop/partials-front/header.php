<header class="header-area">
	<div class="content">
		<h1><a href="index.php">My site</a></h1>
		<?php 
		if (!isset($userdata["loggedin"]) or !$userdata["loggedin"]) {
            echo '<ul></ul>';
			echo '<a href="login.php">Вход</a> 
			<a href="registration.php">Регистрация</a>';
		} else {
			echo '<ul><li><a href="secret-place.php">Registered Users Special</a></h2></li></ul>';
			echo '<span style="font-size: 1.5rem;">Welcome, '.$userdata['user_login'].'!</span>';
			echo '<form action="auth.php" method="post"><label><a>Выйти</a><input type="submit" name="submit" value=""></label></form>';
		}  
		?>
	</div>
</header>