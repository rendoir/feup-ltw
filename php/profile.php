<?php

/*
  This file is responsible for displaying and editing a user's profile.
*/

include_once('session.php');
include_once('database.php');

$user = Session::getCurrentUser();

if($user === null) {
  Session::destroySession();
  header('Location: ../index.php');
  die("Unauthorized access!");
}

$user_info = DataBase::getUserInfo($user);
if($user_info === null)
  die("Unknown error!");
$email = $user_info['email'];
$name = $user_info['name'];
$birth = $user_info['birth_date'];
$image = $user_info['image'];

include_once('../html/header.html');

?>
<body>
  <section id="profile_section">
    <span id="username"><?=$user?></span>
    <span id="name"><?=$name?></span>
    <span id="email"><?=$email?></span>
    <span id="birth_date"><?=$birth?></span>
<?php
  if($image !== null) {
    ?>
     <img src="../images/profiles/<?=$image?>" width="256" height="256">
    <?php
  } else {
  ?>
    <img src="../images/default.png" width="256" height="256">
  <?php
  }
  ?>

  </section>
</body>

<?php

include_once('../html/footer.html');

?>
