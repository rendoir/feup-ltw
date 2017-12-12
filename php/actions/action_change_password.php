<?php
  include_once('../session.php');
  include_once('../database.php');

  $user = Session::getCurrentUser();

  if(isset($_POST["old_password"]) &&
    isset($_POST["new_password"]) &&
    $user !== null) {
      $old_password = $_POST["old_password"];
      $new_password = $_POST["new_password"];
      echo json_encode(DataBase::changePassword($user, $old_password, $new_password));
  } else echo json_encode(false);

?>
