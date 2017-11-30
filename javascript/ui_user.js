'use strict';

function encodeForAjax(data) {
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function createProjectHandler() {
  let create_project = document.getElementById("create_project");
  create_project.addEventListener("click", function(event) {
    let project_input = document.getElementById("input_project_title");
    let project_title = project_input.value;

    let add_project_section = document.getElementById("add_project");
    add_project_section.style.display = "none";

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response != false) {
        let project_list = document.getElementById("project_list");
        let new_project_node = document.createElement("li");
        new_project_node.classList.add('project');
        new_project_node.innerHTML = project_title;
        project_list.appendChild(new_project_node);
        clickProjectHandler(new_project_node);
      }
      project_input.value = '';
    });

    request.open('POST', '../php/actions/action_add_project.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title}));
    event.preventDefault();
    event.stopPropagation();
  });
}

function plusHandler() {
  let plus = document.getElementById("plus");
  plus.addEventListener("click", function(event) {
    let add_project_section = document.getElementById("add_project");
    //TODO Change from "flex" to whatever you're using in css
    add_project_section.style.display = "flex";

    event.preventDefault();
    event.stopPropagation();
  });
}

function clickProjectsHandler() {
  let project_list = document.getElementById("project_list");

  for(let i = 0; i < project_list.children.length; i++) {
    clickProjectHandler(project_list.children[i]);
  }
}

function clickProjectHandler(project_html_node) {
    console.log("Added event handler to ", project_html_node.innerHTML);
    project_html_node.addEventListener("click", function(event) {
    let project_title = project_html_node.innerHTML;
    let request = new XMLHttpRequest();

    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      console.log(response);
      let todo_node = document.createElement("ul");
      todo_node.id = "todo_lists_list";
      if(response != null) {
        for(let i = 0; i < response.length; i++) {
          let todo = document.createElement("li");
          todo.classList.add('todolist');
          todo.innerHTML = response[i];
          todo_node.appendChild(todo);
        }
      }
      project_html_node.appendChild(todo_node);
    });

    request.open('POST', '../php/actions/action_get_todo_lists.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title}));

  });
}

function init() {
  plusHandler();
  createProjectHandler();
  clickProjectsHandler();
}

init();
