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
  content.innerHTML += `
    <h2 id=a_title>${article.title}</h2>
    <div id=a_author>${article.author}</div>
    <img id=a_img src="data:image/jpg;base64,${article.image}">
    <div id=a_text>${article.text}</div>
  `;
  content.innerHTML += "<div id=a_comments></div>"
  comments = document.querySelector("#a_comments");

  for (const comm of article.comments) {
    comments.innerHTML += `<div>${comm.name}</div>`;
    comments.innerHTML += `<div>${comm.text}</div>`;
  }
}
load_article();
