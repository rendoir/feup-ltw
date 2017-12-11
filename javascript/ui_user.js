'use strict';

const MAX_TITLE_LENGTH = 32;
const MAX_TASK_LENGTH = 128;

const TRASH = '<i class="fa fa-trash" aria-hidden="true"></i>';
const EMPTY_CHECKBOX = '<i class="fa fa-square-o" aria-hidden="true"></i>';
const CHECKED_CHECKBOX = '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
const TODO = '<i class="fa fa-list-ul" aria-hidden="true"></i>';
const TASK = '<i class="fa fa-tasks" aria-hidden="true"></i>';
const USER = '<i class="fa fa-user" aria-hidden="true"></i>';
const CANCEL = '<i class="fa fa-times" aria-hidden="true"></i>';

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
  date_span.innerHTML = task.due_date.substr(0, 10);
  task_li.appendChild(date_span);

  let time_span = document.createElement("span");
  time_span.classList.add('task_time');
  time_span.innerHTML = task.due_date.substr(10);
  task_li.appendChild(time_span);

  let assign_user = document.createElement("i");
  task_li.appendChild(assign_user);
  assign_user.outerHTML = USER;

  let user_span = document.createElement("span");
  user_span.classList.add('task_user');
  user_span.innerHTML = task.user;
  task_li.appendChild(user_span);

  let completed_checkbox = document.createElement("input");
  completed_checkbox.classList.add('task_checkbox');
  completed_checkbox.type = "checkbox";
  completed_checkbox.checked = ((task.is_completed == 0) ? false : true);
  task_li.appendChild(completed_checkbox);

  return task_li;
}

function attachTrashProject(project_li) {
  let trash = document.createElement("i");
  project_li.appendChild(trash);
  trash.outerHTML = TRASH;
  clickTrashProject(project_li);
}

function deleteProject(project_li) {
  project_li.parentElement.removeChild(project_li);
}

function getTrash(li) {
  return li.getElementsByClassName("fa-trash")[0];
}

function clickTrashProject(project_li) {
  getTrash(project_li).addEventListener("click", function(event) {
    let project_title = getProjectTitle(project_li);
    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false) {
        if(project_title === getProjectTitle(getSelectedProject())) {
          updateSelectedProject("");
          clearCurrentTodo();
          clearCurrentTasks();
          hideTaskSection();
          hideTodoSection();
        }
        deleteProject(project_li);
      }
    });
    request.open('POST', '../php/actions/action_delete_project.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title}));
    event.stopImmediatePropagation();
  });
}

function attachTrashTodo(todo_li) {
  let trash = document.createElement("i");
  todo_li.appendChild(trash);
  trash.outerHTML = TRASH;
  clickTrashTodo(todo_li);
}

function deleteTodo(todo_li) {
  todo_li.parentElement.removeChild(todo_li);
}

function clickTrashTodo(todo_li) {
  getTrash(todo_li).addEventListener("click", function(event) {
    let project_title = getProjectTitle(getSelectedProject());
    let todo_title = getTodoTitle(todo_li);
    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false) {
        if(todo_title === getTodoTitle(getSelectedTodo())) {
          updateSelectedTodo("");
          clearCurrentTasks();
          hideTaskSection();
        }
        deleteTodo(todo_li);
      }
    });
    request.open('POST', '../php/actions/action_delete_todo.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title, todo: todo_title}));
    event.stopImmediatePropagation();
  });
}

function attachTrashTask(task_li) {
  let trash = document.createElement("i");
  task_li.appendChild(trash);
  trash.outerHTML = TRASH;
  clickTrashTask(task_li);
}

function deleteTask(task_li) {
  task_li.parentElement.removeChild(task_li);
}

function clickTrashTask(task_li) {
  getTrash(task_li).addEventListener("click", function(event) {
    let project_title = getProjectTitle(getSelectedProject());
    let todo_title = getTodoTitle(getSelectedTodo());
    let task = getTask(task_li);
    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false) {
        deleteTask(task_li);
      }
    });
    request.open('POST', '../php/actions/action_delete_task.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title, todo: todo_title, task: task}));
    event.stopImmediatePropagation();
  });
}

function getTodoTitle(todo) {
  if(todo !== null)
    return todo.firstElementChild.innerHTML;
  return "";
}

function getTask(task) {
  return task.firstElementChild.innerHTML;
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

function getProjectForm() {
  return document.getElementById("create_project_form");
}

function hideCreateProjectForm() {
  getProjectForm().style.display = "none";
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
        attachTrashProject(project_li);
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
  if(project !== null)
    return project.firstElementChild.innerHTML;
  return "";
}

function getTodoForm() {
  return document.getElementById("create_todo_form");
}

function hideCreateTodoForm() {
  getTodoForm().style.display = "none";
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
        attachTrashTodo(todo_li);
      }
      resetTodoInput();
    });

    request.open('POST', '../php/actions/action_add_todo_list.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title, todo_title: todo_input.title, todo_category: todo_input.category, todo_color: todo_input.color}));
  });
}

function displayCreateProjectForm() {
  getProjectForm().style.display = "flex";
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
  getTodoForm().style.display = "flex";
}

function getTodoPlus() {
  return document.getElementById("plus_todo");
}

function getTodoPlusLabel() {
  return document.getElementById("plus_todo_label");
}

function getTodoLabel() {
  return document.getElementById("todo_label");
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
  for(let i = 0; i < project_list.children.length; i++) {
    clickProjectHandler(project_list.children[i]);
    attachTrashProject(project_list.children[i]);
  }
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

function displayTodoSection() {
  getTodoSection().style.display = "block";
  displayTodoLabel();
  getTodoList().style.display = "grid";
  getTodoPlus().style.display = "flex";
  getTodoPlusLabel().style.display = "flex";
  getInvitation().style.display = "flex";
}

function getInvitation() {
  return document.getElementById("invitation");
}

function displayProjectTitle(project) {
  getProjectTitle(project).style.display = "flex";
}

function displayTodoLabel() {
  let label = getTodoLabel();
  label.style.display = "block";
  label.innerHTML = getProjectTitle(getSelectedProject()) + label.title;
}

function setCurrentTodo(todo_array) {
  let todo_ul = getTodoList();
  if(todo_array !== null) {
    for(let i = 0; i < todo_array.length; i++) {
      let todo_li = createTodo(todo_array[i]);
      todo_ul.appendChild(todo_li);
      clickTodoHandler(todo_li);
      attachTrashTodo(todo_li);
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
      displayTodoSection();
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

function getTodoSection() {
  return document.getElementById("todo_section");
}

function getTaskSection() {
  return document.getElementById("task_section");
}

function getInviteUserButton() {
  return document.getElementById("invite_user");
}

function hideTodoSection() {
  getTodoSection().style.display = "none";
  getTodoList().style.display = "none";
  getTodoPlus().style.display = "none";
  getTodoLabel().style.display = "none";
  getTodoPlusLabel().style.display = "none";
  getInvitation().style.display = "none";
}

function hideTaskSection() {
  getTaskSection().style.display = "none";
  getTaskList().style.display = "none";
  getTaskPlus().style.display = "none";
  getTaskLabel().style.display = "none";
  getTaskPlusLabel().style.display = "none";
}

function getTaskLabel() {
  return document.getElementById("task_label");
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
      clickTaskCheckbox(task_li);
      clickAssignUser(task_li);
      attachTrashTask(task_li);
    }
  }
}

function getAssignUserForm() {
  return document.getElementById("assign_user_form");
}

function displayAssignUserForm() {
  getAssignUserForm().style.display = "flex";
}

function clickAssignUser(task_li) {
  task_li.children[3].addEventListener("click", function(event) {
    displayAssignUserForm();
    getAssignUserForm().name = getTask(task_li);
  });
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

function getTaskForm() {
  return document.getElementById("create_task_form");
}

function displayCreateTaskForm() {
  getTaskForm().style.display = "flex";
}

function displayPlusTask() {
  getTaskPlus().style.display = "flex";
  getTaskPlusLabel().style.display = "flex";
}

function getTaskPlusLabel() {
  return document.getElementById("plus_task_label");
}

function getTaskLabel() {
  return document.getElementById("task_label");
}

function displayTaskSection() {
  getTaskSection().style.display = "block";
  displayTaskLabel();
  displayTaskList();
  displayPlusTask();
}

function displayTaskLabel() {
  let label = getTaskLabel();
  label.style.display = "block";
  label.innerHTML = getTodoTitle(getSelectedTodo()) + label.title;
}

function displayTaskList() {
  getTaskList().style.display = "grid";
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
      displayTaskSection();
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
  getTaskForm().style.display = "none";
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
        clickTaskCheckbox(task_li);
        attachTrashTask(task_li);
        clickAssignUser(task_li);
      }
      resetTaskInput();
    });

    request.open('POST', '../php/actions/action_add_list_item.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title, todo: todo_title, task: task_input.task, datetime: task_input.due_date}));
  });
}

function getCheckbox(task_li) {
  return task_li.getElementsByClassName("task_checkbox")[0];
}

function clickTaskCheckbox(task_li) {
  getCheckbox(task_li).addEventListener("change", function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();

    let project_title = getProjectTitle(getSelectedProject());
    let todo_title = getTodoTitle(getSelectedTodo());
    let task = getTask(task_li);
    let task_completed = (event.target.checked ? 1 : 0);

    let request = new XMLHttpRequest();
    request.addEventListener("load", function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false)
        event.target.checked = task_completed;
    });

    request.open('POST', '../php/actions/action_set_completed_task.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project_title, todo: todo_title, task: task, completed: task_completed}));
  });
}

function cancelProjectFormHandler() {
  cancelFormHandler(getProjectForm());
}

function cancelTodoFormHandler() {
  cancelFormHandler(getTodoForm());
}

function cancelInviteFormHandler() {
  cancelFormHandler(getInviteForm());
}

function cancelTaskFormHandler() {
  cancelFormHandler(getTaskForm());
}

function cancelAssignUserFormHandler() {
  cancelFormHandler(getAssignUserForm());
}

function getInviteForm() {
  return document.getElementById("invite_user_form")
}

function hideForm(form) {
  form.style.display = "none";
}

function getCancel(form) {
  return form.getElementsByClassName("fa-times")[0];
}

function cancelFormHandler(form) {
  let cancel = document.createElement("i");
  form.insertAdjacentElement('afterbegin', cancel)
  cancel.outerHTML = CANCEL;
  getCancel(form).addEventListener("click", function(event) {
    hideForm(form);
  });
}

function displayInviteUserForm() {
  getInviteForm().style.display = "flex";
}

function getInviteUserTextbox() {
  return document.getElementById("invite_username");
}

function getSimilarList() {
  return document.getElementById("autocomplete");
}

function clearSimilarList() {
  let similar_ul = getSimilarList();
  while (similar_ul.children.length != 0)
    similar_ul.removeChild(similar_ul.firstElementChild);
}

function setSimilarList(users) {
  let similar_ul = getSimilarList();
  if(users !== null) {
    for(let i = 0; i < users.length; i++) {
      let user_li = document.createElement("li");
      user_li.classList.add('similar_user');
      user_li.innerHTML = users[i].username;
      similar_ul.appendChild(user_li);
      user_li.addEventListener("click", setInputAndInvite);
    }
  }
}

function setInputAndInvite() {
  getInviteUserTextbox().value = this.innerHTML;
  inviteUser();
}

function getInviteButton() {
  return document.getElementById("invite_submit");
}

function hideInviteForm() {
  getInviteForm().style.display = "none";
}

function inviteUser() {
  event.stopImmediatePropagation();
  event.preventDefault();

  let user = getInviteUserTextbox().value;
  let project = getProjectTitle(getSelectedProject());

  let request = new XMLHttpRequest();
  request.addEventListener("load", function(event) {
    let response = JSON.parse(this.responseText);
    if(response !== false){
      hideInviteForm();
    }
    clearSimilarList();
    getInviteUserTextbox().value = "";
  });

  request.open('POST', '../php/actions/action_invite_user_to_project.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({user: user, project: project}));
}

function inviteUserHandler() {
  cancelInviteFormHandler();
  getInviteButton().addEventListener("click", inviteUser);
  getInviteUserButton().addEventListener("click", function(event) {
    displayInviteUserForm();
  });
  getInviteUserTextbox().addEventListener("keyup", function(event) {
    event.stopImmediatePropagation();
    if(event.target.value === "") {
      clearSimilarList();
      return;
    }

    let request = new XMLHttpRequest();
    request.addEventListener("load", function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false){
        clearSimilarList();
        setSimilarList(response);
      }
    });

    request.open('POST', '../php/actions/action_get_similar_users.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({input: event.target.value}));
  });
}

function getAssignUserTextbox() {
  return document.getElementById("assign_username");
}

function getSimilarAssignList() {
  return document.getElementById("autocomplete_assign");
}

function getAssignUserButton() {
  return document.getElementById("assign");
}

function clearSimilarAssignList() {
  let similar_ul = getSimilarAssignList();
  while (similar_ul.children.length != 0)
    similar_ul.removeChild(similar_ul.firstElementChild);
}

function setSimilarAssignList(users) {
  let similar_ul = getSimilarAssignList();
  if(users !== null) {
    for(let i = 0; i < users.length; i++) {
      let user_li = document.createElement("li");
      user_li.classList.add('similar_assign_user');
      user_li.innerHTML = users[i].user;
      similar_ul.appendChild(user_li);
      user_li.addEventListener("click", function(event) {
        setInputAndAssign(event);
      });
    }
  }
}

function setInputAndAssign(event) {
  getAssignUserTextbox().value = event.target.innerHTML;
  assignUser(event);
}

function hideAssignUserForm() {
  getAssignUserForm().style.display = "none";
}

function textboxAssignUserHandler() {
  getAssignUserTextbox().addEventListener("keyup", function(event) {
    event.stopImmediatePropagation();
    if(event.target.value === "") {
      clearSimilarAssignList();
      return;
    }

    let project = getProjectTitle(getSelectedProject());

    let request = new XMLHttpRequest();
    request.addEventListener("load", function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false){
        clearSimilarAssignList();
        setSimilarAssignList(response);
      }
    });

    request.open('POST', '../php/actions/action_get_similar_contributers.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({project: project, input: event.target.value}));
  });
}

function getUser(task_li) {
  return task_li.getElementsByClassName("task_user")[0];
}

function setAssignedUser(task, user) {
  let task_ul = getTaskList();
  for(let i = 0; i < task_ul.children.length; i++) {
    let task_li = task_ul.children[i];
    if(getTask(task_li) === task) {
      getUser(task_li).innerHTML = user;
      return;
    }
  }
}

function assignUser(event) {
  event.stopImmediatePropagation();
  event.preventDefault();

  let user = getAssignUserTextbox().value;
  let project = getProjectTitle(getSelectedProject());
  let todo = getTodoTitle(getSelectedTodo());
  let task = getAssignUserForm().name;

  let request = new XMLHttpRequest();
  request.addEventListener("load", function(event) {
    let response = JSON.parse(this.responseText);
    if(response !== false){
      hideAssignUserForm();
      setAssignedUser(task, user);
    }
    clearSimilarAssignList();
    getAssignUserTextbox().value = "";
  });

  request.open('POST', '../php/actions/action_assign_task_to_user.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({user: user, project: project, todo: todo, task: task}));
}

function submitAssignUserHandler() {
  getAssignUserButton().addEventListener("click", function(event){
    assignUser(event);
  });
}

function assignUserHandler() {
  cancelAssignUserFormHandler();
  textboxAssignUserHandler();
  submitAssignUserHandler();
}

function init() {
  plusProjectHandler();
  createProjectHandler();
  clickProjectsHandler();
  cancelProjectFormHandler();

  plusListHandler();
  createListHandler();
  cancelTodoFormHandler();
  inviteUserHandler();

  plusTaskHandler();
  createTaskHandler();
  cancelTaskFormHandler();
  assignUserHandler();
}

init();
