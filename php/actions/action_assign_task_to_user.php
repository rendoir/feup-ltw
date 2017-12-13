<?php
  include_once('../session.php');
  include_once('../database.php');

  $current_user = Session::getCurrentUser();

  if(isset($_POST["user"]) &&
     isset($_POST["project"]) &&
     isset($_POST["todo"]) &&
     isset($_POST["task"]) &&
     $current_user !== null) {
       $user = $_POST["user"];
       $project = $_POST["project"];
       $todo = $_POST["todo"];
       $task = $_POST["task"];
       if(DataBase::userContributesToProject($current_user, $project))
         if(DataBase::userContributesToProject($user, $project))
           if(DataBase::assignListItemToUser($project, $todo, $task, $user))
             echo json_encode(true);
           else echo json_encode("Couldn't assign task to user");
         else echo json_encode("The user doesn't contribute to this project");
       else echo json_encode("You don't contribute to this project");
  } else echo json_encode("Unknown error");

?>
