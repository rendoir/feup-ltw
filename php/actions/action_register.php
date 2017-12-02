<?php
  include_once('../session.php');
  include_once('../database.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  function validUsername($username) {
    return preg_match ('/^[a-zA-Z][a-zA-Z0-9_\-]{6,30}[a-zA-Z0-9]$/', $username);
  }

  function validPassword($password) {
    $has_uppercase = preg_match('/[A-Z]/', $password);
    $has_lowercase = preg_match('/[a-z]/', $password);
    $has_number    = preg_match('/[0-9]/', $password);
    $valid_length  = strlen($password) >= 8 && strlen($password) <= 64;
    return $has_uppercase && $has_lowercase && $has_number && $valid_length;
  }

  if($username === null || $password === null) {
    header('HTTP/1.0 403 Forbidden');
    exit();
  } else if(!validUsername($username)) {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    die("Invalid username!");
  } else if(!validPassword($password)) {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    die("Invalid password!");
  } if (DataBase::checkLogin($username, $password)) {
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
