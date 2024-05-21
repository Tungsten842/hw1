async function load_articles() {
  const response = await fetch("serv/get_articles.php", {
    method: "POST",
    body: "",
  });
  const data = await response.json();
  //console.log(arr);
  console.log(data);

  const main_article = document.querySelector(".main-article");

  const article_num = data.length;
  console.log(article_num);

  main_article.innerHTML += `
        <div class=main-article-title>
        ${data[0].title}
        </div>
        <div>
        ${data[0].author}
        </div>
        <img class=main-image alt="" src=data:image/jpg;base64,${data[0].image}>
 `;

  let sec_articles = document.querySelector('.secondary-articles');
  //console.log(sec_articles);
  for (let i = 1; i < 3 && i < article_num; i++) {
    sec_articles.innerHTML += `
      <div class="article-block">
        <div class="article-block-category">${data[i].categories[0]}</div>
        <h3 class="article-block-text">${data[i].title}</h3>
        <div class="article-block-author">${data[i].author}</div>
      </div>
     `;
  }

  const various = document.querySelector(".various-articles");

  for (let i = 3; i < article_num; i++) {
    various.innerHTML += `
      <div class=various-articles-article>
        <div class=various-articles-article-infos>
          <div class=various-articles-article-category>
          ${data[i].categories[0]}
          </div>
          <h3 class=various-articles-article-title>
          ${data[i].title}
          </h3>
          <div class=various-articles-article-author>
          ${data[i].author}
          </div>
        </div>
        <div class=various-articles-article-text>
          ${data[i].text.substring(0, 380)}
        </div>
      </div>
    `;
  }

}
load_articles();

