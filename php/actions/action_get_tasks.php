<?php
  include_once('../session.php');
  include_once('../database.php');

  $project = $_POST["project"];
  $todo = $_POST["todo"];

  if($project !== null && $todo !== null)
    echo json_encode(DataBase::getListItemsOfList($project, $todo));
  else echo json_encode(null);

?>
