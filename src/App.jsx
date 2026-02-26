import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import UserPage from "./components/UserPage";
import Home from "./components/Home";
import Topics from "./components/Topics";
import Article from "./components/Article";
import Comments from "./components/Comments";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:username" element={<UserPage />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/articles/:article_id" element={<Article />} />
          <Route
            path="/articles/:article_id/comments/"
            element={<Comments />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
