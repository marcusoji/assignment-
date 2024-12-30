const { useState } = React;
// Function to shuffle an array randomly
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

// Questions
const allQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Rome'],
    correctAnswer: 0,
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Saturn', 'Jupiter', 'Uranus'],
    correctAnswer: 2,
  },
  {
    question: 'What is the chemical symbol for water?',
    options: ['O2', 'H2O', 'CO2', 'N2'],
    correctAnswer: 1,
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Shakespeare', 'Dickens', 'Hemingway', 'Austen'],
    correctAnswer: 0,
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    correctAnswer: 2,
  },
  {
    question: 'Which OF the following is odd?',
    options: ['Spoon', 'Pin', 'Scissors', 'Needle'],
    correctAnswer: 0,
  },
  {
    question: 'Which state in Nigeria has the least local Government?',
    options: ['Kogi', 'Lagos', 'Bayelsa', 'Kebbi'],
    correctAnswer: 2,
  },
  {
    question: 'What is the 2nd largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    correctAnswer: 0,
  },
  {
    question: 'Which Mineral brings the most revenue for Nigeria?',
    options: ['Coal', 'Cotton', 'Petrol', 'Petroleum'],
    correctAnswer: 3,
  },
  {
    question: '1+1 in binary is equal to what?',
    options: ['11', 'TRUE', 'FALSE', '10'],
    correctAnswer: 3,
  },
  {
    question: 'What is the capital of Chile?',
    options: ['Cuba', 'Santiago', 'Vida', 'Moscow'],
    correctAnswer: 1,
  },
  {
    question: 'What is the Capital of Scotland?',
    options: ['Glasgow', 'Cardiff', 'Edinburgh', 'Bucharest'],
    correctAnswer: 0,
  },
  {
    question: 'IP stands for?',
    options: ['Internet Protocol', 'Intranet Protocol', 'Int Position', 'NONE'],
    correctAnswer: 0,
  },
  {
    question: '3x - 4 = 5, find x?',
    options: ['1', '3.2', '0.3', '3'],
    correctAnswer: 2,
  },
  {
    question: 'There are _____ continents in the world?',
    options: ['4', '7', '3', '5'],
    correctAnswer: 1,
  },
  {
    question: 'A ____ Has horns',
    options: ['cat', 'cow', 'rat', 'camel'],
    correctAnswer: 1,
  },
  {
    question: 'Who Discovered Electricity ',
    options: ['Ohms', 'Faraday', 'Pascal', 'Hooke'],
    correctAnswer: 1,
  },
  {
    question: 'The fastest animal in the world is a ____',
    options: ['cat', 'fish', 'bird', 'man'],
    correctAnswer: 2,
  },
  {
    question: 'Football and Tennis are contact sports',
    options: ['True', 'False', 'in between', 'None'],
    correctAnswer: 1,
  },
  {
    question: 'Who created the first car',
    options: ['Tesla', 'Benz', 'Bell', 'Suzuki'],
    correctAnswer: 1,
  },
];

// Question Component
const Question = ({ question, options, handleAnswer, currentQuestion, userAnswer }) => (
  <div className="question-container">
    <h2>{question}</h2>
    <div className="option-container">
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            name={`question-${currentQuestion}`}
            id={`option-${index}`}
            value={option}
            checked={userAnswer === option}
            onChange={() => handleAnswer(option)}
          />
          <label htmlFor={`option-${index}`}>{option}</label>
        </div>
      ))}
    </div>
  </div>
);

// Result Component
const Result = ({ userAnswers, questions, handleRestart, handleQuit }) => {
  const correctAnswers = questions.map((question, index) => {
    return question.options[question.correctAnswer] === userAnswers[index];
  });

  const score = correctAnswers.filter((answer) => answer).length;

  return (
    <div className="result">
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} / {questions.length}</p>
      <div>
        <h3>Your Answers:</h3>
        {questions.map((question, index) => (
          <div key={index} className="answer-detail">
            <p><strong>{question.question}</strong></p>
            <p>Your answer: {userAnswers[index]}</p>
            <p>Correct answer: {question.options[question.correctAnswer]}</p>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={handleRestart}>Restart Quiz</button>
        <button onClick={handleQuit}>Quit Quiz</button>
      </div>
    </div>
  );
};

// QuizContainer Component
const QuizContainer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(5); // Default to 5 questions
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Handle answering a question
  const handleAnswer = (answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: answer,
    }));
    setUserAnswer(answer);

    // Move to the next question after answering
    if (currentQuestion < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer(null); // Reset user answer for the next question
      }, 1000); // 1 second delay to let the user see their answer
    } else {
      setQuizCompleted(true); // Set quiz as completed
    }
  };

  // Start the quiz
  const handleStartQuiz = () => {
    // Shuffle questions before starting
    const shuffled = shuffleArray([...allQuestions]);
    setShuffledQuestions(shuffled);
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setUserAnswers({});
    setUserAnswer(null);
  };

  // Handle change of number of questions
  const handleChangeTotalQuestions = (event) => {
    setTotalQuestions(Number(event.target.value));
  };

  // Handle restart quiz
  const handleRestart = () => {
    setQuizStarted(false); // Go back to the start screen
    setQuizCompleted(false); // Reset completion state
    setCurrentQuestion(0); // Reset question counter
    setUserAnswers({}); // Clear user answers
    setUserAnswer(null); // Clear current answer
    setShuffledQuestions([]); // Clear shuffled questions
  };

  // Handle quit quiz
  const handleQuit = () => {
    setQuizStarted(false); // Exit quiz
    window.location.href = 'https://www.google.com'; // Redirect to Google
  };

  // Slice the shuffled questions based on the total selected
  const questionsToDisplay = shuffledQuestions.slice(0, totalQuestions);

  return (
    <div className="quiz-container">
      {/* Start Quiz Section */}
      {!quizStarted && (
        <div className="start-quiz">
          <h1>Welcome to the Quick Quiz App!(rated 5)</h1>
          <div>
            <label>Choose number of questions </label>
            <select onChange={handleChangeTotalQuestions} value={totalQuestions}>
              {[5,10,15,20].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      )}

      {/* Question Section */}
      {quizStarted && !quizCompleted && (
        <Question
          question={questionsToDisplay[currentQuestion].question}
          options={questionsToDisplay[currentQuestion].options}
          handleAnswer={handleAnswer}
          currentQuestion={currentQuestion}
          userAnswer={userAnswer}
        />
      )}

      {/* Result Section */}
      {quizCompleted && (
        <Result
          userAnswers={userAnswers}
          questions={questionsToDisplay}
          handleRestart={handleRestart}
          handleQuit={handleQuit}
        />
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="app-container">
      <QuizContainer />
    </div>
  );
};

// Render the app using React 18's new createRoot() method
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
