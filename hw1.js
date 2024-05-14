async function load_articles() {
  const response = await fetch("get_articles.php", {
    method: "POST",
    body: "",
  });
  const arr = await response.json();
  //console.log(arr);
  const main = document.querySelector(".main-article");
  ch = main.children;
  ch[0].textContent = arr[0][0];
  ch[1].textContent = arr[0][1];

  let sec_articles = document.querySelectorAll('.article-block');
  //console.log(sec_articles);
  for (let n = 0; n < sec_articles.length; n++) {
    child = sec_articles[n].children;
    //console.log(child);
    child[1].textContent = arr[1 + n][0];
  }
  const various = document.querySelector(".various-articles");

  for (let i = 5; i < 10; i++) {
    /*
    let div = document.createElement("div");
    let newContent = document.createTextNode(arr[i][0]);
    article.appendChild(newContent);
    article.classList.add('various-articles-article');
    various.appendChild(div);

    div1 = document.createElement("div");
    newContent = document.createTextNode(arr[i][0]);
    article.appendChild(newContent);
    article.classList.add('various-articles-article-infos');
    div.appendChild(div1);
    */
    various.innerHTML += `
      <div class=various-articles-article>
        <div class=various-articles-article-infos>
          <div class=various-articles-article-category>
          Startup
          </div>
          <h3 class=various-articles-article-title>
          ${arr[i][0]}
          </h3>
          <div class=various-articles-article-author>
          Kate park
          </div>
        </div>
        <div class=various-articles-article-text>
          ${arr[i][1]}
        </div>
      </div>
    `;
  }

}
load_articles();


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
  const response = await fetch(type + ".php", {
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


function add_piece() {
  let element = document.querySelector('.right-featured-stuff');

  let el = document.createElement("div");
  let text = document.createTextNode("Enterprise");
  el.appendChild(text);
  el.setAttribute('class', 'right-featured-stuff-item-title');
  element.appendChild(el);

  el = document.createElement("h3");
  text = document.createTextNode("The market is forcing cloud vendors to relax data egress fees");
  el.appendChild(text);
  el.setAttribute('class', 'right-featured-stuff-item');
  element.appendChild(el);

  el = document.createElement("div");
  text = document.createTextNode("Ron Miller");
  el.appendChild(text);
  el.setAttribute('class', 'right-featured-stuff-author');
  element.appendChild(el);
}

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

// add form search event listener
//document.querySelector('form').addEventListener('submit', search);

/*
const element = document.querySelector('*');
element.addEventListener("keydown", (event) => {
  if (event.key === "t") {
    toggle_bar(event);
  }
  if (event.key === "a") {
    add_piece(event);
  }
});
*/

//addEventListener("mouseover", (event) => { });
