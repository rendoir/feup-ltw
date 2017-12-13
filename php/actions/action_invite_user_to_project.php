<?php
  include_once('../session.php');
  include_once('../database.php');

  $current_user = Session::getCurrentUser();

  if(isset($_POST["user"]) &&
     isset($_POST["project"]) &&
     $current_user !== null) {
       $user = $_POST["user"];
       $project = $_POST["project"];
       if(DataBase::isProjectManager($current_user, $project))
         if(!DataBase::userContributesToProject($user, $project))
           if(DataBase::userHasNoPendingInvite($user, $project))
            if(DataBase::inviteUserToProject($user, $project))
              echo json_encode(true);
            else echo json_encode("User doesn't exist");
           else echo json_encode("User has invites pending to this project");
         else echo json_encode("User already contributes to project");
       else echo json_encode("You are not the project manager");
  } else echo json_encode("Unknown error");

?>
