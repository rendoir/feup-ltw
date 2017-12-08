<?php
  include_once('../session.php');
  include_once('../database.php');

  if(!isset($_FILES["image"]))
    echo json_encode(false);
  else {
    $user = Session::getCurrentUser();
    $file_name = "../../images/profiles/$user.jpg";
    print_r($_FILES);
    move_uploaded_file($_FILES['image']['tmp_name'], $file_name);
    echo json_encode(DataBase::setProfileImage($user, $file_name));
  }
?>
