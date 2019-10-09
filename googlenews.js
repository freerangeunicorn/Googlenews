let news = [];
let pageNum = 1;
async function fetchNews() {
  console.log("here");
  let url = `https://newsapi.org/v2/top-headlines?country=US&apiKey=b092ae90ed984bbfa434086627f1a08d&page=${pageNum}`;
  let result = await fetch(url);
  let data = await result.json();
  news = news.concat(data.articles);
  console.log("newslist", data.totalResults);

  renderNews(news);
  renderArticleCount(news);
  pageNum = pageNum + 1;
  document.getElementById("totalcount").innerHTML = data.totalResults;
}

fetchNews();

function renderNews(arr) {
  const html = arr.map(article => {
    return `
        <div class="articlebox">

        <div id="newsList" class="leftbox">
        <h2 id="title">${article.title}</h2>
        <h2 id="contents">${article.content}</h2>
        <div id="source">${article.source.name}
        <div id="date">${moment(article.publishedAt).fromNow()}</div>
        <a href="${article.url}">view more</a>
        </div>
</div>
<div class="rightbox">
        <img class="imagearticle" src="${article.urlToImage}">
        </div>
    </div>
        `;
  });

  document.getElementById("articles").innerHTML = html;
}

const renderArticleCount = arr => {
  document.getElementById("count").innerHTML = arr.length;
};
