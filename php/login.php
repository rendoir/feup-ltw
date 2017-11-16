<?php
include ('../html/header.html');
  if(isset($_POST["username"]) && isset($_POST["password"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];

    ?>
      <p><?php echo $username ?></p>
      <p><?php echo $password ?></p>
    <?php
    }
 include ('../html/footer.html');
?>
