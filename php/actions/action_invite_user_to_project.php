<?php
  include_once('../session.php');
  include_once('../database.php');

  $current_user = Session::getCurrentUser();
  $user = $_POST["user"];
  $project = $_POST["project"];

  if($user !== null && $project !== null && $current_user !== null)
    if(DataBase::isProjectManager($current_user, $project) &&
       !DataBase::userContributesToProject($user, $project) &&
       DataBase::userHasNoPendingInvite($user, $project))
         echo json_encode(DataBase::inviteUserToProject($user, $project));
    else echo json_encode(false);
  else echo json_encode(false);

?>
