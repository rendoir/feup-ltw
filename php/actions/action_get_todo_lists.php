<?php
  include_once('../session.php');
  include_once('../database.php');

  $project = $_POST["project"];

  if($project !== null)
    echo json_encode(DataBase::getToDoListsOfProject($project));
  else echo json_encode(null);

?>
