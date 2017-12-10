<?php
  include_once('../session.php');
  include_once('../database.php');

  $input = $_POST["input"];

  if($input !== null)
    echo json_encode(DataBase::getSimilarUsers($input));
  else echo json_encode(false);

?>
