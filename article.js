function get_article_id() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id;
}

async function remove_comment(id) {
  let formData = new FormData()
  formData.append("id", id)
  const response = await fetch("/serv/remove_comment.php", {
    method: "POST",
    body: formData,
  });
  console.log(response);
  load_article();
}

async function load_article() {
  const request = { id: get_article_id() };

  const response = await fetch("/serv/get_articles.php", {
    method: "POST",
    body: JSON.stringify(request),
  });
  const data = await response.json();
  const article = data[0];

  console.log(data);

  content = document.querySelector("article");
  content.innerHTML = "";
  const html = `
    <div class=article-title>${article.title}</div>
    <div class=article-divider>
      <img class=article-image src=${article.image} alt >
      <div class=article-text>${article.text}</div>
    </div>
    <div class=article-author>${article.author}</div>
    <div class=article-categories>${article.categories}</div>
  `;
  content.insertAdjacentHTML("afterbegin", html);

  comments = document.querySelector(".article-comments");
  comments.innerHTML = "";

  for (const comm of article.comments) {
    const single_comment = document.createElement('div');
    single_comment.className = 'single-comment';
    comments.appendChild(single_comment);

    const comment_name = document.createElement('div');
    comment_name.className = 'comment-name';
    comment_name.textContent = comm.name;
    single_comment.appendChild(comment_name);

    const comment_delete = document.createElement('div');
    comment_delete.className = 'comment-delete';
    comment_delete.textContent = "✕";
    comment_delete.onclick = function() { remove_comment(comm.id) };
    single_comment.appendChild(comment_delete);

    const comment_text = document.createElement('div');
    comment_text.className = 'comment-text';
    comment_text.textContent = comm.text;
    single_comment.appendChild(comment_text);
  }
}
load_article();

async function commment_prompt() {
  let formData = new FormData();
  text_el = document.querySelector("#user-comment-text");
  formData.append("text", text_el.value);
  formData.append("id", get_article_id());

  const response = await fetch("/serv/submit_comment.php", {
    method: "POST",
    body: formData,
  });
  await response.text();
  load_article()
}

