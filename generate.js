async function submit_article() {
  console.log("SUBMTIE");
  const ttext = document.querySelector(".title-result").textContent;
  const ptext = document.querySelector(".text-result").textContent;
  const itext = document.querySelector(".img-result").src;
  const ctext = document.querySelector(".comment-result").textContent;

  var arr = [];
  arr[0] = ttext;
  arr[1] = ptext;
  arr[2] = itext.replace("data:image/jpg;base64", "");
  arr[3] = ctext;

  const response = await fetch("serv/load_articles.php", {
    method: "POST",
    body: JSON.stringify(arr),
  });
  const respt = await response.text();
  console.log(respt);
}

async function generate_apis(event) {
  event.preventDefault();
  //BODY
  const text = document.querySelector("#prompt_text").value;
  const ptext = "YOU ARE AN EXCELLENT NEWSPAPER WRITER, Generate an newspaper article without the title, only the body and nothing else about: " + text;

  let response = await fetch("serv/gen_text.php", {
    method: "POST",
    body: ptext,
  });
  const rtext = await response.text();
  const rbox = document.querySelector(".text-result");
  rbox.textContent = rtext;
  // TITLE
  const ltext = "Write a title for this article:\n" + rtext;
  response = await fetch("serv/gen_text.php", {
    method: "POST",
    body: ltext,
  });
  const l_rtext = await response.text();
  const l_rbox = document.querySelector(".title-result");
  l_rbox.textContent = l_rtext;
  // IMAGE
  response = await fetch("serv/gen_img.php", {
    method: "POST",
    body: l_rtext,
  });
  const img_base64 = await response.text();
  const img = document.querySelector(".img-result");
  img.src = "data:image/jpg;base64," + img_base64;
  // COMMENT
  const ctext = "Generate an array of 10 realistic comments in json an nothing else for this article:\n" + rtext;
  response = await fetch("serv/gen_text.php", {
    method: "POST",
    body: ctext,
  });
  const c_rtext = await response.text();
  const c_rbox = document.querySelector(".comment-result");
  c_rbox.textContent = c_rtext;


}
document.querySelector(".form-generate").addEventListener("submit", generate_apis);


