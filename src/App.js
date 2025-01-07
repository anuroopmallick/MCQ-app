import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import { useState } from "react";

function App() {
  let mcq = [
    {
      question: "What is the capital of Japan?",
      options: ["Seoul", "Beijing", "Tokyo", "Osaka"],
      answer: "Tokyo",
    },
    {
      question: "Which city is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      answer: "Canberra",
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "Lyon", "Marseille", "Nice"],
      answer: "Paris",
    },
  ];

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (selectedAnswer === mcq[currentQuestion].answer) {
      setSnackbarMessage("Correct Answer");
      setScore(score + 1);
    } else {
      setSnackbarMessage("Wrong Answer");
    }

    setShowSnackBar(true);

    if (currentQuestion + 1 < mcq.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setIsQuizComplete(true);
    }

    setTimeout(() => {
      setShowSnackBar(false);
    }, 2000);
  }

  function handleAnswerChange(event) {
    setSelectedAnswer(event.target.value);
  }

  if (isQuizComplete) {
    return (
      <div className="SummaryContainer">
        <div className="Summary">
          <h1>Quiz Complete!</h1>
          <p>
            You answered {score} out of {mcq.length} correctly!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="Container">
        <form className="Form" onSubmit={handleSubmit}>
          <p>Q. {mcq[currentQuestion].question}</p>
          <div className="Options">
            {mcq[currentQuestion].options.map((option, index) => (
              <div className="Option">
                <input
                  type="radio"
                  id={option}
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={handleAnswerChange}
                />
                <p>
                  {index + 1}. {option}
                </p>
              </div>
            ))}
          </div>
          <button>Submit</button>
        </form>
        {showSnackBar && <div className="Snackbar">{snackbarMessage}</div>}
      </div>
    </div>
  );
}

export default App;
