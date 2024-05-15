function toggle_bar() {
  var x = document.querySelector(".left-bar");
  var z = document.querySelector(".left-bar-logo");

  x.classList.toggle("toggle_bar");
  var y = document.querySelector("#mask");
  if (y.style.display === "flex") {
    y.style.display = "none";
    z.style.display = "none";
  } else {
    y.style.display = "flex";
    y.style.zIndex = 4;
    z.style.display = "flex";
  }
}

function login_popup() {
  var x = document.querySelector(".login-register-form");
  var y = document.querySelector("#mask");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
  if (y.style.display === "flex") {
    y.style.display = "none";
  } else {
    y.style.display = "flex";
  }
}

// login/register
function auth_prompt(type) {
  var formData = new FormData();

  form = document.querySelector(".login-register-form");
  for (let element of form.elements) {
    if (element.type !== "submit") {
      formData.append(element.name, element.value);
    }
  }
  auth_api(formData, type);
  //event.preventDefault()
}
async function auth_api(formData, type) {
  const response = await fetch("serv/" + type + ".php", {
    method: "POST",
    body: formData,
  });
  const text = await response.text();
  const rbox = document.querySelector("#login-error");
  //if (text.includes(""))
  rbox.textContent = text;
  //alert(text);
}
/*
document.querySelector(".login-register-form").addEventListener("submit", function(event) {
  var formData = new FormData();

  form = document.querySelector(".login-register-form");
  for (let element of form.elements) {
    if (element.type !== "submit") {
      formData.append(element.name, element.value);
    }
  }
  register_api(formData);
  event.preventDefault()
});
*/

var token = "";

async function text_to_speech(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/mms-tts-eng",
    {
      headers: { Authorization: "Bearer " + token },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

async function make_request(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      headers: {
        Authorization: "Bearer " + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

var tts_audio;
function search(event) {
  const previous_message = document.getElementById("textbox").innerText;
  const i_message = document.getElementById("prompt").value;
  let message = previous_message + i_message;

  make_request({ "inputs": '[INST]' + message + '[/INST]' }).then((dirtyresponse) => {
    const textbox = document.getElementById("textbox");

    const response = dirtyresponse[0].generated_text.replace('[INST]' + message + '[/INST]', '');

    textbox.innerText = message + '\n' + response + '\n';

    text_to_speech({ "inputs": response }).then((response) => {
      tts_audio = new Audio(URL.createObjectURL(response));
      tts_audio.play();
    });

  });

  document.getElementById("prompt").value = "";

  event.preventDefault();


}