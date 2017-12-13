'use strict';

const TRASH = '<i class="fa fa-trash" aria-hidden="true"></i>';
const USER = '<i class="fa fa-user" aria-hidden="true"></i>';
const CANCEL = '<i class="fa fa-times" aria-hidden="true"></i>'
const ACCEPT  = '<i class="fa fa-check" aria-hidden="true"></i>';
const DECLINE = CANCEL;

function encodeForAjax(data) {
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function hide(element) {
  element.style.display = "none";
}

function displayFlex(element) {
  element.style.display = "flex";
}

function onError(element, msg) {
  element.style.borderColor = "red";
  element.setCustomValidity("");
  element.setCustomValidity(msg);
}

function onValid(element) {
  element.style.borderColor = "initial";
  element.setCustomValidity("");
}

function clearErrorFlagsOnInput() {
  let inputs = document.getElementsByTagName("input");
  for(let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function(event) {
      onValid(inputs[i]);
    });
  }
}
