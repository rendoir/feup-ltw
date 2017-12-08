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
    $old_path = DataBase::getUserInfo($user)["image"];
    if(DataBase::setProfileImage($user, $path)) {
      if($old_path !== null)
        unlink($old_path);
      move_uploaded_file($tmp_name, $path);
      echo json_encode(true);
    } else echo json_encode(false);
  }
?>
