'use strict';

function encodeForAjax(data) {
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function createProjectHandler() {
  let create_project = document.getElementById("create_project");
  create_project.addEventListener("click", function(event) {
    let project_title_input = document.getElementById("create_project_title");
    let project_title = project_title_input.value;

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false) {
        let create_project_form = document.getElementById("create_project_form");
        create_project_form.style.display = "none";

        let project_ul = document.getElementById("project_list");
        let project_li = document.createElement("li");
        project_li.classList.add('project');
        project_li.innerHTML = project_title;
        project_ul.appendChild(project_li);
        clickProjectHandler(project_li);
      }
      project_title_input.value = '';
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

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false) {
        let create_todo_form = document.getElementById("create_todo_form");
        create_todo_form.style.display = "none";

        let todo_ul = document.getElementById("todo_list");
        let todo_li = document.createElement("li");
        todo_li.classList.add('todo');
        todo_li.innerHTML = todo_title;
        todo_ul.appendChild(todo_li);
      }
      todo_input.value = '';
    });

    let project_title = document.getElementById("selected_project").innerHTML;

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
    //TODO Change from "flex" to whatever you're using in css
    let create_todo_form = document.getElementById("create_todo_form");
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
  while (todo_ul.firstChild) {
      todo_ul.removeChild(todo_ul.firstChild);
  }
}

function clickProjectHandler(project_li) {
    project_li.addEventListener("click", function(event) {
      updateSelected(project_li);

      let project_title = project_li.innerHTML;
      let request = new XMLHttpRequest();

    request.addEventListener('load', function(event) {
      let todo_array = JSON.parse(this.responseText);
      let todo_ul = document.getElementById("todo_list");

      clearCurrentTodo();

      if(todo_array !== null) {
        for(let i = 0; i < todo_array.length; i++) {
          let todo_li = document.createElement("li");
          todo_li.classList.add('todo');
          todo_li.innerHTML = todo_array[i].title;
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
