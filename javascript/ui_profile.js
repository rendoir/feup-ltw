'use strict';

const DECLINE = '<i class="fa fa-times" aria-hidden="true"></i>';
const ACCEPT  = '<i class="fa fa-check" aria-hidden="true"></i>';

function encodeForAjax(data) {
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function getChangeButton() {
  return document.getElementById("change_image");
}

function getImage() {
  return document.getElementById("image");
}

function getInviteList() {
  return document.getElementById("invite_list");
}

function updateImage(image) {
  getImage().src = image + '?time=' + performance.now();
}

function validImage(type) {
  return /^image\//.test(type);
}

function uploadImageHandler() {
  getChangeButton().addEventListener("change", function() {
    if(event.target.files.length == 0)
      return;

    let image = event.target.files[0];

    if(image.size > 2000000)
      return;
    if(!validImage(image.type))
      return;

    let form_data = new FormData();

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false) {
        updateImage(response);
      }
    });

    request.open('POST', '../php/actions/action_upload_image.php', true);
    form_data.append('image', image);
    request.send(form_data);
    event.stopImmediatePropagation();
  });
}

function inviteHandler() {
  let invite_list = getInviteList();
  if(invite_list !== null) {
    for(let i = 0; i < invite_list.children.length; i++) {
      attachAccept(invite_list.children[i]);
      attachDecline(invite_list.children[i]);
    }
  }
}

function acceptInvite(event) {
  answerInvite(event, 1);
}

function declineInvite(event) {
  answerInvite(event, 0);
}

function deleteInvite(project_li) {
  project_li.parentElement.removeChild(project_li);
  if(getInviteList().children.length == 0) {
    document.getElementsByClassName("invite_label")[0].innerHTML = " You have no invites to join projects! ";
  }
}

function answerInvite(event, answer) {
  let project_li = event.target.parentElement;
  let project_title = project_li.firstElementChild.innerHTML;

  let request = new XMLHttpRequest();
  request.addEventListener('load', function(event) {
    let response = JSON.parse(this.responseText);
    if(response !== false) {
      deleteInvite(project_li);
    }
  });

  request.open('POST', '../php/actions/action_answer_invite.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({project: project_title, answer: answer}));
  event.stopImmediatePropagation();
}

function attachAccept(invite_li) {
  let accept = document.createElement("i");
  invite_li.appendChild(accept);
  accept.outerHTML = ACCEPT;
  invite_li.children[1].addEventListener("click", acceptInvite);
}

function attachDecline(invite_li) {
  let decline = document.createElement("i");
  invite_li.appendChild(decline);
  decline.outerHTML = DECLINE;
  invite_li.children[2].addEventListener("click", declineInvite);
}

function init() {
  uploadImageHandler();
  inviteHandler();
}

init();
