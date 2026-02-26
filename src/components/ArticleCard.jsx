function ArticleCard({ article }) {
  const { article_id, title, topic, author, body } = article;
  return (
    <div>
      <h1>Article {article_id}</h1>
      <div>
        <h2>{title}</h2>
        <p>Topic: {topic}</p>
        <p>Created By: {author}</p>
        <p>{body}</p>
      </div>
    </div>
  );
}

export default ArticleCard;
