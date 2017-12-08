<?php
  include_once('../session.php');
  include_once('../database.php');

  if(!isset($_FILES["image"]))
    echo json_encode(false);
  else {
    $user = Session::getCurrentUser();
    $file_name = $user . '_' . $_FILES['image']['name'];
    $tmp_name = $_FILES['image']['tmp_name'];
    $path = "../../images/profiles/$file_name";
    move_uploaded_file($tmp_name, $path);
    if(DataBase::setProfileImage($user, $path)) {
      echo json_encode($tmp_name);
    } else echo json_encode(false);
  }
?>
