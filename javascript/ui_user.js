'use strict';

function encodeForAjax(data) {
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

/*
  Creates a <li> node that defines a todo list
  @param todo - Todo object
  @return <li> todo node
*/
function createTodo(todo) {
  let todo_li = document.createElement("li");
  todo_li.classList.add('todo');

  let data_todo_title = document.createAttribute("data-todo-title");
  data_todo_title.value = todo.title;
  todo_li.setAttributeNode(data_todo_title);

  let data_todo_category = document.createAttribute("data-todo-category");
  data_todo_category.value = todo.category;
  todo_li.setAttributeNode(data_todo_category);

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

  let data_project_title = document.createAttribute("data-project-title");
  data_project_title.value = title;
  project_li.setAttributeNode(data_project_title);

  let data_project_manager = document.createAttribute("data-project-manager");
  data_project_manager.value = document.getElementById("current_user").getAttribute("data-username");
  project_li.setAttributeNode(data_project_manager);

  return project_li;
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
    let project_title = getProjectInput().title;

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

    event.preventDefault();
    event.stopImmediatePropagation();
  });
}

function getCreateTodoButton() {
  return document.getElementById("create_todo");
}

function getTodoInput() {
  let todo_title = document.getElementById("create_todo_title").value;
  //TODO Change this when we can input category and color
  let todo_category = "Category";
  let todo_color = "Color";
  let todo = { title: todo_title, category: todo_category, color: todo_color };
  return todo;
}

function resetTodoInput() {
  document.getElementById("create_todo_title").value = '';
}

function getSelectedProject() {
  return document.getElementById("selected_project");
}

function getProjectTitle(project) {
  return project.getAttribute("data-project-title");
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
    let todo_input = getTodoInput();

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
      }
      resetTodoInput();
    });

    request.open('POST', '../php/actions/action_add_todo_list.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title, todo_title: todo_input.title, todo_category: todo_input.category, todo_color: todo_input.color}));

    event.preventDefault();
    event.stopImmediatePropagation();
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

function updateSelected(new_selected) {
  let last_selected = getSelectedProject();
  if(last_selected !== null)
    last_selected.id = "";
  new_selected.id = "selected_project";
}

function clearCurrentTodo() {
  let todo_ul = getTodoList();
  while (todo_ul.children.length != 0)
    todo_ul.removeChild(todo_ul.firstChild);
}

function displayTodoPlus() {
  //TODO Change from "flex" to whatever you're using in css
  getTodoPlus().style.display = "flex";
}

function setCurrentTodo(todo_array) {
  let todo_ul = getTodoList();
  if(todo_array !== null) {
    for(let i = 0; i < todo_array.length; i++) {
      let todo_li = createTodo(todo_array[i]);
      todo_ul.appendChild(todo_li);
    }
  }
}

function clickProjectHandler(project_li) {
  project_li.addEventListener("click", function(event) {
    updateSelected(project_li);
    displayTodoPlus();
    let project_title = getProjectTitle(project_li);

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let todo_array = JSON.parse(this.responseText);
      clearCurrentTodo();
      setCurrentTodo(todo_array);
    });

    request.open('POST', '../php/actions/action_get_todo_lists.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title}));

    event.stopImmediatePropagation();
  });
}

function init() {
  plusProjectHandler();
  createProjectHandler();
  clickProjectsHandler();

  plusListHandler();
  createListHandler();
}

init();
