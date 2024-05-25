async function submit_article() {
  let arr = {};

  arr['title'] = document.querySelector(".article-title").textContent;
  arr['text'] = document.querySelector(".article-text").textContent;
  arr['author'] = document.querySelector(".article-author").textContent;
  arr['comments'] = document.querySelector(".article-comments").textContent;
  arr['categories'] = document.querySelector(".article-categories").textContent;

  image = document.querySelector(".article-image").src;
  arr['image'] = image.replace("data:image/jpg;base64,", "");

  const response = await fetch("/serv/load_articles.php", {
    method: "POST",
    body: JSON.stringify(arr),
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
  const text = document.querySelector("#prompt-text").value;
  response = await fetch("/serv/gen_img.php", {
    method: "POST",
    body: text,
  });
  const img = document.querySelector(".article-image");
  img.src = "data:image/jpg;base64," + await response.text();
}
async function generate_text() {
  //TEXT
  const text = document.querySelector("#prompt-text").value;
  const ptext = "YOU ARE AN EXCELLENT NEWSPAPER WRITER, Generate an newspaper article without the title, only the body and nothing else about: " + text;

  let response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: ptext,
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
  const rtext = rbox.textContent;
  const ltext = "Write 1 title for this article, Do not write anything else only one title:" + rtext;
  response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: ltext,
  });
  const l_rbox = document.querySelector(".article-title");
  l_rbox.textContent = await response.text();
}

async function generate_comments() {
  // COMMENT
  const rbox = document.querySelector(".article-text");
  const rtext = rbox.textContent;
  const ctext = `Generate 3 realistic comments for this article, write them as an array of name and text in json, Do not write anything else except for the JSON,
     you must always TERMINATE the JSON array and write 100% correct JSON:` + rtext;
  response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: ctext,
  });
  const c_rbox = document.querySelector(".article-comments");
  c_rbox.textContent = await response.text();
}

async function generate_categories() {
  // CATEGORIES
  const rbox = document.querySelector(".article-text");
  const rtext = rbox.textContent;
  const ca_text = "Generate 4 categories, write it as an array of string in json for this article, every category must be a single word, respond in pure json: " + rtext;
  response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: ca_text,
  });
  const ca_rbox = document.querySelector(".article-categories");
  ca_rbox.textContent = await response.text();
}

async function generate_author() {
  // AUTHOR
  const l_rbox = document.querySelector(".article-text");
  l_rtext = l_rbox.textContent;
  const a_text = "Generate a random full name, for this article, do not write anything else execept for the name: " + l_rtext;
  response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: a_text,
  });
  const a_rbox = document.querySelector(".article-author");
  a_rbox.textContent = await response.text();
}


