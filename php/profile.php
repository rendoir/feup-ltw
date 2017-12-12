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
  <h1 id="profile_form">Profile Page</h1>

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
  </section>


  <section id="profile_section">
    <span id="profile_user"><?=$user?></span>

    <label>Name </label>
    <span><?=$name?></label>

    <label>Email </span>
    <span><?=$email?></span>

    <label> Birth Date </label>
    <span><?=$birth?></span>

    <section id="change_password">
      <input id="change_password_button" type="button" value="Change Password">
      <form id="change_password_form" class="user_form">
        <label class="form_header">Change Password</label>
        <input id="old_password" type="password" placeholder="Old Password" required>
        <input id="new_password" type="password" placeholder="New Password" required>
        <input id="submit_password" type="submit" value="Change Password">
      </form>
    </section>

    <section id="invites_div">
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
    </section>
  </section>


</body>

<?php

include_once('../html/footer.html');

?>
