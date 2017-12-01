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

function createListHandler() {
  let create_todo = document.getElementById("create_todo");
  create_todo.addEventListener("click", function(event) {
    let todo_input = document.getElementById("create_todo_title");
    let todo_title = todo_input.value;

    let selected_project = document.getElementById("selected_project");
    if(selected_project === null)
      return;
    let project_title = selected_project.getAttribute("data-project-title");

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false) {
        let create_todo_form = document.getElementById("create_todo_form");
        create_todo_form.style.display = "none";

        let todo_ul = document.getElementById("todo_list");
        //TODO Change this when we can input category and color
        let todo_li = createTodo({title: todo_title, category: "category", color: "color"});
        todo_ul.appendChild(todo_li);
      }
      todo_input.value = '';
    });

    request.open('POST', '../php/actions/action_add_todo_list.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title, todo_list: todo_title}));

    event.preventDefault();
    event.stopImmediatePropagation();
  });
}

function plusProjectHandler() {
  let plus_project = document.getElementById("plus_project");
  plus_project.addEventListener("click", function(event) {
    let create_project_form = document.getElementById("create_project_form");
    //TODO Change from "flex" to whatever you're using in css
    create_project_form.style.display = "flex";
    event.stopImmediatePropagation();
  });
}

function plusListHandler() {
  let plus_todo = document.getElementById("plus_todo");
  plus_todo.addEventListener("click", function(event) {
    let create_todo_form = document.getElementById("create_todo_form");
    //TODO Change from "flex" to whatever you're using in css
    create_todo_form.style.display = "flex";
    event.stopImmediatePropagation();
  });
}

function clickProjectsHandler() {
  let project_list = document.getElementById("project_list");
  for(let i = 0; i < project_list.children.length; i++) {
    clickProjectHandler(project_list.children[i]);
  }
}

function updateSelected(new_selected) {
  let last_selected = document.getElementById("selected_project");
  if(last_selected !== null)
    last_selected.id = "";
  new_selected.id = "selected_project";
}

function clearCurrentTodo() {
  let todo_ul = document.getElementById("todo_list");
  while (todo_ul.children.length != 0) {
      todo_ul.removeChild(todo_ul.firstChild);
  }
}

function clickProjectHandler(project_li) {
    project_li.addEventListener("click", function(event) {
      updateSelected(project_li);
      let plus_todo = document.getElementById("plus_todo");
      //TODO Change from "flex" to whatever you're using in css
      plus_todo.style.display = "flex";

      let project_title = project_li.getAttribute("data-project-title");
      let request = new XMLHttpRequest();

    request.addEventListener('load', function(event) {
      let todo_array = JSON.parse(this.responseText);
      let todo_ul = document.getElementById("todo_list");

      clearCurrentTodo();

      if(todo_array !== null) {
        for(let i = 0; i < todo_array.length; i++) {
          let todo_li = createTodo(todo_array[i]);
          todo_ul.appendChild(todo_li);
        }
      }
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
