import React from "react";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./views/HomePage";
function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions/:id" element={<div>hej från en fråga</div>} />
      </Routes>
    </div>
  );
}

export default App;
