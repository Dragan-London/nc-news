import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(null);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await axios.get(
          "https://nc-news-764k.onrender.com/api/topics/",
        );
        console.log(response.data.topics);
        setTopics(response.data.topics);
        setisLoading(false);
      } catch (err) {
        console.log(err);
        setisError(true);
      }
    }
    fetchTopics();
  }, []);

  if (isError) {
    return <p>ERROR</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ul>
            {topics.map((topic) => (
              <li key={topic.slug}>
                <p>{topic.slug}</p>
                <p>{topic.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopicsPage;
