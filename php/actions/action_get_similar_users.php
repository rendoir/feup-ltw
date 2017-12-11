<?php
  include_once('../session.php');
  include_once('../database.php');

  $current_user = Session::getCurrentUser();

  if(isset($_POST["input"]) &&
     $current_user !== null) {
       $input = $_POST["input"];
       echo json_encode(DataBase::getSimilarUsers($input, $current_user));
  } else echo json_encode(false);

?>
