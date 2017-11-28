<?php

/*
  This file generates the page to which the user is redirected to after logging in.
  It's responsible for displaying projects, lists and list items, as well as creating new ones and editing them.
*/

include_once('session.php');
include_once('database.php');

$user = Session::getCurrentUser();

if($user == NULL) {
  Session::destroySession();
  header('Location: ../index.php');
  die("Unauthorized access!");
}


//TODO remove this hardcoded when we have buttons!!!
/*DataBase::addUser("timon", "hakunamatata");
DataBase::addProject("LTW", "timon");
DataBase::addProject("RCOM", "timon");*/


include_once('../html/header.html');

function displayProjects($user) {
  ?>
  <a href="actions/action_logout.php">Logout</a>

   <section id="projects">
     <ul id="project_list">
      <?php
        $projects = DataBase::getUserProjects($user);
        if($projects != FALSE) {
          foreach($projects as $project){
            ?>
             <li class="project"><?=$project['project']?></li>
            <?php
          }
        }
      ?>
    </ul>
    <i id="add_project" class="fa fa-plus-circle" aria-hidden="true" style="font-size: 2em"></i>
    <!-- <i id="remove_project" class="fa fa-trash" aria-hidden="true" style="font-size: 2em"></i> -->
   </section>
  <?php
}

displayProjects($user);

include_once('../html/footer.html');

?>
