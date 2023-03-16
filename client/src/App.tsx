import React from "react";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import QuestionPage from "./QuestionPage";
import AskQuestionPage from "./views/AskQuestionPage";
import HomePage from "./views/HomePage";
function App() {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-4xl mx-auto py-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions/:id" element={<QuestionPage />} />
          <Route path="/ask-question" element={<AskQuestionPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
