import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ArticleCard.css";

function ArticleCard({ article, hideVote }) {
  const {
    title,
    topic,
    author,
    votes: initialVotes,
    comment_count,
    created_at,
    article_img_url,
    article_id,
  } = article;

  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteError, setVoteError] = useState("");

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
      <h2 className="article-title">
        <Link
          to={`/articles/${article.article_id}`}
          className="article-title-link"
        >
          {title}
        </Link>
      </h2>
      <div className="article-meta">
        <span className="article-label">Author:</span> {author}
      </div>
      <div className="article-meta">
        <span className="article-label">Topic:</span> {topic}
      </div>
      <div className="article-meta">
        <span className="article-label">Votes:</span> {votes}
        {!hideVote && !hasVoted && (
          <>
            <button
              className="vote-btn"
              onClick={async () => {
                setVotes(votes + 1); // Optimistic update
                setHasVoted(true);
                setVoteError("");
                try {
                  await axios.patch(
                    `https://nc-news-764k.onrender.com/api/articles/${article_id}`,
                    { inc_votes: 1 },
                  );
                } catch {
                  setVotes(votes); // revert
                  setVoteError("Failed to update vote. Please try again.");
                }
              }}
            >
              +
            </button>
            <button
              className="vote-btn"
              onClick={async () => {
                if (votes > 0) {
                  setVotes(votes - 1); // Optimistic update
                  setHasVoted(true);
                  setVoteError("");
                  try {
                    await axios.patch(
                      `https://nc-news-764k.onrender.com/api/articles/${article_id}`,
                      { inc_votes: -1 },
                    );
                  } catch {
                    setVotes(votes); // revert
                    setVoteError("Failed to update vote. Please try again.");
                  }
                }
              }}
            >
              -
            </button>
            {voteError && <div className="vote-error">{voteError}</div>}
          </>
        )}
        {" | "}
        <span className="article-label">Comments:</span> {comment_count}
      </div>
      <div className="article-meta">
        <span className="article-label">Published:</span> {formattedDate}
      </div>
    </div>
  );
}

export default ArticleCard;
