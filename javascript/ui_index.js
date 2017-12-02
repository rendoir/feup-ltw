'use strict';

function getLoginButton() {
  return document.getElementById("change_to_login");
}

function getRegisterButton() {
  return document.getElementById("change_to_register");
}

function hideLogin() {
  document.getElementById("login").style.display = "none";
}

function hideRegister() {
  document.getElementById("register").style.display = "none";
}

function displayLogin() {
  //TODO Change from "flex" to whatever you're using in css
  document.getElementById("login").style.display = "flex";
}

function displayRegister() {
  //TODO Change from "flex" to whatever you're using in css
  document.getElementById("register").style.display = "flex";
}

function selectLoginHandler() {
  let login_button = getLoginButton();
  login_button.addEventListener('click', function(event) {
    hideRegister();
    displayLogin();
  });
}

function selectRegisterHandler() {
  let register_button = getRegisterButton();
  register_button.addEventListener('click', function(event) {
    hideLogin();
    displayRegister();
  });
}

function init() {
  selectLoginHandler();
  selectRegisterHandler();
}

init();
