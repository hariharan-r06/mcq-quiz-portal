import axios from "axios";
import React, { useState, useEffect } from "react";
import quizQuestions from "../quizQuestions.json";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false); 
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      window.location.href = "/register";
      return;
    }

  
    const checkQuizTaken = async () => {
      try {
        console.log("Checking quiz status for student ID:", studentId);
        const response = await axios.get(`http://localhost:8080/api/student/mark/${studentId}`);
        console.log("Response data:", response.data);
        if (response.data !== null) {
         
          console.log("Student has already taken the quiz (mark found)");
        } else {
          console.log("Student hasn't taken the quiz yet, proceeding...");
        }
      
      } catch (error) {
        console.error("Error checking quiz status:", error);
      
      }
    };

    checkQuizTaken();
  }, []);   

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    const next = currentQuestion + 1;
    if (next < quizQuestions.length) {
      setCurrentQuestion(next);
      setSelectedOption("");
    } else {
      setIsFinished(true); 
    }
  };

  const handleShowScore = async () => {
    setShowScore(true);

    const studentId = localStorage.getItem("studentId");
    if (studentId) {
      try {
       await axios.post("http://localhost:8080/api/student/mark", {
  studentId: Number(studentId),
  studentMark: score,
});
      
        localStorage.removeItem("studentId");
      } catch (error) {
        console.error("Error saving score:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
    <h2 className="text-2xl font-bold mb-4 text-center">Quiz</h2>

    {!isFinished && (
      <div>
        <p className="text-lg font-medium mb-4">
          Q{currentQuestion + 1}: {quizQuestions[currentQuestion].question}
        </p>
        <div className="grid grid-cols-1 gap-3">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`px-4 py-2 rounded-md border transition-colors cursor-pointer ${
                selectedOption === option
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Next
        </button>
      </div>
    )}

    {isFinished && !showScore && (
      <div className="text-center">
        <p className="mb-4 text-lg font-medium">Quiz Completed!</p>
        <button
          onClick={handleShowScore}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Show Score
        </button>
      </div>
    )}

    {showScore && (
      <div className="text-center mt-4">
        <h3 className="text-xl font-semibold">
          Your Score: {score} / {quizQuestions.length}
        </h3>
      </div>
    )}
  </div>
</div>

  );
};

export default Quiz;
