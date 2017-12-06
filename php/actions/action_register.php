<?php
  include_once('../session.php');
  include_once('../database.php');

  $username = $_POST['username'];
  $password = $_POST['password'];
  $email = strtolower($_POST['email']);
  $first_name = $_POST['first_name'];
  $last_name = $_POST['last_name'];

  function validUsername($username) {
    return preg_match ('/^[a-zA-Z][a-zA-Z0-9_\-]{1,30}[a-zA-Z0-9]$/', $username);
  }

  function validPassword($password) {
    $has_uppercase = preg_match('/[A-Z]/', $password);
    $has_lowercase = preg_match('/[a-z]/', $password);
    $has_number    = preg_match('/[0-9]/', $password);
    $valid_length  = strlen($password) >= 8 && strlen($password) <= 64;
    return $has_uppercase && $has_lowercase && $has_number && $valid_length;
  }

  function validEmail($email) {
    return preg_match ('/^[a-zA-Z][a-zA-Z0-9_]{1,30}[a-zA-Z0-9]@[a-zA-Z]{2,10}\.[a-zA-Z]{1,6}$/', $email);
  }

  function validName($first_name, $last_name) {
    $regex = '/^[A-Z][a-z]{2,20}$/';
    if(preg_match($regex, $first_name) && preg_match($regex, $last_name))
      return $first_name . " " . $last_name;
    return false;
  }

  if($username === null || $password === null || $email === null ||
    $first_name === null || $last_name === null) {
    header('HTTP/1.0 403 Forbidden');
    exit();
  }
  if(!validUsername($username)) {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    die("Invalid username!");
  }
  if(!validPassword($password)) {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    die("Invalid password!");
  }
  if(!validEmail($email)) {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    die("Invalid email!");
  }
  if (DataBase::checkLogin($username, $password)) {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    die("Username already in use!");
  }
  $name = validName($first_name, $last_name);
  if(!$name) {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    die("Invalid Name!");
  }
  if(DataBase::addUser($username, $password, $email, $name)) {
    Session::setCurrentUser($username);
    header('Location: ../user.php');
    exit();
  }
  header('Location: ' . $_SERVER['HTTP_REFERER']);
  die("Unknown error!");

?>
