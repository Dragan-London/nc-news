import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import "./Article.css";

function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await axios.get(
          `https://nc-news-764k.onrender.com/api/articles/${article_id}`,
        );
        setArticle(response.data.article);
        setisLoading(false);
      } catch {
        setisError(true);
      }
    }
    fetchArticle();
  }, [article_id]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(
          `https://nc-news-764k.onrender.com/api/articles/${article_id}/comments`,
        );
        setComments(response.data.comments);
      } catch {
        setisError(true);
      }
    }
    fetchComments();
  }, [article_id]);

  if (isError) {
    return <p>ERROR</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ArticleCard article={article} />
      <h3>Article Content</h3>
      {article.body && (
        <div className="article-body-section">
          <p>{article.body}</p>
        </div>
      )}
      <div className="comments-section">
        <h3>Comments</h3>
        <form
          className="comment-form"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!newComment.trim()) return;
            setIsSubmitting(true);
            setSubmitError("");
            try {
              const response = await axios.post(
                `https://nc-news-764k.onrender.com/api/articles/${article_id}/comments`,
                {
                  username: "grumpy19",
                  body: newComment,
                },
              );
              setComments([response.data.comment, ...comments]);
              setNewComment("");
            } catch {
              setSubmitError("Failed to post comment. Please try again.");
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <textarea
            className="comment-textarea"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            placeholder="Write your comment..."
            disabled={isSubmitting}
          />
          <br />
          <button
            className="comment-submit-btn"
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
          {submitError && <div className="comment-error">{submitError}</div>}
        </form>
        {comments.map((comment) => {
          const date = new Date(comment.created_at);
          const formattedDate = date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <div key={comment.comment_id} className="comment-card">
              <div className="comment-author">{comment.author}</div>
              <div className="comment-body">{comment.body}</div>
              <div className="comment-date">Posted: {formattedDate}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Article;
