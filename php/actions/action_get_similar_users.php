<?php
  include_once('../session.php');
  include_once('../database.php');

  $input = $_POST["input"];
  $current_user = Session::getCurrentUser();

  if($input !== null && $current_user !== null)
    echo json_encode(DataBase::getSimilarUsers($input, $current_user));
  else echo json_encode(false);

?>
