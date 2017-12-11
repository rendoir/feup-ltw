<?php
  include_once('../session.php');
  include_once('../database.php');

  $user = Session::getCurrentUser();

  if(isset($_POST["project"]) &&
     isset($_POST["todo_title"]) &&
     isset($_POST["todo_category"]) &&
     isset($_POST["todo_color"]) &&
     $user !== null) {
       $project = $_POST["project"];
       $todo_title = $_POST["todo_title"];
       $todo_category = $_POST["todo_category"];
       $todo_color = $_POST["todo_color"];
       if(DataBase::userContributesToProject($user, $project))
         echo json_encode(DataBase::addToDoList($todo_title, $project, $todo_category, $todo_color));
       else echo json_encode(false);
  }  else echo json_encode(false);

?>
