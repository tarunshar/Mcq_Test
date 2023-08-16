import React, { useState } from 'react';
import questionsData from './questions.json';
import './App.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const currentQuestion = questionsData[currentQuestionIndex];
  const correctAnswer = currentQuestion.correctAnswer;

  const progressBarWidth = ((currentQuestionIndex + 1) / questionsData.length) * 100;
  const totalScorePercentage = ((score / questionsData.length) * 100).toFixed(2);

  const maxScore = questionsData.length;
  const maxScorePercentage = ((currentQuestionIndex + 1) / maxScore) * 100;

  const handleChoiceClick = (choice) => {
    if (!answeredQuestions.includes(currentQuestionIndex)) {
      setSelectedChoice(choice);
    }
  };

  const displayFeedback = () => {
    if (selectedChoice === correctAnswer) {
      return <div className="feedback">Correct!</div>;
    } else if (selectedChoice !== null) {
      return <div className="feedback">Sorry. Please try again.</div>;
    }
  };

  const handleNextClick = () => {
    if (!answeredQuestions.includes(currentQuestionIndex)) {
      if (selectedChoice === correctAnswer) {
        setScore(score + 1);
      }
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
    }
    setSelectedChoice(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div className="App">
      <div className="progressBarContainer">
        <div className="progressBar" style={{ width: `${progressBarWidth}%` }}></div>
      </div>
      <div className="topBar">Question {currentQuestionIndex + 1} of {questionsData.length}</div>
      <div className="question">
        <p>{currentQuestion.question}</p>
        <div className="optionContainer">
          {currentQuestion.choices.map((choice, index) => (
            <div
              key={index}
              className={`optionCard ${selectedChoice === choice ? 'selected' : ''}`}
              onClick={() => handleChoiceClick(choice)}
            >
              {choice}
            </div>
          ))}
        </div>
      </div>
      <div className="stars">Difficulty: {Array(currentQuestion.difficulty).fill('★').join('')}{Array(3 - currentQuestion.difficulty).fill('☆').join('')}</div>
      {displayFeedback()}
      {selectedChoice && (
        <button className="nextButton" onClick={handleNextClick}>
          {currentQuestionIndex === questionsData.length - 1 ? "Finish" : "Next Question"}
        </button>
      )}

      <div className="bottomBar">
        <div className="score">
          Score: {totalScorePercentage}%
        </div>
        <div className="progressContainerBottom">
          <div className="progressBarBottom" style={{ width: `${totalScorePercentage}%` }}></div>
        </div>
        <div className="maxScoreText">Max Score:{maxScorePercentage}%</div>
      </div>
    </div>
  );
}

export default App;
