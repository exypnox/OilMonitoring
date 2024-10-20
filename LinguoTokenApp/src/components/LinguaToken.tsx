import { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";

// Mock questions for English learning
const questions = [
  {
    question: "What is the past tense of 'go'?",
    options: ["Went", "Gone", "Goes"],
    correct: "Went"
  },
  {
    question: "Which word is an adjective?",
    options: ["Run", "Quick", "Swim"],
    correct: "Quick"
  },
  {
    question: "What is the plural of 'mouse'?",
    options: ["Mouses", "Mice", "Mouse"],
    correct: "Mice"
  }
];

export default function EnglishLearningGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [balance, setBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestion].correct) {
      setMessage("Correct! You've earned 10 LTG!");
      setBalance(balance + 10);
      setShowModal(true);
    } else {
      setMessage("Wrong answer. Try again!");
      setShowModal(true);
    }
    setRewardClaimed(answer === questions[currentQuestion].correct);
  };

  const nextQuestion = () => {
    setShowModal(false);
    setRewardClaimed(false);
    setCurrentQuestion((prev) => (prev + 1) % questions.length); // Cycle through questions
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #ffecd2, #fcb69f)', // Soft pastel gradient
      color: '#333',
      position: 'relative',
    }}>
      <div style={{
        padding: '2rem',
        margin: '0 0.5rem',
        width: '400px',
        maxWidth: '98%',
        backgroundColor: 'white',
        borderRadius: '16px', // Softer border-radius
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)', // Deeper shadow for depth
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1, // Keeps the card above the footer
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>LinguaToken Game</h1>
        <ConnectButton client={client} />
        <h2 style={{ fontSize: '1.2rem', margin: '1rem 0', textAlign: 'center' }}>Balance: {balance} LTG</h2>

        {/* Display the question */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h3>{questions[currentQuestion].question}</h3>
        </div>

        {/* Display answer options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#f76c6c', // Coral background for buttons
                color: 'white',
                border: 'none',
                borderRadius: '8px', // Softer button edges
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#ff6f61')} // Darker coral on hover
              onMouseOut={(e) => (e.currentTarget.style.background = '#f76c6c')}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Modal for showing rewards */}
        {showModal && (
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            zIndex: 100,
          }}>
            <h3>{message}</h3>
            {rewardClaimed && <p>+10 LTG added to your balance!</p>}
            <button
              onClick={nextQuestion}
              style={{
                padding: '0.5rem 1rem',
                marginTop: '1rem',
                background: '#f76c6c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Next Question
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        textAlign: 'center',
        padding: '1rem 0',
        backgroundColor: '#333', // Dark gray footer background
        color: 'white',
        fontSize: '0.9rem',
        zIndex: 0,
      }}>
        Made by Saidahmad -> SmartChain LLC
      </footer>
    </div>
  );
}
