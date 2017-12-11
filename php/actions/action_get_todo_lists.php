<?php
  include_once('../session.php');
  include_once('../database.php');

  $user = Session::getCurrentUser();

  if(isset($_POST["project"]) &&
     $user !== null) {
       $project = $_POST["project"];
       if(DataBase::userContributesToProject($user, $project))
         echo json_encode(DataBase::getToDoListsOfProject($project));
       else echo json_encode(null);
  } else echo json_encode(null);

?>
