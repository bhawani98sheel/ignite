import { useState } from "react";

const questions = [
  {
    question: "React is mainly used for?",
    options: ["Database management", "User Interface", "Networking", "Security"],
    answer: "User Interface",
  },
  {
    question: "Which hook is used for managing state?",
    options: ["useState", "useEffect", "useContext", "useRef"],
    answer: "useState",
  },
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "Java Styled XML",
      "None of the above",
    ],
    answer: "JavaScript XML",
  },
];

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);

  const handleAnswer = () => {
    if (selected === "") return;

    if (selected === questions[currentQ].answer) {
      setScore(score + 1);
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelected("");
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected("");
    setFinished(false);
  };

  return (
    <div className="bg-white shadow p-6 rounded-md max-w-lg">
      {!finished ? (
        <>
          <h4 className="text-lg font-semibold mb-4">
            {questions[currentQ].question}
          </h4>

          <div className="space-y-2 mb-4">
            {questions[currentQ].options.map((option, i) => (
              <label
                key={i}
                className={`block p-2 border rounded cursor-pointer ${
                  selected === option ? "bg-indigo-100 border-indigo-400" : ""
                }`}
              >
                <input
                  type="radio"
                  name="quiz-option"
                  value={option}
                  checked={selected === option}
                  onChange={(e) => setSelected(e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          <button
            onClick={handleAnswer}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {currentQ + 1 === questions.length ? "Finish Quiz" : "Next"}
          </button>
        </>
      ) : (
        <div className="text-center">
          <h4 className="text-xl font-bold mb-4">
            🎉 You scored {score} / {questions.length}
          </h4>
          <button
            onClick={restartQuiz}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
