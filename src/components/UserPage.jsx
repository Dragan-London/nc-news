import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ArticleCard from "./ArticleCard";

function UserPage() {
  const { username } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchUserArticles() {
      try {
        const response = await axios.get(
          `https://nc-news-764k.onrender.com/api/articles?author=${username}`,
        );
        setArticles(response.data.articles);
        setIsLoading(false);
      } catch {
        setIsError(true);
      }
    }
    fetchUserArticles();
  }, [username]);

  if (isError)
    return (
      <div className="userpage-container">Error loading user articles.</div>
    );
  if (isLoading) return <div className="userpage-container">Loading...</div>;

  return (
    <div className="userpage-container">
      <div className="user-card">
        <div className="user-avatar">{username[0] || "u"}</div>
        <div className="user-name">{username}</div>
      </div>

      <div className="articles-title">Articles by this user:</div>
      {articles.length === 0 && <div>No articles found for this user.</div>}
      {articles.map((article) => (
        <div key={article.article_id}>
          <hr />
          <ArticleCard article={article} hideVote={true} />
        </div>
      ))}
    </div>
  );
}

export default UserPage;
