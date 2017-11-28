'use strict';

function selectLoginHandler() {
  let login_button = document.getElementById("change_to_login");
  login_button.addEventListener('click', function(event) {
    let login_section = document.getElementById("login");
    let register_section = document.getElementById("register");
    //TODO Change from "flex" to whatever you're using in css
    login_section.style.display = "flex";
    register_section.style.display = "none";
  });
}

function selectRegisterHandler() {
  let register_button = document.getElementById("change_to_register");
  register_button.addEventListener('click', function(event) {
    let login_section = document.getElementById("login");
    let register_section = document.getElementById("register");
    //TODO Change from "flex" to whatever you're using in css
    register_section.style.display = "flex";
    login_section.style.display = "none";
  });
}

function init() {
  selectLoginHandler();
  selectRegisterHandler();
}

init();
