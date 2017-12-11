<?php
  include_once('../session.php');
  include_once('../database.php');

  $user = Session::getCurrentUser();

  if(isset($_POST["task"]) &&
     isset($_POST["datetime"]) &&
     isset($_POST["todo"]) &&
     isset($_POST["project"]) &&
     $user !== null) {
       $task = $_POST["task"];
       $due_date = $_POST["datetime"];
       $todo = $_POST["todo"];
       $project = $_POST["project"];
       if(DataBase::userContributesToProject($user, $project))
         echo json_encode(DataBase::addListItem($task, $due_date, $todo, $project));
       else echo json_encode(false);
  } else echo json_encode(false);

?>
