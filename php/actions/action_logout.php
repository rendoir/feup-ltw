<?php
  include_once('../session.php');
  Session::destroySession();
  header('Location: ../../index.php');
  exit();
?>
