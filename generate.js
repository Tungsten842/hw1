let article = new Object();

async function submit_article() {
  const response = await fetch("/serv/submit_article.php", {
    method: "POST",
    body: JSON.stringify(article),
  });
  await response.text();
  document.querySelector("#prompt-text").value = "";
}

async function generate_apis() {
  let loader = document.querySelector(".loader");

  loader.classList.add("show");
  await Promise.all([
    generate_text(),
    generate_image(),
  ]);
  loader.classList.remove("show");
}
async function generate_image() {
  const body = document.querySelector("#prompt-text").value;
  response = await fetch("/serv/gen_img.php", {
    method: "POST",
    body: body,
  });

  article.image = await response.text();

  if (document.contains(document.querySelector(".article-image"))) {
    document.querySelector(".article-image").remove();
  }

  const img = document.createElement("img");
  img.src = "data:image/jpg;base64," + article.image;
  img.className = 'article-image';
  const divider = document.querySelector(".article-divider");

  divider.insertBefore(img, divider.firstChild);

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
  body.preamble = "You are an assistant that only speaks JSON. Do not write normal text";
  body.message = `Generate ${comment_num} realistic comments for this article, write them as an array of name and text, Article: ` + rbox.textContent;

  const response = await fetch("/serv/gen_text.php", {
    method: "POST",
    body: JSON.stringify(body),
  });

  article.comments = "";
  for await (const chunk of response.body) {
    article.comments += new TextDecoder().decode(chunk);;
  }
  try {
    article.comments = JSON.parse(article.comments);
  } catch (e) {
    return console.log(e);
  }
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

  article.categories = "";
  let categories;
  try {
    categories = await response.json();
  } catch (e) {
    return console.log(e);
  }

  article.categories = categories;

  const cat_html = document.querySelector(".article-categories");
  cat_html.innerHTML = "";
  for (const category of categories) {
    const single_category = document.createElement('a');
    single_category.className = 'single-category';
    single_category.textContent = category;
    cat_html.appendChild(single_category);
  }
}

async function generate_author() {
  // AUTHOR
  let body = new Object();
  body.preamble = "Generate a random full name for this article, do not write anything else execept for the name:";
  body.message = document.querySelector("#prompt-text").value;;

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


