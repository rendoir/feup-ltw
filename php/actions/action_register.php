<?php
  include_once('../session.php');
  include_once('../database.php');

  if(isset($_POST["username"]) &&
     isset($_POST["username"]) &&
     isset($_POST["username"]) &&
     isset($_POST["username"]) &&
     isset($_POST["username"])) {
      $username = $_POST['username'];
      $password = $_POST['password'];
      $email = strtolower($_POST['email']);
      $name = $_POST['name'];
      $birth_date = strtotime($_POST['birth_date']);
      if(!DataBase::userExists($username)) {
        if(DataBase::addUser($username, $password, $email, $name, $birth_date)) {
          Session::setCurrentUser($username);
          echo json_encode(true);
        } else echo json_encode("error");
      } else echo json_encode("Username already in use");
  } else echo json_encode("error");

?>
