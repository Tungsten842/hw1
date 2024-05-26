async function submit_article() {
  let body = new Object();

  body.title = document.querySelector(".article-title").textContent;
  body.text = document.querySelector(".article-text").textContent;
  body.author = document.querySelector(".article-author").textContent;
  body.comments = document.querySelector(".article-comments").textContent;
  body.categories = document.querySelector(".article-categories").textContent;

  image = document.querySelector(".article-image").src;
  body.image = image.replace("data:image/jpg;base64,", "");

  const response = await fetch("/serv/load_articles.php", {
    method: "POST",
    body: JSON.stringify(body),
  });
  await response.text();
}

async function generate_apis() {
  await Promise.all([
    generate_text(),
    generate_image(),
  ]);
}
async function generate_image() {
  const body = document.querySelector("#prompt-text").value;
  response = await fetch("/serv/gen_img.php", {
    method: "POST",
    body: body,
  });
  const img = document.querySelector(".article-image");
  img.src = "data:image/jpg;base64," + await response.text();
}
async function generate_text() {
  //TEXT
  const text = document.querySelector("#prompt-text").value;

  let body = new Object();
  body.preamble = "Generate an entire newspaper article, only generate the body of the article and not the title";
  body.message = text;

  let response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const rbox = document.querySelector(".article-text");
  rbox.textContent = await response.text();

  await Promise.all([
    generate_title(),
    generate_author(),
    generate_categories(),
    generate_comments()
  ]);
}

async function generate_title() {
  // TITLE
  const rbox = document.querySelector(".article-text");

  let body = new Object();
  body.preamble = "Write 1 title for this article, Do not write anything else only one title";
  body.message = rbox.textContent;

  response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const l_rbox = document.querySelector(".article-title");
  l_rbox.textContent = await response.text();
}

async function generate_comments() {
  // COMMENT
  const rbox = document.querySelector(".article-text");

  let body = new Object();
  const comment_num = Math.floor(Math.random() * 5) + 3;
  body.preamble = `Generate ${comment_num} realistic comments for this article, write them as an array of name and text in json, Do not write anything else except for the JSON,
     you must always TERMINATE the JSON array and write 100% correct JSON`;
  body.message = rbox.textContent;

  response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const c_rbox = document.querySelector(".article-comments");
  c_rbox.textContent = await response.text();
}

async function generate_categories() {
  // CATEGORIES
  const rbox = document.querySelector(".article-text");

  let body = new Object();
  body.preamble = "Generate 4 categories, write it as an array of string in json for this article, every category must be a single word, respond in pure json";
  body.message = rbox.textContent;

  response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const ca_rbox = document.querySelector(".article-categories");
  ca_rbox.textContent = await response.text();
}

async function generate_author() {
  // AUTHOR
  const rbox = document.querySelector(".article-text");

  let body = new Object();
  body.preamble = "Generate a random full name, do not write anything else execept for the name:";
  body.message = rbox.textContent;
  body.temperature = 1.0;

  response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const a_rbox = document.querySelector(".article-author");
  a_rbox.textContent = await response.text();
}


