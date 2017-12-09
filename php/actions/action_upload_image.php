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
        return true;
      case 'png':
        $image = imagecreatefrompng($tmp_name);
        $image = cropImageToSquare($image);
        imagepng($image, $path);
        return true;
      case 'bmp':
        $image = imagecreatefrombmp($tmp_name);
        $image = cropImageToSquare($image);
        imagebmp($image, $path);
        return true;
      default:
        return false;
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

  if(!isset($_FILES["image"]) || $_FILES["image"]["error"] !== 0)
    echo json_encode(false);
  else {
    $user = Session::getCurrentUser();
    $file_name = $_FILES['image']['name'];
    $extension = pathinfo($file_name, PATHINFO_EXTENSION);
    $tmp_name = $_FILES['image']['tmp_name'];
    $path = "../../images/profiles/" . $user . '.' . $extension;
    $old_path = DataBase::getUserInfo($user)["image"];
    if(saveImage($tmp_name, $path, $extension) &&
       DataBase::setProfileImage($user, $path)) {
         if($old_path !== null && $old_path !== $path)
           unlink($old_path);
         echo json_encode($path);
    } else echo json_encode(false);
  }
?>
