'use strict';

/*Validation*/
function validUsername(username) {
  return (/^[a-zA-Z][a-zA-Z0-9_\-]{1,30}[a-zA-Z0-9]$/g).test(username);
}

function validEmail(email) {
  return (/^[a-zA-Z][a-zA-Z0-9_]{1,30}[a-zA-Z0-9]@[a-zA-Z]{2,10}\.[a-zA-Z]{1,6}$/g).test(email);
}

function validName(name) {
  return (/^[A-Z][a-z]{2,20}$/g).test(name);
}

function validPassword(password) {
  return (/[A-Z]/g).test(password) &&
         (/[a-z]/g).test(password) &&
         (/[0-9]/g).test(password) &&
         password.length >= 8    &&
         password.length <= 64;
}

function validBirthDate(date) {
  return new Date(date) != 'Invalid Date';
}

function validInput(input) {
  return validUsername(input.username) &&
         validPassword(input.password) &&
         validName(input.first_name) &&
         validName(input.last_name) &&
         validEmail(input.email) &&
         validBirthDate(input.birth_date);
}


/*Element getters/setters*/
function getLoginButton() {
  return document.getElementById("change_to_login");
}

function getRegisterButton() {
  return document.getElementById("change_to_register");
}

function getLogin() {
  return document.getElementById("login");
}

function getRegister() {
  return document.getElementById("register");
}

function getLoginSubmit() {
  return getLogin().getElementsByClassName("submit")[0];
}

function getLoginInput() {
  let username = getLogin().getElementsByClassName("username")[0].value;
  let password = getLogin().getElementsByClassName("password")[0].value;
  return { username: username, password: password };
}

function resetLoginInput() {
  getLogin().getElementsByClassName("username")[0].value = "";
  getLogin().getElementsByClassName("password")[0].value = "";
}

function getRegisterSubmit() {
  return getRegister().getElementsByClassName("submit")[0];
}

function getRegisterInput() {
  let username = getRegister().getElementsByClassName("username")[0].value;
  let first_name = getRegister().getElementsByClassName("name")[0].value;
  let last_name = getRegister().getElementsByClassName("name")[1].value;
  let email = getRegister().getElementsByClassName("email")[0].value;
  let birth_date = getRegister().getElementsByClassName("date")[0].value;
  let password = getRegister().getElementsByClassName("password")[0].value;
  return { username: username, password: password, first_name: first_name, last_name: last_name,
           email: email, birth_date: birth_date };
}


/*Event Listeners*/
function selectLoginHandler() {
  let login_button = getLoginButton();
  login_button.addEventListener('click', function(event) {
    hide(getRegister());
    displayFlex(getLogin());
  });
}

function selectRegisterHandler() {
  let register_button = getRegisterButton();
  register_button.addEventListener('click', function(event) {
    hide(getLogin());
    displayFlex(getRegister());
  });
}

function loginHandler() {
  getLoginSubmit().addEventListener("click", function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    let input = getLoginInput();

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response) {
        window.location.replace('../php/user.php');
        return;
      }
      resetLoginInput();
    });

    request.open('POST', '../php/actions/action_login.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({ username: input.username, password: input.password }));
  });
}

function registerHandler() {
  getRegisterSubmit().addEventListener("click", function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    let input = getRegisterInput();
    if(!validInput(input))
       return;

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response === true) {
        window.location.replace('../php/user.php');
        return;
      }
    });

    request.open('POST', '../php/actions/action_register.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({ username: input.username, password: input.password, name: input.first_name + ' ' + input.last_name,
                                 email: input.email, birth_date: input.birth_date }));
  });
}

function init() {
  selectLoginHandler();
  selectRegisterHandler();
  loginHandler();
  registerHandler();
}

init();
