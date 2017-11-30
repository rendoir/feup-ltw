<?php
  include_once('../session.php');
  include_once('../database.php');

  $project = $_POST["project"];

  //TODO Remove this when we can add a todo list
  DataBase::addToDoList("TITLE", $project, "CATEGORY", "COLOR");

  if($project !== null)
    echo json_encode(DataBase::getToDoListsOfProject($project));
  else echo json_encode(null);

?>
