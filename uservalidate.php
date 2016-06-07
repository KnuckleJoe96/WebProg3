<?php 
	//$_POST: Array mit überlieferten Daten des Formulars (automatisch generiert)

	echo $_POST['username'];
	echo $_POST['password'];
	var_dump($_POST);
	
	if($_POST != null){
		try { 
		  	$connection = new PDO('mysql:host=localhost; dbname=webprog3', 'root', ''); 

		  		

			foreach ($connection->query('SELECT * FROM `users`;') as $entry) { 
		      echo '<div class="username">'.$entry['username'].' schrieb:</div>';
		      echo '<div class="password">'.$entry['password'].'</div>';
		      echo '<hr />';
		  	} 

		} catch (PDOException $e) { 
		  	echo "Datenbankfehler: Die Daten konnten nicht gelesen werden.";
		}

	} else{
		echo "Nichts vorhanden!";
	}
?>