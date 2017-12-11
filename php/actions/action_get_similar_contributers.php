<?php
  include_once('../session.php');
  include_once('../database.php');

  $input = $_POST["input"];
  $project = $_POST["project"];

  if($input !== null && $project !== null)
    echo json_encode(DataBase::getSimilarUsersInProject($input, $project));
  else echo json_encode(false);

?>
