<?php
  include_once('../session.php');
  include_once('../database.php');

  $user = Session::getCurrentUser();

  if(isset($_POST["project"]) &&
     isset($_POST["todo"]) &&
     $user !== null) {
       $project = $_POST["project"];
       $todo = $_POST["todo"];
       if(DataBase::userContributesToProject($user, $project))
         echo json_encode(DataBase::getListItemsOfList($project, $todo));
       else echo json_encode(null);
  } else echo json_encode(null);

?>
