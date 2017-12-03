<?php
  include_once('../session.php');
  include_once('../database.php');

  $task = $_POST["task"];
  $due_date = $_POST["datetime"];
  $todo = $_POST["todo"];
  $project = $_POST["project"];

  if($task !== null && $due_date !== null && $todo !== null && $project !== null)
    echo json_encode(DataBase::addListItem($task, $due_date, $todo, $project));
  else echo json_encode(false);

?>
