<?php
  include_once('../session.php');
  include_once('../database.php');

  $user = Session::getCurrentUser();
  $project = $_POST["project"];
  $answer = $_POST["answer"];

  if($user !== null && $project !== null && $answer !== null)
    echo json_encode(DataBase::answerInvite($user, $project, $answer));
  else echo json_encode(false);

?>
