<?php
include_once('../database.php');
include_once('../session.php');

  if (DataBase::checkLogin($_POST['username'], $_POST['password'])) {
    setCurrentUser($_POST['username']);
  }

?>
