export default {
    values: v => ({
        newsList: []
    }),
    style: (v) => `
    .news-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    .news-item {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .news-title a {
      color: #333;
      text-decoration: none;
    }
    .news-info {
      font-size: 12px;
      color: #999;
    }
  `,
    view: (v) => `
    <div class="news-list-wrapper">
      <ul class="news-list">
        
      </ul>
    </div>
  `,
    script: async (v) => {
        const response = await fetch(`https://node-hnapi.herokuapp.com/news?page=${v.page}`);
        const newsList = await response.json();
        console.trace(newsList);
        /*
        ${v.newsList.map(news => `
          <li class="news-item">
            <div class="news-title">
              <a href="${news.url}" target="_blank">${news.title}</a>
            </div>
            <div class="news-info">
              ${news.points} points by ${news.user} | ${news.comments_count} comments
            </div>
          </li>
        `).join('')}
         */
        const newsOutput = v.act.find('.news-list')
        newsList.forEach(news => {

            act.append( `
          <li class="news-item">
            <div class="news-title">
              <a href="${news.url}" target="_blank">${news.title}</a>
            </div>
            <div class="news-info">
              ${news.points} points by ${news.user} | ${news.comments_count} comments
            </div>
          </li>
        `, newsOutput)

        })

    }
};