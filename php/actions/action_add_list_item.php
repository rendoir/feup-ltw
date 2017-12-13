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
       $due_date = intval($_POST["datetime"]);
       $todo = $_POST["todo"];
       $project = $_POST["project"];
       if(DataBase::userContributesToProject($user, $project))
         if(DataBase::addListItem($task, $due_date, $todo, $project))
            echo json_encode(true);
         else echo json_encode("This task already exists");
       else echo json_encode("You don't contribute to this project");
   } else echo json_encode("Unknown error");

?>
