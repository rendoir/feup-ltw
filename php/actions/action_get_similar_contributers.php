<?php
  include_once('../session.php');
  include_once('../database.php');

  $user = Session::getCurrentUser();

  if(isset($_POST["input"]) &&
     isset($_POST["project"]) &&
     $user !== null) {
      $input = $_POST["input"];
      $project = $_POST["project"];
      if(DataBase::userContributesToProject($user, $project))
        echo json_encode(DataBase::getSimilarUsersInProject($input, $project));
      else echo json_encode(false);
  } else echo json_encode(false);

?>
