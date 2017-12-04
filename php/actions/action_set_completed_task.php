<?php
  include_once('../session.php');
  include_once('../database.php');

  $task = $_POST["task"];
  $todo = $_POST["todo"];
  $completed = $_POST["completed"];
  $project = $_POST["project"];

  if($task !== null && $todo !== null && $completed !== null && $project !== null)
    echo json_encode(DataBase::setCompletedListItem($task, $todo, $project, intval($completed)));
  else echo json_encode(false);

?>
