function get_article_id() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id;
}

function get_category_id() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("cid");
  return id;
}

function toggle_bar() {
  let x = document.querySelector(".left-bar");
  let z = document.querySelector(".left-bar-logo");

  x.classList.toggle("toggle_bar");
  let y = document.querySelector("#mask");
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
  let x = document.querySelector(".login-register-form");
  let y = document.querySelector("#mask");
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
async function auth_prompt(type) {
  const password = document.querySelector('.password-form').value;
  const login_error = document.querySelector("#login-error");
  // Verify password
  if (type.localeCompare("register") === 0) {
    if (password.length < 9) {
      login_error.textContent = "Your password must be longer than 9 chacters";
      return;
    }
    if (!/[0-9]/.test(password)) {
      login_error.textContent = "Your password must contain numbers";
      return;
    }
    if (!/[A-Z]/.test(password)) {
      login_error.textContent = "Your password must contain an uppercase letter";
      return;
    }
  }

  let formData = new FormData();
  form = document.querySelector(".login-register-form");

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
  login_error.textContent = text;
  if (text.localeCompare("You have been logged in successfully.") == 0) {
    window.location.href = "";
  }
}

async function get_categories() {
  const response = await fetch("/serv/get_categories.php", {
    method: "POST",
  });
  const categories = await response.json();
  const cat_bar = document.querySelector("#categories");
  for (let i = 0; i < categories.length; i++) {
    let category = document.createElement('a');
    category.href = '/?cid=' + categories[i].id;
    category.textContent = categories[i].name;
    category.className = "bar-item";
    cat_bar.appendChild(category);
  }
}
get_categories();
