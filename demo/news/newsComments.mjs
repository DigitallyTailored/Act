export default {
    async values(v) {
        const response = await fetch(`https://node-hnapi.herokuapp.com/item/${v.newsId}`);
        const newsItem = await response.json();
        return { newsItem: newsItem };
    },
    style: (v) => `
    .comments-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    .comment {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .comment-user {
      font-weight: bold;
    }
    .comment-content {
      margin-top: 5px;
      white-space: pre-line;
    }
  `,
    view: (v) => `
    <div class="news-comments-wrapper">
      <h2>${v.newsItem.title}</h2>
      <ul class="comments-list">
        ${v.newsItem.comments.map(comment => `
          <li class="comment">
            <div class="comment-user">${comment.user}</div>
            <div class="comment-content">${comment.content}</div>
          </li>
        `).join('')}
      </ul>
    </div>
  `,
};