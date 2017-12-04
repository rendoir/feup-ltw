'use strict';

const MAX_TITLE_LENGTH = 32;
const MAX_TASK_LENGTH = 128;

function encodeForAjax(data) {
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function validText(text, max_length = MAX_TITLE_LENGTH) {
  let regular_expression = new RegExp("^[a-zA-Z][a-zA-Z0-9_\\-\\ ]{1," + max_length + "}[a-zA-Z0-9]$");
  return regular_expression.test(text);
}

/*
  Creates a <li> node that defines a todo list
  @param todo - Todo object
  @return <li> todo node
*/
function createTodo(todo) {
  let todo_li = document.createElement("li");
  todo_li.classList.add('todo');

  let todo_title_span = document.createElement("span");
  todo_title_span.classList.add('todo_title');
  todo_title_span.innerHTML = todo.title;
  todo_li.appendChild(todo_title_span);

  let todo_category_span = document.createElement("span");
  todo_category_span.classList.add('todo_category');
  todo_category_span.innerHTML = todo.category;
  todo_li.appendChild(todo_category_span);

  let data_todo_color = document.createAttribute("data-todo-color");
  data_todo_color.value = todo.color;
  todo_li.setAttributeNode(data_todo_color);

  return todo_li;
}

/*
  Creates a <li> node that defines a project
  @param title - Title of the project
  @return <li> project node
*/
function createProject(title) {
  let project_li = document.createElement("li");
  project_li.classList.add('project');

  let project_title_span = document.createElement("span");
  project_title_span.classList.add('project_title');
  project_title_span.innerHTML = title;
  project_li.appendChild(project_title_span);

  let data_project_manager = document.createAttribute("data-project-manager");
  data_project_manager.value = document.getElementById("current_user").getAttribute("data-username");
  project_li.setAttributeNode(data_project_manager);

  return project_li;
}

function createTask(task) {
  let task_li = document.createElement("li");
  task_li.classList.add('task');

  let task_span = document.createElement("span");
  task_span.classList.add('task_task');
  task_span.innerHTML = task.task;
  task_li.appendChild(task_span);

  let date_span = document.createElement("span");
  date_span.classList.add('task_date');
  date_span.innerHTML = task.due_date;
  task_li.appendChild(date_span);

  let user_span = document.createElement("span");
  user_span.classList.add('task_user');
  user_span.innerHTML = task.user;
  task_li.appendChild(user_span);

  let data_task_completed = document.createAttribute("data-task-completed");
  data_task_completed.value = ((task.is_completed === 0) ? "false" : "true");
  task_li.setAttributeNode(data_task_completed);

  return task_li;
}

function getTodoTitle(todo) {
  return todo.firstElementChild.innerHTML;
}

function getCreateProjectButton() {
  return document.getElementById("create_project");
}

function getProjectInput() {
  let project_title = document.getElementById("create_project_title").value;
  let project = { title: project_title };
  return project;
}

function resetProjectInput() {
  document.getElementById("create_project_title").value = '';
}

function hideCreateProjectForm() {
  document.getElementById("create_project_form").style.display = "none";
}

function getProjectList() {
  return document.getElementById("project_list");
}

function createProjectHandler() {
  let create_project = getCreateProjectButton();
  create_project.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    let project_title = getProjectInput().title;
    if(!validText(project_title)) {
      resetProjectInput();
      return;
    }

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false) {
        hideCreateProjectForm();
        let project_ul = getProjectList();
        let project_li = createProject(project_title);
        project_ul.appendChild(project_li);
        clickProjectHandler(project_li);
      }
      resetProjectInput();
    });

    request.open('POST', '../php/actions/action_add_project.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title}));
  });
}

function getCreateTodoButton() {
  return document.getElementById("create_todo");
}

function getTodoInput() {
  let todo_title = document.getElementById("create_todo_title").value;
  let todo_category = document.getElementById("create_todo_category").value;
  let todo_color = document.getElementById("create_todo_color").value;
  let todo = { title: todo_title, category: todo_category, color: todo_color };
  return todo;
}

function resetTodoInput() {
  document.getElementById("create_todo_title").value = '';
}

function resetTaskInput() {
  document.getElementById("create_task_text").value = '';
  document.getElementById("create_task_date").value = '';
  document.getElementById("create_task_time").value = '';
}

function getSelectedProject() {
  return document.getElementById("selected_project");
}

function getProjectTitle(project) {
  return project.firstElementChild.innerHTML;
}

function hideCreateTodoForm() {
  document.getElementById("create_todo_form").style.display = "none";
}

function getTodoList() {
  return document.getElementById("todo_list");
}

function createListHandler() {
  let create_todo = getCreateTodoButton();
  create_todo.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    let todo_input = getTodoInput();
    if(!validText(todo_input.title)) {
      resetTodoInput();
      return;
    }

    let selected_project = getSelectedProject();
    if(selected_project === null)
      return;
    let project_title = getProjectTitle(selected_project);

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false) {
        hideCreateTodoForm();
        let todo_ul = getTodoList();
        let todo_li = createTodo(todo_input);
        todo_ul.appendChild(todo_li);
        clickTodoHandler(todo_li);
      }
      resetTodoInput();
    });

    request.open('POST', '../php/actions/action_add_todo_list.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title, todo_title: todo_input.title, todo_category: todo_input.category, todo_color: todo_input.color}));
  });
}

function displayCreateProjectForm() {
  document.getElementById("create_project_form").style.display = "block";
}

function getProjectPlus() {
  return document.getElementById("plus_project");
}

function plusProjectHandler() {
  let plus = getProjectPlus();
  plus.addEventListener("click", function(event) {
    displayCreateProjectForm();
    event.stopImmediatePropagation();
  });
}

function displayCreateTodoForm() {
  document.getElementById("create_todo_form").style.display = "block";
}

function getTodoPlus() {
  return document.getElementById("plus_todo");
}

function plusListHandler() {
  let plus = getTodoPlus();
  plus.addEventListener("click", function(event) {
    displayCreateTodoForm();
    event.stopImmediatePropagation();
  });
}

function clickProjectsHandler() {
  let project_list = getProjectList();
  for(let i = 0; i < project_list.children.length; i++)
    clickProjectHandler(project_list.children[i]);
}

function updateSelectedProject(new_selected) {
  let last_selected = getSelectedProject();
  if(last_selected !== null)
    last_selected.id = "";
  new_selected.id = "selected_project";
}

function clearCurrentTodo() {
  let todo_ul = getTodoList();
  while (todo_ul.children.length != 0)
    todo_ul.removeChild(todo_ul.firstElementChild);
}

function clearCurrentTasks() {
  let task_ul = getTaskList();
  while (task_ul.children.length != 0)
    task_ul.removeChild(task_ul.firstElementChild);
}

function displayTodoPlus() {
  //TODO Change from "flex" to whatever you're using in css
  getTodoPlus().style.display = "flex";
}

function displayTodoList() {
  getTodoList().style.display = "block";
}

function setCurrentTodo(todo_array) {
  let todo_ul = getTodoList();
  if(todo_array !== null) {
    for(let i = 0; i < todo_array.length; i++) {
      let todo_li = createTodo(todo_array[i]);
      todo_ul.appendChild(todo_li);
      clickTodoHandler(todo_li);
    }
  }
}

function clickProjectHandler(project_li) {
  project_li.firstElementChild.addEventListener("click", function(event) {
    updateSelectedProject(project_li);
    let project_title = getProjectTitle(project_li);

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let todo_array = JSON.parse(this.responseText);
      clearCurrentTodo();
      hideTaskSection();
      hideTodoSection();
      setCurrentTodo(todo_array);
      displayTodoList();
      displayTodoPlus();
    });

    request.open('POST', '../php/actions/action_get_todo_lists.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title}));

    event.stopImmediatePropagation();
  });
}

function getSelectedTodo() {
  return document.getElementById("selected_todo");
}

function updateSelectedTodo(new_selected) {
  let last_selected = getSelectedTodo();
  if(last_selected !== null)
    last_selected.id = "";
  new_selected.id = "selected_todo";
}

function hideTodoSection() {
  getTodoList().style.display = "none";
  getTodoPlus().style.display = "none";
}

function hideTaskSection() {
  getTaskList().style.display = "none";
  getTaskPlus().style.display = "none";
}

function getTasksList() {
  return document.getElementById("task_list");
}

function setTaskList(tasks_array) {
  let task_ul = getTasksList();
  if(tasks_array !== null) {
    for(let i = 0; i < tasks_array.length; i++) {
      let task_li = createTask(tasks_array[i]);
      task_ul.appendChild(task_li);
    }
  }
}

function plusTaskHandler() {
  let plus = getTaskPlus();
  plus.addEventListener("click", function(event) {
    displayCreateTaskForm();
    event.stopImmediatePropagation();
  });
}

function getTaskPlus() {
  return document.getElementById("plus_task");
}

function displayCreateTaskForm() {
  document.getElementById("create_task_form").style.display = "block";
}

function displayPlusTask() {
  //TODO Change from "flex" to whatever you're using in css
  getTaskPlus().style.display = "flex";
}

function displayTaskList() {
  getTaskList().style.display = "block";
}

function clickTodoHandler(todo_li) {
  todo_li.firstElementChild.addEventListener("click", function(event) {
    updateSelectedTodo(todo_li);
    let project_title = getProjectTitle(getSelectedProject());
    let todo_title = getTodoTitle(getSelectedTodo());

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let tasks_array = JSON.parse(this.responseText);
      hideTodoSection();
      clearCurrentTasks();
      setTaskList(tasks_array);
      displayTaskList();
      displayPlusTask();
    });

    request.open('POST', '../php/actions/action_get_tasks.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title, todo: todo_title}));

    event.stopImmediatePropagation();
  });
}

function getCreateTaskButton() {
  return document.getElementById("create_task");
}

function getTaskInput() {
  let task_text = document.getElementById("create_task_text").value;
  let task_date = document.getElementById("create_task_date").value;
  let task_time = document.getElementById("create_task_time").value;
  let task_datetime = task_date + task_time;
  let task = { task: task_text, due_date: task_datetime, is_completed: 0, user: "" };
  return task;
}

function hideCreateTaskForm() {
  return document.getElementById("create_task_form").style.display = "none";
}

function getTaskList() {
  return document.getElementById("task_list");
}

function createTaskHandler() {
  let create_task = getCreateTaskButton();
  create_task.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    let project_title = getProjectTitle(getSelectedProject());
    let todo_title = getTodoTitle(getSelectedTodo());
    let task_input = getTaskInput();

    if(!validText(task_input.task_text, MAX_TASK_LENGTH)) {
      resetTaskInput();
      return;
    }

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false) {
        hideCreateTaskForm();
        let task_ul = getTaskList();
        let task_li = createTask(task_input);
        task_ul.appendChild(task_li);
      }
      resetTaskInput();
    });

    request.open('POST', '../php/actions/action_add_list_item.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title, todo: todo_title, task: task_input.task, datetime: task_input.due_date}));
  });
}

function init() {
  plusProjectHandler();
  createProjectHandler();
  clickProjectsHandler();

  plusListHandler();
  createListHandler();

  plusTaskHandler();
  createTaskHandler();
}

init();
