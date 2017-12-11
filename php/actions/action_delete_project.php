<?php
  include_once('../session.php');
  include_once('../database.php');

  $user = Session::getCurrentUser();

  if(isset($_POST["project"]) &&
     $user !== null) {
      $project = $_POST["project"];
      if(DataBase::isProjectManager($user, $project))
        echo json_encode(DataBase::deleteProject($project));
      else echo json_encode(false);
  } else echo json_encode(false);

?>
