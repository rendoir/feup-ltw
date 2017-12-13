<?php
  /*
    This file is responsible for initializing the session and accessing/setting its properties
  */
  define("ROOT", $_SERVER["DOCUMENT_ROOT"]);

  class Session {

    public static function initSession() {
      session_start();
    }

    public static function setCurrentUser($username) {
      $_SESSION['username'] = $username;
    }


    public static function getCurrentUser() {
      if(!isset($_SESSION['username']))
        return NULL;
      return $_SESSION['username'];
    }

    public static function destroySession() {
      session_destroy();
      session_start();
      $_SESSION['username'] = NULL;
    }

  }

  Session::initSession();

?>
