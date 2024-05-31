// login/register

function error(text) {
  const login_error = document.querySelector("#login-error");
  const register_error = document.querySelector("#register-error");
  login_error.textContent = text;
  register_error.textContent = text;
}

async function auth_prompt(type) {
  let formData = new FormData();
  const form = document.querySelector("#form-" + type);

  const password = form.elements["password"].value;
  // Verify password
  if (type.localeCompare("register") === 0) {
    if (password.length < 9) {
      error("Your password must be longer than 9 chacters");
      return;
    }
    if (!/[0-9]/.test(password)) {
      error("Your password must contain numbers");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      error("Your password must contain an uppercase letter");
      return;
    }
  }

  for (let element of form.elements) {
    if (element.type !== "submit") {
      formData.append(element.name, element.value);
    }
  }

  const response = await fetch("/serv/" + type + ".php", {
    method: "POST",
    body: formData,
  });
  const text = await response.text();
  if (text.localeCompare("Your account has been created.") === 0) {
    window.location.href = "/login.php";
  }

  if (text.localeCompare("You have been logged in successfully.") === 0) {
    window.location.href = "/";
  }

  error(text);
}

let log = document.querySelector("#login-button");
log.addEventListener('click', function() { auth_prompt("login") });
let reg = document.querySelector("#register-button");
reg.addEventListener('click', function() { auth_prompt("register") });
