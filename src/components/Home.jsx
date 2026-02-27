import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Article from "./Article";
import axios from "axios";
import ArticleCard from "./ArticleCard";

function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get(
          "https://nc-news-764k.onrender.com/api/articles/",
        );
        console.log(response.data.articles);
        setArticles(response.data.articles);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsError(true);
      }
    }
    fetchArticles();
  }, []);

  if (isError) {
    return <p>ERROR</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <section>
      <h2>Home - All Articles</h2>
      <p>Browse articles by topic, sort, and see details.</p>
      <div>
        {articles.map((article) => (
          <div key={article.article_id}>
            <hr />
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
