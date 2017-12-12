<?php
  include_once('../session.php');
  include_once('../database.php');

  if(isset($_POST['username']) &&
     isset($_POST['password'])) {
       $username = $_POST['username'];
       $password = $_POST['password'];
       if (DataBase::checkLogin($username, $password)) {
         Session::setCurrentUser($username);
         echo json_encode(true);
       } else echo json_encode(false);
  } else echo json_encode(false);

?>
