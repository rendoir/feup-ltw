<?php
  include_once('php/session.php');
  include_once('php/database.php');

  if(Session::getCurrentUser() !== null) {
    header('Location: php/user.php');
    exit();
  }
  include_once('html/index.html');
  include_once('html/footer.html');
?>
