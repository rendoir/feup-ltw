<?php
  /*
    This file is responsible for initializing the session and accessing/setting its properties
  */

  function initSession() {
    session_start();
    $_SESSION['username'] = NULL;
  }

  function setCurrentUser($username) {
    $_SESSION['username'] = $username;
  }

  function getCurrentUser() {
    return $_SESSION['username'];
  }

  initSession();
?>
