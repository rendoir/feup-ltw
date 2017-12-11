<?php
  include_once('../session.php');
  include_once('../database.php');

  $user = Session::getCurrentUser();

  if(isset($_POST["task"]) &&
     isset($_POST["todo"]) &&
     isset($_POST["completed"]) &&
     isset($_POST["project"]) &&
     $user !== null) {
       $task = $_POST["task"];
       $todo = $_POST["todo"];
       $completed = $_POST["completed"];
       $project = $_POST["project"];
       if(DataBase::userContributesToProject($user, $project))
         echo json_encode(DataBase::setCompletedListItem($task, $todo, $project, intval($completed)));
       else echo json_encode(false);
  } else echo json_encode(false);

?>
