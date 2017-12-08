<?php
  include_once('../session.php');
  include_once('../database.php');

  if(!isset($_FILES["image"]))
    echo json_encode(false);
  else {
    $user = Session::getCurrentUser();
    $file_name = $_FILES['image']['name'];
    $extension = pathinfo($file_name, PATHINFO_EXTENSION);
    $tmp_name = $_FILES['image']['tmp_name'];
    $path = "../../images/profiles/" . $user . '.' . $extension;
    $old_path = DataBase::getUserInfo($user)["image"];
    if(DataBase::setProfileImage($user, $path)) {
      if($old_path !== null)
        unlink($old_path);
      move_uploaded_file($tmp_name, $path);
      echo json_encode(true);
    } else echo json_encode(false);
  }
?>
