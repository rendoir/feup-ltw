<?php
  include_once('../session.php');
  include_once('../database.php');

  $user = Session::getCurrentUser();

  if(isset($_POST["project"]) &&
     isset($_POST["answer"]) &&
     $user !== null) {
      $project = $_POST["project"];
      $answer = $_POST["answer"];
      echo json_encode(DataBase::answerInvite($user, $project, $answer));
  } else echo json_encode(false);

?>
