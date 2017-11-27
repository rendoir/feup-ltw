<?php
  include_once('../session.php');
  include_once('../database.php');

  $project = $_POST["project"];
  //TODO
  $user = "timon";

  echo json_encode(DataBase::addProject($project, $user));

?>
