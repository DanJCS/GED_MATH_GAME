/* General Styling */
body {
    font-family: 'Nunito', sans-serif;
    background-color: #f0f7f2; /* Light green background */
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
}

.game-container {
    background-color: #ffffff;
    padding: 2rem 3rem;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 600px;
    text-align: center;
}

header h1 {
    color: #2a6f2b; /* Dark green */
    margin-bottom: 0.5rem;
}

header p {
    color: #555;
    margin-top: 0;
}

/* Progress and Tree Visualization */
.progress-container {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#tree-container {
    height: 150px;
    width: 150px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

#tree-image {
    max-height: 100%;
    max-width: 100%;
    transition: transform 0.5s ease-in-out, filter 0.5s;
}

/* A simple grow animation */
.grow-animation {
    transform: scale(1.1);
    filter: drop-shadow(0 0 10px #90ee90); /* a light green glow */
}

#progress-text {
    display: flex;
    gap: 2rem;
    font-weight: bold;
    color: #4a4a4a;
}

/* Quiz Area */
.quiz-container {
    border-top: 2px solid #e0e0e0;
    padding-top: 1.5rem;
}

#question-text {
    font-size: 1.2rem;
    min-height: 50px; /* Prevents layout shift */
    color: #333;
}

#answer-area {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 1rem;
}

#answer-input {
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    width: 60%;
    transition: border-color 0.3s;
}

#answer-input:focus {
    outline: none;
    border-color: #4CAF50; /* Green focus */
}

#submit-btn {
    padding: 10px 20px;
    background-color: #4CAF50; /* Green button */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

#submit-btn:hover {
    background-color: #45a049; /* Darker green */
}

#feedback-text {
    margin-top: 1rem;
    font-size: 1.1rem;
    font-weight: bold;
    min-height: 25px; /* Prevents layout shift */
}

.feedback-correct {
    color: #2a6f2b; /* Dark green */
}

.feedback-incorrect {
    color: #d9534f; /* Red */
}

/* Completion Screen */
#completion-screen {
    border-top: 2px solid #e0e0e0;
    padding-top: 1.5rem;
}

#restart-btn {
    padding: 12px 25px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 1rem;
}

#restart-btn:hover {
    background-color: #0056b3;
}

.hidden {
    display: none;
}

/* Responsive Design */
@media (max-width: 600px) {
    .game-container {
        padding: 1.5rem 1rem;
    }

    header h1 {
        font-size: 1.5rem;
    }
}
