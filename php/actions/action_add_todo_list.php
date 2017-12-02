<?php
  include_once('../session.php');
  include_once('../database.php');

  $project = $_POST["project"];
  $todo_title = $_POST["todo_title"];
  $todo_category = $_POST["todo_category"];
  $todo_color = $_POST["todo_color"];

  if($project !== null && $todo_title !== null && $todo_category !== null && $todo_color != null)
    echo json_encode(DataBase::addToDoList($todo_title, $project, $todo_category, $todo_color));
  else echo json_encode(false);

?>
