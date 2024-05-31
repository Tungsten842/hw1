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
