import React from "react";
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

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <div className="w-7 h-7 border-4 border-blue-500 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );

  if (isError) return <div>ooops, somthing went wrong</div>;
  console.log(question);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl mb-2 text-gray-700">{question.title}</h2>
        <p className="text-sm text-gray-600">
          Asked:{" "}
          <span className="text-gray-800">
            {moment(question.createdAt).startOf("day").fromNow()}
          </span>
        </p>
      </div>
      <p className="">{question.description}</p>
    </div>
  );
}
