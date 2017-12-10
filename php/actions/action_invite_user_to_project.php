<?php
  include_once('../session.php');
  include_once('../database.php');

  $user = $_POST["user"];
  $project = $_POST["project"];

  if($user !== null && $project !== null)
    echo json_encode(DataBase::inviteUserToProject($user, $project));
  else echo json_encode(false);

?>
