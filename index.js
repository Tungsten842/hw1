async function load_articles() {
  let body = new Object();
  if (get_category_id()) {
    body.category_id = get_category_id();
  }

  if (get_article_id()) {
    body.id = get_article_id();
  }

  const response = await fetch("/serv/get_articles.php", {
    method: "POST",
    body: JSON.stringify(body)
  });
  const data = await response.json();
  console.log(data);

  const main_view = document.querySelector('.main-view');

  const article_num = data.length;
  main_view.innerHTML += `
  <a href="/article.php?id=${data[0].id}" class=main-article>
    <div class=main-article-title>${data[0].title}</div>
    <div>${data[0].author}</div>
    <img class=main-image alt="" src=${data[0].image}>
  </a>
 `;

  //console.log(sec_articles);
  main_view.innerHTML += '<div class="secondary-articles"></div>';
  let sec_articles = document.querySelector('.secondary-articles');
  for (let i = 1; i < 6 && i < article_num; i++) {
    sec_articles.innerHTML += `
      <div class="article-block">
        <a href="/?cid=${data[i].categories[0].id}" class="article-block-category">
        ${data[i].categories[0].name}
        </a>
        <a href="/article.php?id=${data[i].id}" class="article-block-text">${data[i].title}</a>
        <div class="article-block-author">${data[i].author}</div>
      </div>
     `;
  }

  //let content = document.querySelector('.content');
  //content.innerHTML += '<div class=various-articles></div>';
  const various = document.querySelector(".various-articles");
  for (let i = 3; i < article_num; i++) {
    various.innerHTML += `
      <div class=various-articles-article>
        <div class=various-articles-article-infos>
          <a href="/?cid=${data[i].categories[0].id}" class=various-articles-article-category>
          ${data[i].categories[0].name}
          </a>
          <a href="/article.php?id=${data[i].id}" class=various-articles-article-title>
          ${data[i].title}
          </a>
          <div class=various-articles-article-author>
          ${data[i].author}
          </div>
        </div>
        <a href="/?id=${data[i].id}" class=various-articles-article-text>
          ${data[i].text.substring(0, 380)}
        </a>
      </div>
    `;
  }
}

load_articles();

