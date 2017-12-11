<?php
  include_once('../session.php');
  include_once('../database.php');

  $user = Session::getCurrentUser();

  if(isset($_POST["project"]) &&
    $user !== null) {
      $project = $_POST["project"];
      echo json_encode(DataBase::addProject($project, $user));
  } else echo json_encode(false);

?>
