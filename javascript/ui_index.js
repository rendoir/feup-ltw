'use strict';

//12 years in milliseconds
const MINIMUM_AGE = 378683112000;

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
  let temp = new Date(date);
  let current = Date.now();
  return temp != 'Invalid Date' && (current - temp.getTime()) >= MINIMUM_AGE;
}

function validInput(input) {
  let valid = true;
  if(!validUsername(input.username.value)) {
    onError(input.username, "Usernames must start with a letter and can't have special symbols");
    valid = false;
  } else onValid(input.username);
  if(!validPassword(input.password.value)) {
    onError(input.password, "Passwords must be between 8 and 32 characters long and have at least a number, a lower-case letter and a upper-case letter.");
    valid = false;
  } else onValid(input.password);
  if(!validName(input.first_name.value)) {
    onError(input.first_name, "Names must start with a upper-case letter and the remaining letters must be lower-case");
    valid = false;
  } else onValid(input.first_name);
  if(!validName(input.last_name.value)) {
    onError(input.last_name, "Names must start with a upper-case letter and the remaining letters must be lower-case");
    valid = false;
  } else onValid(input.last_name);
  if(!validEmail(input.email.value)) {
    onError(input.email, "Please enter a valid email");
    valid = false;
  } else onValid(input.email);
  if(!validBirthDate(input.birth_date.value)) {
    onError(input.birth_date, "You must be at least 12 years old");
    valid = false;
  } else onValid(input.birth_date);

  return valid;
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
  let username = getRegister().getElementsByClassName("username")[0];
  let first_name = getRegister().getElementsByClassName("name")[0];
  let last_name = getRegister().getElementsByClassName("name")[1];
  let email = getRegister().getElementsByClassName("email")[0];
  let birth_date = getRegister().getElementsByClassName("date")[0];
  let password = getRegister().getElementsByClassName("password")[0];
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

    event.preventDefault();
    request.open('POST', '../php/actions/action_register.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({ username: input.username.value, password: input.password.value, name: input.first_name.value + ' ' + input.last_name.value,
                                 email: input.email.value, birth_date: input.birth_date.value }));
  });
}

function init() {
  selectLoginHandler();
  selectRegisterHandler();
  loginHandler();
  registerHandler();
  clearErrorFlagsOnInput();
}

init();
