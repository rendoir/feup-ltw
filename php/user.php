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

include_once('../html/header.html');

function displayProjects($user) {
  ?>

  <header>
    <a href="profile.php" id="current_user" data-username="<?=$user?>"></a>
    <a href="actions/action_logout.php">Logout</a>
  </header>

   <section id="project_section">
     <ul id="project_list">
      <?php
        $projects = DataBase::getUserProjects($user);
        if($projects != FALSE) {
          foreach($projects as $project){
            ?>
             <li class="project" data-project-title="<?=$project['project']?>" data-project-manager="<?=$project['project_manager']?>"></li>
            <?php
          }
        }
      ?>
    </ul>
    <i id="plus_project" class="fa fa-plus-circle" aria-hidden="true"></i>
    <form id="create_project_form">
      <input type="text" id="create_project_title" placeholder="Project Title">
      <input type="submit" id="create_project" value="Create Project">
    </form>
   </section>

   <section id="todo_section">
     <ul id="todo_list"></ul>
     <i id="plus_todo" class="fa fa-plus-circle" aria-hidden="true"></i>
     <form id="create_todo_form">
       <input type="text" id="create_todo_title" placeholder="Todo Title">
       <input type="submit" id="create_todo" value="Create Todo List">
     </form>
   </section>
  <?php
}

displayProjects($user);

include_once('../html/footer.html');

?>
