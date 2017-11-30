<?php
  include_once('../session.php');
  include_once('../database.php');

  $project = $_POST["project"];
  $todo_title = $_POST["todo_list"];

  if($project !== null && $todo_title !== null)
    echo json_encode(DataBase::addToDoList($todo_title, $project, "Category", "Color"));
  else echo json_encode(false);

?>
