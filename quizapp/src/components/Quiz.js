import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

function Quiz() {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if quiz is submitted
  const [error, setError] = useState(''); // Track validation errors
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
    const quizQuestions = [
        { 
            id: 1, 
            question: 'What is the value of x in the equation 2x + 5 = 15?', 
            options: ['10', '5', '15'], 
            correctAnswer: '5' 
          },
          { 
            id: 2, 
            question: 'Simplify 3x - 2x + 4:', 
            options: ['x + 4', '2x + 4', 'x - 4'], 
            correctAnswer: 'x + 4' 
          },
          { 
            id: 3, 
            question: 'If x^2 - 9 = 0, what are the values of x?', 
            options: ['±3', '-3, 0', '3, 9'], 
            correctAnswer: '±3' 
          },
          { 
            id: 4, 
            question: 'Solve for x: 5x + 3 = 2x + 12', 
            options: ['3', '-3', '9'], 
            correctAnswer: '3' 
          },
          { 
            id: 5, 
            question: 'What is the slope of the line represented by y = 3x + 7?', 
            options: ['3', '7', '-3'], 
            correctAnswer: '3' 
          },
        //   { 
        //     id: 6, 
        //     question: 'Simplify: (2x + 3)(x - 4):', 
        //     options: ['2x^2 - 5x - 12', '2x^2 + 5x + 12', '2x^2 - 8x + 12'], 
        //     correctAnswer: '2x^2 - 5x - 12' 
        //   },
        //   { 
        //     id: 7, 
        //     question: 'What is the solution of 2x - 4 = 10?', 
        //     options: ['3', '7', '2'], 
        //     correctAnswer: '7' 
        //   },
        //   { 
        //     id: 8, 
        //     question: 'Factorize x^2 + 5x + 6:', 
        //     options: ['(x + 2)(x + 3)', '(x + 1)(x + 6)', '(x - 2)(x - 3)'], 
        //     correctAnswer: '(x + 2)(x + 3)' 
        //   },
        //   { 
        //     id: 9, 
        //     question: 'What is the value of x in x/2 + 5 = 9?', 
        //     options: ['2', '8', '4'], 
        //     correctAnswer: '8' 
        //   },
        //   { 
        //     id: 10, 
        //     question: 'Simplify: 4(2x + 3):', 
        //     options: ['8x + 12', '8x + 3', '2x + 12'], 
        //     correctAnswer: '8x + 12' 
        //   },
          

        //   { 
        //     id: 11, 
        //     question: 'What is the sum of interior angles of a triangle?', 
        //     options: ['90°', '180°', '360°'], 
        //     correctAnswer: '180°' 
        //   },
        //   { 
        //     id: 12, 
        //     question: 'What is the area of a rectangle with length 5 and width 3?', 
        //     options: ['15', '8', '5'], 
        //     correctAnswer: '15' 
        //   },
        //   { 
        //     id: 13, 
        //     question: 'A circle has a radius of 7 cm. What is its circumference (use π = 22/7)?', 
        //     options: ['44 cm', '22 cm', '14 cm'], 
        //     correctAnswer: '44 cm' 
        //   },
        //   { 
        //     id: 14, 
        //     question: 'What is the Pythagorean theorem?', 
        //     options: ['a^2 + b^2 = c^2', 'a^2 - b^2 = c^2', 'a^2 / b^2 = c^2'], 
        //     correctAnswer: 'a^2 + b^2 = c^2' 
        //   },
        //   { 
        //     id: 15, 
        //     question: 'What is the volume of a cube with side length 4?', 
        //     options: ['64', '16', '32'], 
        //     correctAnswer: '64' 
        //   },
        //   { 
        //     id: 16, 
        //     question: 'What is the measure of each angle in an equilateral triangle?', 
        //     options: ['45°', '90°', '60°'], 
        //     correctAnswer: '60°' 
        //   },
        //   { 
        //     id: 17, 
        //     question: 'A rectangle has a perimeter of 20 cm and a length of 6 cm. What is its width?', 
        //     options: ['4 cm', '2 cm', '3 cm'], 
        //     correctAnswer: '4 cm' 
        //   },
        //   { 
        //     id: 18, 
        //     question: 'A triangle has sides 6 cm, 8 cm, and 10 cm. What type of triangle is it?', 
        //     options: ['Right-angled', 'Isosceles', 'Equilateral'], 
        //     correctAnswer: 'Right-angled' 
        //   },
        //   { 
        //     id: 19, 
        //     question: 'What is the area of a triangle with base 10 cm and height 5 cm?', 
        //     options: ['25 cm^2', '50 cm^2', '15 cm^2'], 
        //     correctAnswer: '25 cm^2' 
        //   },
        //   { 
        //     id: 20, 
        //     question: 'What is the total number of diagonals in a hexagon?', 
        //     options: ['9', '6', '12'], 
        //     correctAnswer: '9' 
        //   },
                  
      ];
    
    

   
      const handleOptionChange = (questionId, selectedOption) => {
        setAnswers({ ...answers, [questionId]: selectedOption });
        setError(''); // Clear any existing error message
      };
    
      const handleSubmit = () => {
        let calculatedScore = 0;
      
        quizQuestions.forEach((question) => {
          if (answers[question.id] === question.correctAnswer) {
            calculatedScore += 1;
          }
        });
      
        setScore(calculatedScore);
        setIsSubmitted(true); // Set isSubmitted to true
      
        // Save quiz result to localStorage
        localStorage.setItem('quizResult', JSON.stringify({
          score: calculatedScore,
          answers,
          quizQuestions,
        }));
      
        // Navigate to Dashboard and pass data
        navigate('/dashboard', {
          state: {
            score: calculatedScore,
            answers,
            quizQuestions,
          },
        });
      };
      
    
      return (
        <div className="container mt-5">
          <h1 className="text-center">Quiz</h1>
    
          {isSubmitted ? (
            <div className="alert alert-success mt-4 text-center">
              <h4>Quiz Submitted!</h4>
              <p>Your score: {score}/{quizQuestions.length}</p>
              <p>You can view the detailed report in your dashboard.</p>
            </div>
          ) : (
            <div className="mt-4">
              {quizQuestions.map((question) => (
                <div className="mb-4" key={question.id}>
                  <h5>{question.question}</h5>
                  {question.options.map((option, index) => (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`question-${question.id}`}
                        id={`option-${question.id}-${index}`}
                        value={option}
                        checked={answers[question.id] === option} // Pre-check if already selected
                        onChange={() => handleOptionChange(question.id, option)}
                        disabled={isSubmitted} // Disable after submission
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`option-${question.id}-${index}`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
    
              {error && <div className="alert alert-danger">{error}</div>}
    
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isSubmitted} // Disable button after submission
              >
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
    
    export default Quiz;
    