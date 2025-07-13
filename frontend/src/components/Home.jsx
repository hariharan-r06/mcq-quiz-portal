import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen px-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-blue-700">
        Welcome to the MCQ Quiz Portal
      </h1>

      <p className="text-center text-gray-700 text-lg max-w-2xl mb-8">
        Test your knowledge with our interactive multiple-choice quiz. Whether you're revising
        or practicing for an exam.
      </p>

      <div className="grid sm:grid-cols-1 gap-6 max-w-4xl mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Register with your Student ID and Name</li>
            <li>One student can only take the quiz once </li>
            <li>Answer all the questions in the quiz</li>
            <li>Submit to view your score and save it</li>
            <li>Stores your score with your student ID</li>
          </ul>
        </div>
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition cursor-pointer"
        onClick={() => window.location.href = "/register"}
      >
        Click to Register
      </button>
    </div>
  );
};

export default Home;
