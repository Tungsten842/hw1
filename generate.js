async function submit_article() {
  console.log("SUBMT");

  let arr = {};

  arr['title'] = document.querySelector("#title-result").textContent;
  arr['text'] = document.querySelector("#text-result").textContent;
  arr['author'] = document.querySelector("#author-result").textContent;
  arr['comments'] = document.querySelector("#comment-result").textContent;
  arr['category'] = document.querySelector("#category-result").textContent;

  image = document.querySelector("#image-result").src;
  arr['image'] = image.replace("data:image/jpg;base64,", "");

  const response = await fetch("serv/load_articles.php", {
    method: "POST",
    body: JSON.stringify(arr),
  });
  const respt = await response.text();
  console.log(respt);
}

async function generate_apis(event) {
  event.preventDefault();
  //TEXT
  const text = document.querySelector("#prompt_text").value;
  const ptext = "YOU ARE AN EXCELLENT NEWSPAPER WRITER, Generate an newspaper article without the title, only the body and nothing else about: " + text;

  let response = await fetch("serv/gen_text.php", {
    method: "POST",
    body: ptext,
  });
  const rtext = await response.text();
  const rbox = document.querySelector("#text-result");
  rbox.textContent = rtext;
  // TITLE
  const ltext = "Write 1 title for this article, Do not write anything else only one title:" + rtext;
  response = await fetch("serv/gen_text.php", {
    method: "POST",
    body: ltext,
  });
  const l_rtext = await response.text();
  const l_rbox = document.querySelector("#title-result");
  l_rbox.textContent = l_rtext;
  // IMAGE
  response = await fetch("serv/gen_img.php", {
    method: "POST",
    body: l_rtext,
  });
  const img_base64 = await response.text();
  const img = document.querySelector("#image-result");
  img.src = "data:image/jpg;base64," + img_base64;
  // COMMENT
  const ctext = "Generate 3 realistic comments, write them as an array of name and text of the comment in json, for this article, Do not write anything else except for the json:" + rtext;
  response = await fetch("serv/gen_text.php", {
    method: "POST",
    body: ctext,
  });
  const c_rtext = await response.text();
  const c_rbox = document.querySelector("#comment-result");
  c_rbox.textContent = c_rtext;
  // CATEGORIES
  const ca_text = "Generate 4 categories, write it as an array of string in json for this article, every category must be a single word, Do not write anything else except for the json:" + rtext;
  response = await fetch("serv/gen_text.php", {
    method: "POST",
    body: ca_text,
  });
  const ca_rtext = await response.text();
  const ca_rbox = document.querySelector("#category-result");
  ca_rbox.textContent = ca_rtext;
  // AUTHOR
  const a_text = "Generate a random full name, for this article, do not write anything else execept for the name: " + l_rtext;
  response = await fetch("serv/gen_text.php", {
    method: "POST",
    body: a_text,
  });
  const a_rtext = await response.text();
  const a_rbox = document.querySelector("#author-result");
  a_rbox.textContent = a_rtext;
}
document.querySelector(".form-generate").addEventListener("submit", generate_apis);


