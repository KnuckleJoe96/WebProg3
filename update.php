<?php
try { 
  	$connection = new PDO('mysql:host=localhost; dbname=webprog3', 'root', ''); 


  	$mySQLInput = 'INSERT INTO notes (columnname,headline,description)
					VALUES ("'.$_POST['column'].'", "'.$_POST['title'].'", "'.$_POST['description'].'");';
  	if($connection->query($mySQLInput) === TRUE){
  		echo "Insert successful";
  	}

  	//var_dump($mySQLInput);
} catch (PDOException $e) { 
  	echo "Datenbankfehler.";
}





echo $_POST['column'].'|';

echo '<div id="workItem0" class="workItem" ondragstart="drag(event)" draggable="true">
		<h3>
			<span>'.$_POST['title'].'</span>
			<span class="iconSmall">
				<i onclick="clickEditWorkItem(this)" title="Aufgabe bearbeiten" aria-hidden="true" class="fa fa-pencil"></i>
			</span>
		</h3>
		<p>'.$_POST['description'].'</p>
		<div class="seperator"></div>
		<div id="workers">
			<h4>
				<span class="iconLeft">
					<i aria-hidden="true" class="fa fa-users"></i>
				</span>
				<span>Mitarbeiter:</span>
				<span class="iconSmall">
					<i onclick="clickAddWorker(this)" title="Mitarbeiter hinzufügen" aria-hidden="true" class="fa fa-plus-circle"></i>
				</span>
			</h4>
			<ul id="workersList"></ul>
		</div>
		<div class="seperator"></div>
		<div id="discussion">
			<h4>
				<span class="iconLeft">
					<i aria-hidden="true" class="fa fa-comments"></i>
				</span>
				<span>Diskussion:</span>
				<span class="iconSmall">
					<i onclick="clickExpandDiscussion(this)" title="Diskussion anzeigen" aria-hidden="true" class="fa fa-arrow-circle-o-down"></i>
				</span>
			</h4>
		<div id="addDiscussion" style="min-height: 20px; display: none;">
			<span class="iconSmall">
				<i onclick="clickAddComment(this)" title="Kommentar verfassen" aria-hidden="true" class="fa fa-commenting-o"></i>
			</span>
		</div>
		<ul style="display: none;" id="discussionList"></ul>
		</div>
	</div>';
	
?>