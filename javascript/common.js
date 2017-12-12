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
