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
$invites = DataBase::getPendingInvites($user);

include_once('../html/header.html');

?>
<script src="../javascript/ui_profile.js" defer></script>

<body>
  <section id="form_section">
    <form id="profile_form"></form>
  </section>

  <section id= "form_section2">
    <form id="profile_form2">Profile Page</form>
  </section>
  <section id="profile_section_picture">
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

  </section><section id="profile_section">
    <div id="user_div">
      <span id="user_label"> </span>
      <span id="username"><?=$user?></span>
    </div>
    <div id="name_div">
      <span id="name_label">Name </span>
      <span id="name"><?=$name?></span>
    </div>
    <div id="email_div">
      <span id="email_label">Email </span>
      <span id="email"><?=$email?></span>
    </div>
    <div id="birth_div">
      <span id="birth_label"> Birth Date </span>
      <span id="birth"><?=$birth?></span>
    </div>
    <div id="invites_div">
      <?php
        if($invites !== false && count($invites) > 0) {
           ?> <span class="invite_label"> You were invited to join: </span>
              <ul id="invite_list"> <?php
          foreach ($invites as $invite) {
            ?> <li><span><?=$invite["project"]?></span></li> <?php
          }
          ?> </ul> <?php
        } else {
           ?> <span class="invite_label"> You have no invites to join projects! </span> <?php
        }
      ?>
    </div>
  </section>


</body>

<?php

include_once('../html/footer.html');

?>
