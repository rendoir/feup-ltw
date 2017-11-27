<?php
  /*
    This file is responsible for initializing the session and accessing/setting its properties
  */

  class Session {
    private static $init = FALSE;

    public static function initSession() {
      if(!self::$init) {
        session_start();
        $_SESSION['username'] = NULL;
        define("ROOT", $_SERVER["DOCUMENT_ROOT"]);
        self::$init = TRUE;
      }
    }

    public static function setCurrentUser($username) {
      $_SESSION['username'] = $username;
    }

    public static function getCurrentUser() {
      return $_SESSION['username'];
    }

  }

  Session::initSession();
?>
