<?php
  include_once('../session.php');
  include_once('../database.php');

  $project = $_POST["project"];

  if($project !== null)
    echo json_encode(DataBase::addProject($project, $user));
  else echo json_encode(null);

?>
