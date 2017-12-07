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

include_once('../html/header.html');

?>
<body>
  <section id="profile_section">
    <a id="username"><?php echo $user ?> </a>
    <a id="name"><?php echo $name ?> </a>
    <a id="email"><?php echo $email ?> </a>
    <a id="birth_date"><?php echo $birth ?> </a>
  </section>
</body>

<?php

include_once('../html/footer.html');

?>
