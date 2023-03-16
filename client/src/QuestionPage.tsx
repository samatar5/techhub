import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Question } from "./components/Question";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function QuestionPage() {
  const { id } = useParams();
  const {
    data: question,
    isLoading,
    isError,
  } = useQuery<Question>({
    queryKey: ["questions", id],
    queryFn: () =>
      fetch("http://localhost:3000/questions/" + id).then((data) =>
        data.json()
      ),
  });
  const [answer, setAnswer] = useState("");

  async function sendComment() {
    const response = await fetch(
      "http://localhost:3000/questions/" + id + "/comment",
      {
        method: "POST",
        body: JSON.stringify({ text: answer }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setAnswer("");
  }

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <div className="w-7 h-7 border-4 border-blue-500 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );

  if (isError) return <div>ooops, somthing went wrong</div>;
  console.log(question);

  return (
    <div>
      <div className="">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-2xl mb-2 text-gray-700">{question.title}</h2>
          <p className="text-sm text-gray-600">
            Asked:{" "}
            <span className="text-gray-800 ">
              {moment(question.createdAt).startOf("minute").fromNow()}
            </span>
          </p>
        </div>
        <p className="mb-10">{question.description}</p>
        <div>
          <label className="text-lg" htmlFor="answer-textarea">
            Leave an answer
          </label>
          <textarea
            id="description"
            className="bg-gray-100 border p-1 w-full min-h-[200px] "
            placeholder="this is a discription"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
          ></textarea>
          <button
            onClick={() => sendComment()}
            className="bg-[#0896ff] hover:opacity-90 ml-auto text-black rounded-md p-1.5 text-[13px"
          >
            Ask question
          </button>
        </div>
      </div>
    </div>
  );
}
