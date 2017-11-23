<?php
  class DataBase {
    private $db;

    public function __construct($path) {
      phpinfo();
      ?>
      <p><?php echo 'sqlite:' . $path; ?></p>
      <?php
      $this->db = new PDO('sqlite:' . $path);
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
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
      $stmt = $this->db->prepare('INSERT INTO user (username, password)
                                  VALUES (?, ?)');
      $stmt->execute(array($name, $address));
    }
  }
?>
