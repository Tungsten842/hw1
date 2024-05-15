async function load_articles() {
  const response = await fetch("serv/get_articles.php", {
    method: "POST",
    body: "",
  });
  const arr = await response.json();
  //console.log(arr);
  const main = document.querySelector(".main-article");
  ch = main.children;
  ch[0].textContent = arr[0][0];
  ch[1].textContent = arr[0][1];

  let sec_articles = document.querySelectorAll('.article-block');
  //console.log(sec_articles);
  for (let n = 0; n < sec_articles.length; n++) {
    child = sec_articles[n].children;
    //console.log(child);
    child[1].textContent = arr[1 + n][0];
  }
  const various = document.querySelector(".various-articles");

  for (let i = 5; i < 10; i++) {
    /*
    let div = document.createElement("div");
    let newContent = document.createTextNode(arr[i][0]);
    article.appendChild(newContent);
    article.classList.add('various-articles-article');
    various.appendChild(div);

    div1 = document.createElement("div");
    newContent = document.createTextNode(arr[i][0]);
    article.appendChild(newContent);
    article.classList.add('various-articles-article-infos');
    div.appendChild(div1);
    */
    various.innerHTML += `
      <div class=various-articles-article>
        <div class=various-articles-article-infos>
          <div class=various-articles-article-category>
          Startup
          </div>
          <h3 class=various-articles-article-title>
          ${arr[i][0]}
          </h3>
          <div class=various-articles-article-author>
          Kate park
          </div>
        </div>
        <div class=various-articles-article-text>
          ${arr[i][1]}
        </div>
      </div>
    `;
  }

}
load_articles();

