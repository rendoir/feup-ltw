<?php
  include_once('../session.php');
  include_once('../database.php');

  $current_user = Session::getCurrentUser();
  $user = $_POST["user"];
  $project = $_POST["project"];
  $todo = $_POST["todo"];
  $task = $_POST["task"];

  if($user !== null && $project !== null && $current_user !== null && $todo !== null && $task !== null)
    if(DataBase::userContributesToProject($current_user, $project) &&
       DataBase::userContributesToProject($user, $project))
         echo json_encode(DataBase::assignListItemToUser($project, $todo, $task, $user));
    else echo json_encode(false);
  else echo json_encode(false);

?>
