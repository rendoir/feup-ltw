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
$birth = date('d-m-Y', $user_info['birth_date']);
$image = $user_info['image'];

include_once('../html/header.html');

?>
<script src="../javascript/ui_profile.js" defer></script>

<body>
  <section id="profile_section">
    <span id="username"><?=$user?></span>
    <span id="name"><?=$name?></span>
    <span id="email"><?=$email?></span>
    <span id="birth_date"><?=$birth?></span>
<?php
  if($image !== null) {
    ?>
     <img id="image" src="../images/profiles/<?=$image?>" width="256" height="256">
    <?php
  } else {
  ?>
    <img id="image" src="../images/default.png" width="256" height="256">
  <?php
  }
  ?>
    <label for="change_image">Select Image</label>
    <input id="change_image" type="file" name="image">
  </section>
</body>

<?php

include_once('../html/footer.html');

?>
