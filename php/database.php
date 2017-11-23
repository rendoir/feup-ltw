<?php
  class DataBase {
    private $db;

    public function __constructor($path) {
      $this->db = new PDO($path);
    }

    public function checkLogin($username, $password) {
      $stmt = $this->db->prepare('SELECT *
                                  FROM user
                                  WHERE username = ? AND password = ?');
      $stmt->execute(array($username, $password));
      $user = $stmt->fetch();
      print_r($user);
    }

    public function addUser($username, $password) {

    }
  }
?>
