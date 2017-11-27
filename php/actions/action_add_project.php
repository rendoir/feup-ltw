<?php
  include_once('../database.php');
  include_once('../session.php');

  $project = $_POST['project'];
  //TODO
  //$user = getCurrentUser();
  $user = "timon";

  echo json_encode(DataBase::addProject($project, $user));

?>
