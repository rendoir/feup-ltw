'use strict';

function getChangeButton() {
  return document.getElementById("change_image");
}

function getImage() {
  return document.getElementById("image");
}

function updateImage(image) {
  getImage().src = image + '?time=' + performance.now();
}

function validImage(type) {
  return /^image\//.test(type);
}

function uploadImageHandler() {
  getChangeButton().addEventListener("change", function() {
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

function init() {
  uploadImageHandler();
}

init();
