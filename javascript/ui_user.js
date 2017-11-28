'use strict';

function encodeForAjax(data) {
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function addProjectHandler() {
  let add_project = document.getElementById("add_project");
  add_project.addEventListener("click", function(event) {
    //TODO get project title from user
    let project = "TEST_PROJECT";

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response != false) {
        let project_list = document.getElementById("project_list");
        let new_project_node = document.createElement("li");
        new_project_node.classList.add('project');
        new_project_node.innerHTML = project;
        project_list.appendChild(new_project_node);
      }
    });

    request.open('POST', '../php/actions/action_add_project.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project}));
    event.preventDefault();
    event.stopPropagation();
  });
}


function init() {
  addProjectHandler();
}

init();
