<?php
  include_once('../session.php');
  include_once('../database.php');

  function saveImage($tmp_name, $path, $extension) {
    $image = null;
    switch ($extension) {
      case 'jpg':
      case 'jpeg':
        $image = imagecreatefromjpeg($tmp_name);
        $image = cropImageToSquare($image);
        imagejpeg($image, $path);
        break;
      case 'png':
        $image = imagecreatefrompng($tmp_name);
        $image = cropImageToSquare($image);
        imagepng($image, $path);
        break;
      case 'bmp':
        $image = imagecreatefrombmp($tmp_name);
        $image = cropImageToSquare($image);
        imagebmp($image, $path);
        break;
      default:
        break;
    }
  }

  function cropImageToSquare($image) {
    $width = imagesx($image);
    $height = imagesy($image);
    if($width == $height)
      return $image;
    if($width > $height) {
      $difference = $width - $height;
      return imagecrop($image, ['x' => $difference/2, 'y' => 0, 'width' => $height, 'height' => $height]);
    } else if($height > $width) {
      $difference = $height - $width;
      return imagecrop($image, ['x' => 0, 'y' => $difference/2, 'width' => $width, 'height' => $width]);
    }
  }

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
      saveImage($tmp_name, $path, $extension);
      echo json_encode($path);
    } else echo json_encode(false);
  }
?>
