import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, answers, quizQuestions } = location.state || {}; // Extract quiz data if available

  // Function to handle starting a new quiz
  const startQuiz = () => {
    navigate('/quiz'); // Redirect to quiz page
  };

  // Function to display the quiz report
  const reportGen = () => {
    if (score === undefined) {
      alert('No quiz report available. Please take the quiz first!');
      return;
    }
    alert('Displaying your quiz report below.');
  };

  // Logout logic
  const logout = () => {
    try {
      // Clear user-related data from local storage
      localStorage.clear();
      alert('You have been logged out.');
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const name = localStorage.getItem('name') || 'User'; // Retrieve user name from localStorage

  return (
    <>
      {/* Logout button aligned to the top-right */}
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger mt-3 me-3" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Dashboard Content */}
      <div className="container text-center mt-5">
        <h1>Welcome to your Dashboard</h1>
        <p>Hi {name}, you're logged in. Ready to start your quiz?</p>

        <div className="mt-4">
          <button className="btn btn-primary me-3" onClick={startQuiz}>
            Start Quiz
          </button>
          <button className="btn btn-secondary" onClick={reportGen}>
            View Report
          </button>
        </div>

        {/* Conditional rendering for quiz report */}
        {score !== undefined && (
          <div className="mt-5">
            <h3>Your Quiz Report</h3>
            <p>Score: {score} / {quizQuestions?.length || 0}</p>
            <ul className="list-group mt-3">
              {quizQuestions.map((question) => (
                <li className="list-group-item" key={question.id}>
                  <h5>{question.question}</h5>
                  <p>Correct Answer: {question.correctAnswer}</p>
                  <p>Your Answer: {answers[question.id] || 'No Answer'}</p>
                  <p>
                    {answers[question.id] === question.correctAnswer ? (
                      <span className="text-success">Correct</span>
                    ) : (
                      <span className="text-danger">Incorrect</span>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
