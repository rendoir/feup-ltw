'use strict';

function encodeForAjax(data) {
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function validUsername(username) {
  return (/^[a-zA-Z][a-zA-Z0-9_\-]{1,30}[a-zA-Z0-9]$/g).test(username);
}

function validEmail(email) {
  return (/^[a-zA-Z][a-zA-Z0-9_]{1,30}[a-zA-Z0-9]@[a-zA-Z]{2,10}\.[a-zA-Z]{1,6}$/g).test(email);
}

function validName(name) {
  return (/^[A-Z][a-z]{2,20}$/g).test(name);
}

function validPassword($password) {
  return (/[A-Z]/g).test(password) &&
         (/[a-z]/g).test(password) &&
         (/[0-9]/g).test(password) &&
         strlen($password) >= 8    &&
         strlen($password) <= 64;
}

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

function hide(element) {
  element.style.display = "none";
}

function displayFlex(element) {
  element.style.display = "flex";
}

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

function init() {
  selectLoginHandler();
  selectRegisterHandler();

  /*usernameHandler();
  passwordHandler();
  nameHandler();
  emailHandler();*/

  loginHandler();
  //registerHandler();
}

init();
