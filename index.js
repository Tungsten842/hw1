async function load_articles() {
  const response = await fetch("/serv/get_articles.php", {
    method: "POST",
  });
  const data = await response.json();
  console.log(data);

  const main_view = document.querySelector('.main-view');

  const article_num = data.length;
  main_view.innerHTML += `
  <a href="article.php?id=${data[0].id}" class=main-article>
    <div class=main-article-title>${data[0].title}</div>
    <div>${data[0].author}</div>
    <img class=main-image alt="" src=data:image/jpg;base64,${data[0].image}>
  </a>
 `;

  //console.log(sec_articles);
  main_view.innerHTML += '<div class="secondary-articles"></div>';
  let sec_articles = document.querySelector('.secondary-articles');
  for (let i = 1; i < 6 && i < article_num; i++) {
    sec_articles.innerHTML += `
      <a href="article.php?id=${data[i].id}" class="article-block">
        <div class="article-block-category">${data[i].categories[0]}</div>
        <h3 class="article-block-text">${data[i].title}</h3>
        <div class="article-block-author">${data[i].author}</div>
      </a>
     `;
  }

  //let content = document.querySelector('.content');
  //content.innerHTML += '<div class=various-articles></div>';
  const various = document.querySelector(".various-articles");
  for (let i = 3; i < article_num; i++) {
    various.innerHTML += `
      <a href="article.php?id=${data[i].id}" class=various-articles-article>
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
      </a>
    `;
  }
}

load_articles();

