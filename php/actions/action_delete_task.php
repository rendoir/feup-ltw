<?php
  include_once('../session.php');
  include_once('../database.php');

  $project = $_POST["project"];
  $todo    = $_POST["todo"];
  $task    = $_POST["task"];

  if($project !== null && $todo !== null && $task !== null)
    echo json_encode(DataBase::deleteTask($project, $todo, $task));
  else echo json_encode(false);

?>
