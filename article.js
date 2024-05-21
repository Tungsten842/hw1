function get_article_id() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id;
}

async function load_article() {
  const request = { id: get_article_id() };

  const response = await fetch("serv/get_articles.php", {
    method: "POST",
    body: JSON.stringify(request),
  });
  const data = await response.json();
  const article = data[0];

  console.log(data);

  content = document.querySelector(".content");
  const html = `
    <h2 id=a_title>${article.title}</h2>
    <div id=a_author>${article.author}</div>
    <img alt="" id=a_img src="data:image/jpg;base64,${article.image}">
    <div id=a_text>${article.text}</div>
  `;
  content.insertAdjacentHTML("afterbegin", html);

  comments = document.querySelector("#a_comments");
  comments.innerHTML = "";

  for (const comm of article.comments) {
    const single_comment = document.createElement('div');
    single_comment.className = 'single_comment';
    comments.appendChild(single_comment);

    const comment_name = document.createElement('div');
    comment_name.className = 'comment_name';
    comment_name.textContent = comm.name;
    single_comment.appendChild(comment_name);

    const comment_text = document.createElement('div');
    comment_text.className = 'comment_text';
    comment_text.textContent = comm.text;
    single_comment.appendChild(comment_text);
  }
}
load_article();

async function commment_prompt() {
  var formData = new FormData();
  text_el = document.querySelector("#comment-text");
  formData.append(text_el.name, text_el.value);
  formData.append("id", get_article_id());

  const response = await fetch("serv/submit_comment.php", {
    method: "POST",
    body: formData,
  });
  await response.text();
  load_article()
}

