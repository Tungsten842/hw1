async function load_article() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const request = { id: id };

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
    <img id=a_img src="data:image/jpg;base64,${article.image}">
    <div id=a_text>${article.text}</div>
  `;
  content.insertAdjacentHTML("afterbegin", html);

  comments = document.querySelector("#a_comments");

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
