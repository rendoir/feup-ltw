'use strict';

function getChangeButton() {
  return document.getElementById("change_image");
}

function uploadImageHandler() {
  getChangeButton().addEventListener("change", function() {
    let image = event.target.files[0];
    let form_data = new FormData();

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      let response = JSON.parse(this.responseText);
      if(response !== false) {
        alert("PINTOU!!!!");
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
