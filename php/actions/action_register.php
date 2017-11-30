<?php
  include_once('../session.php');
  include_once('../database.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  if($username === null || $password === null) {
    header('HTTP/1.0 403 Forbidden');
    exit();
  }

  if (DataBase::checkLogin($username, $password)) {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    die("Username already in use!");
  } else if(DataBase::addUser($username, $password)) {
    Session::setCurrentUser($username);
    header('Location: ../user.php');
    exit();
  } else {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    die("Unknown error!");
  }

?>
