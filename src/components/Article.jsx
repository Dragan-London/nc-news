import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await axios.get(
          `https://nc-news-764k.onrender.com/api/articles/${article_id}`,
        );
        setArticle(response.data.article);
        setisLoading(false);
      } catch (err) {
        console.log(err);
        setisError(true);
      }
    }
    fetchArticle();
  }, [article_id]);

  if (isError) {
    return <p>ERROR</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Article {article_id}</h1>
      <div>
        <h2>{article.title}</h2>
        <p>Topic: {article.topic}</p>
        <p>Created By: {article.author}</p>
        <p>{article.body}</p>
      </div>
    </div>
  );
}

export default Article;
