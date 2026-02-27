import "./ArticleCard.css";

function ArticleCard({ article }) {
  const {
    title,
    topic,
    author,
    votes,
    comment_count,
    created_at,
    article_img_url,
  } = article;

  // Format date (it came as seconds)
  const date = new Date(created_at);
  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="article-card">
      <img
        className="article-img"
        src={
          article_img_url || "https://via.placeholder.com/100x100?text=No+Image"
        }
        alt={title}
      />
      <h2 className="article-title">{title}</h2>
      <div className="article-meta">
        <span className="article-label">Author:</span> {author}
      </div>
      <div className="article-meta">
        <span className="article-label">Topic:</span> {topic}
      </div>
      <div className="article-meta">
        <span className="article-label">Votes:</span> {votes} |{" "}
        <span className="article-label">Comments:</span> {comment_count}
      </div>
      <div className="article-meta">
        <span className="article-label">Published:</span> {formattedDate}
      </div>
    </div>
  );
}

export default ArticleCard;
