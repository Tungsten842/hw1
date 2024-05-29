let article = new Object();

async function submit_article() {
  const response = await fetch("/serv/submit_article.php", {
    method: "POST",
    body: JSON.stringify(article),
  });
  await response.text();
}

async function generate_apis() {
  let button = document.querySelector("#but-sub");
  button.classList.add("button-prev");
  await Promise.all([
    generate_text(),
    generate_image(),
  ]);
  button.classList.remove("button-prev");
}
async function generate_image() {
  const body = document.querySelector("#prompt-text").value;
  response = await fetch("/serv/gen_img.php", {
    method: "POST",
    body: body,
  });
  const img = document.querySelector(".article-image");
  article.image = await response.text();
  img.src = "data:image/jpg;base64," + article.image;

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

  article.text = "";
  for await (const chunk of response.body) {
    article.text += new TextDecoder('utf-8').decode(chunk);;
    rbox.textContent = article.text;
  }

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
  l_rbox.textContent = article.title;

  article.title = "";
  for await (const chunk of response.body) {
    article.title += new TextDecoder('utf-8').decode(chunk);;
    l_rbox.textContent = article.title;
  }
}

async function generate_comments() {
  // COMMENT
  const rbox = document.querySelector(".article-text");

  let body = new Object();
  const comment_num = Math.floor(Math.random() * 6) + 3;
  body.preamble = `Generate ${comment_num} realistic comments for this article, write them as an array of name and text in json, Do not write anything else except for the JSON,
     you must always TERMINATE the JSON array and write 100% correct JSON`;
  body.message = rbox.textContent;

  const response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const c_rbox = document.querySelector(".article-comments");

  article.comments = "";
  for await (const chunk of response.body) {
    article.comments += new TextDecoder().decode(chunk);;
    c_rbox.textContent = article.comments;
  }
  article.comments = JSON.parse(article.comments);
}

async function generate_categories() {
  // CATEGORIES
  const rbox = document.querySelector(".article-text");

  let body = new Object();
  body.preamble = 'Generate a JSON array of 4 random categories, every category must be a single word, DO NOT WRITE ANYTHING ELSE EXCEPT FOR THE JSON ARRAY';
  body.message = rbox.textContent;

  response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const ca_rbox = document.querySelector(".article-categories");

  article.categories = "";
  for await (const chunk of response.body) {
    article.categories += new TextDecoder('utf-8').decode(chunk);;
    ca_rbox.textContent = article.categories;
  }
  article.categories = JSON.parse(article.categories);
}

async function generate_author() {
  // AUTHOR
  let body = new Object();
  body.preamble = "Generate a random full name, do not write anything else execept for the name:";
  body.message = "Generate a random full name";
  body.temperature = 1.0;

  response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const a_rbox = document.querySelector(".article-author");

  article.author = "";
  for await (const chunk of response.body) {
    article.author += new TextDecoder('utf-8').decode(chunk);;
    a_rbox.textContent = article.author;
  }
}


