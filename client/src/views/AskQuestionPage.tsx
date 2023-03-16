import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AskQuestionPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function sendQuestion() {
    const response = await fetch("http://localhost:3000/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });
    const data = await response.json();
    setTitle("");
    setDescription("");
    navigate("/questions/" + data._id);
    console.log(data);
  }
  return (
    <div>
      <h2 className="text-3xl mb-6">Ask a question on Tachhub</h2>
      <label htmlFor="title">Title</label>
      <textarea
        id="title"
        className="bg-gray-100 border p-1 w-full min-h-[50px]"
        placeholder="this is a title"
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        className="bg-gray-100 border p-1 w-full min-h-[200px] "
        placeholder="this is a discription"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        onClick={() => sendQuestion()}
        className="bg-[#0896ff] hover:opacity-90 ml-auto text-black rounded-md p-1.5 text-[13px"
      >
        Ask question
      </button>
    </div>
  );
}
