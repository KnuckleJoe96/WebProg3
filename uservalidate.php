<?php 
	//$_POST: Array mit überlieferten Daten des Formulars (automatisch generiert)

	//echo $_POST['username'];
	//echo $_POST['password'];
	//var_dump($_POST);
	
	if(!empty($_POST["username"]) && !empty($_POST["password"]) ){
		try { 
		  	$connection = new PDO('mysql:host=localhost; dbname=webprog3', 'root', ''); 


		  	$mySQLInput = 'SELECT * FROM `users` WHERE username="' . $_POST['username'] . '";';
		  	$searchresult = $connection->query($mySQLInput);

		  	$myPass = $searchresult->fetch();

		  	if($_POST['password'] == $myPass['password']){
		  		header("location:WebProg2/index.html");

		  	} else{
		  		echo "<script> console.log('Passwort leider falsch!'); </script>";
		  		header("location:WebProg3.html");
		  	}

		} catch (PDOException $e) { 
		  	echo "Datenbankfehler: Die Daten konnten nicht gelesen werden.";
		}

	} else{
		echo "Feld leer!";
	}
?>