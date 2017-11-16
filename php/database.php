<?php
  class DataBase {
    private db;

    public function __constructor($path) {
      $this->db = new PDO($path);
    }
  }
?>
