<?php
  include_once('../session.php');
  include_once('../database.php');

  $user = Session::getCurrentUser();

  if(isset($_POST["project"]) &&
     isset($_POST["todo"]) &&
     isset($_POST["task"]) &&
     $user !== null) {
       $project = $_POST["project"];
       $todo = $_POST["todo"];
       $task = $_POST["task"];
       if(DataBase::userContributesToProject($user, $project))
         echo json_encode(DataBase::deleteTask($project, $todo, $task));
       else echo json_encode(false);
  } else echo json_encode(false);

?>
