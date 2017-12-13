'use strict';

/*Validation*/
function validImage(type) {
  return /^image\//.test(type);
}

function validPassword(password) {
  return (/[A-Z]/g).test(password) &&
         (/[a-z]/g).test(password) &&
         (/[0-9]/g).test(password) &&
         password.length >= 8 &&
         password.length <= 64;
}


/*Element getters/setters*/
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

function getChangePasswordButton() {
  return document.getElementById("change_password_button");
}

function getChangePasswordForm() {
  return document.getElementById("change_password_form");
}

function getChangePasswordSubmit() {
  return document.getElementById("submit_password");
}

function getCancel(form) {
  return form.getElementsByClassName("fa-times")[0];
}

function getOldPassTextbox() {
  return document.getElementById("old_password");
}

function getNewPassTextbox() {
  return document.getElementById("new_password");
}


/*Helpers*/
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

function validChangePasswordInput(old_password, new_password) {
  if(!validPassword(new_password.value)) {
    onError(getNewPassTextbox(), "Passwords must be between 8 and 32 characters long and have at least a number, a lower-case letter and a upper-case letter.");
    return false;
  } else onValid(getNewPassTextbox());

  if(new_password.value === old_password.value) {
    onError(getNewPassTextbox(), "New password must be different from the old password");
    return false;
  } else onValid(getNewPassTextbox());

  return true;
}


/*Event Listeners*/
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

function cancelFormHandler(form) {
  let cancel = document.createElement("i");
  form.insertAdjacentElement('afterbegin', cancel)
  cancel.outerHTML = CANCEL;
  getCancel(form).addEventListener("click", function(event) {
    event.stopImmediatePropagation();
    hide(form);
    displayFlex(getChangePasswordButton());
  });
}

function changePasswordHandler() {
  cancelFormHandler(getChangePasswordForm());
  getChangePasswordButton().addEventListener("click", function(event) {
    event.stopImmediatePropagation();
    hide(this);
    let form = getChangePasswordForm();
    onFormValid(form);
    displayFlex(form);
  });
  getChangePasswordSubmit().addEventListener("click", function(event) {
    event.stopImmediatePropagation();
    let old_password = getOldPassTextbox();
    let new_password = getNewPassTextbox();

    if(!validChangePasswordInput(old_password, new_password)) {
      return;
    }

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      let form = getChangePasswordForm();
      if(response) {
        hide(form);
        displayFlex(getChangePasswordButton());
      } else onFormError(form, "Incorrect Password");
      getOldPassTextbox().value = "";
      getNewPassTextbox().value = "";
    });

    request.open('POST', '../php/actions/action_change_password.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({old_password: old_password.value, new_password: new_password.value}));
    event.preventDefault();
  });
}

function init() {
  uploadImageHandler();
  inviteHandler();
  changePasswordHandler();
  clearErrorFlagsOnInput();
  clearErrorFlagsOnForm();
}

init();
