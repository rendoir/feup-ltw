<?php
  /*
    This file is responsible for initializing the session and accessing/setting its properties
  */
  define("ROOT", $_SERVER["DOCUMENT_ROOT"]);

  class Session {
    private static $init = FALSE;

    public static function initSession() {
      session_start();
      if(!self::$init) {
        $_SESSION['username'] = NULL;
        self::$init = TRUE;
      }
    }

    public static function setCurrentUser($username) {
      $_SESSION['username'] = $username;
    }

    public static function getCurrentUser() {
      return $_SESSION['username'];
    }

    public static function destroySession() {
      session_destroy();
      self::$init = false;
      session_start();
    }
  }

?>
