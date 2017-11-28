<?php
  include_once('../session.php');
  include_once('../database.php');

  //TODO Remove once register is working
  DataBase::addUser('timon', 'hakunamatata');

  if(!isset($_POST['username']) || !isset($_POST['password'])) {
    header('HTTP/1.0 403 Forbidden');
    exit();
  }

  if (DataBase::checkLogin($_POST['username'], $_POST['password'])) {
    Session::setCurrentUser($_POST['username']);
    header('Location: ../user.php');
    exit();
  } else {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    die("Invalid login");
  }


?>
