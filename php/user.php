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

  <header class="user_header">
    <a href="profile.php" id="current_user" data-username="<?=$user?>"></a>
    <a href="actions/action_logout.php">Logout</a>
  </header>

   <section id="project_section">
     <label id="project_label"> Projects </label>
     <ul id="project_list">
      <?php
        $projects = DataBase::getUserProjects($user);
        if($projects != FALSE) {
          foreach($projects as $project){
            ?>
             <li class="project" data-project-manager="<?=$project['project_manager']?>">
               <span class="project_title"><?=$project['project']?></span>
             </li>
            <?php
          }
        }
      ?>
    </ul>
    <i id="plus_project" class="fa fa-plus-circle" aria-hidden="true"></i>
    <label id="plus_project_label"> Add Project </label>
    <form id="create_project_form" class="user_form">
      <label id="new_project_label"> New Project </label>
      <input type="text" id="create_project_title" placeholder="Project Title" required autofocus>
      <input type="submit" id="create_project" value="Create Project">
    </form>
   </section>

   <section id="todo_section">
     <label id="todo_label" title="'s to-do lists"></label>
     <ul id="todo_list"></ul>
     <div id="add_todo">
       <i id="plus_todo" class="fa fa-plus-circle" aria-hidden="true"></i>
       <label id="plus_todo_label"> Add Todo List </label>
     </div>
     <form id="create_todo_form" class="user_form">
       <label id="new_project_label"> New Todo List </label>
       <input type="text" id="create_todo_title" placeholder="Todo Title" required autofocus>
       <select id="create_todo_category" name="Category" form="create_todo_form" required>Category
         <option value="Event">Event</option>
         <option value="Mission">Mission</option>
         <option value="Presentation">Presentation</option>
         <option value="Product Assembly">Product Assembly</option>
         <option value="Project">Project</option>
         <option value="Recipe">Recipe</option>
         <option value="Shopping">Shopping</option>
         <option value="Travelling">Travelling</option>
       </select>
       <div id=color_div>
         <label id="color_label"> Choose Color </label>
         <input type="color" id="create_todo_color" autofocus>
       </div>
       <input type="submit" id="create_todo" value="Create Todo List">
     </form>
   </section>

   <section id="task_section">
     <label id="task_label" title="'s tasks"></label>
     <ul id="task_list"></ul>
     <div id="add_task">
       <i id="plus_task" class="fa fa-plus-circle" aria-hidden="true"></i>
       <label id="plus_task_label"> Add Task </label>
     </div>
     <form id="create_task_form" class="user_form">
       <label id="new_task_label">New Task</label>
       <input type="text" id="create_task_text" placeholder="Task" required autofocus>
       <input type="date" id="create_task_date" required>
       <input type="time" id="create_task_time" required>
       <input type="submit" id="create_task" value="Create Task">
     </form>
   </section>
  <?php
}

displayProjects($user);

include_once('../html/footer.html');

?>
