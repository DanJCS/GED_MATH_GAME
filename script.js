document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');

    const startButton = document.getElementById('start-button');
    const submitButton = document.getElementById('submit-button');
    const nextButton = document.getElementById('next-button');
    const playAgainButton = document.getElementById('play-again-button');

    const questionText = document.getElementById('question-text');
    const answerArea = document.getElementById('answer-area');
    const feedbackMessage = document.getElementById('feedback-message');
    const scoreDisplay = document.getElementById('score');
    const totalQuestionsDisplay = document.getElementById('total-questions');
    const finalScoreDisplay = document.getElementById('final-score');
    const finalTotalQuestionsDisplay = document.getElementById('final-total-questions');

    // --- Game Variables ---
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null; // For multiple choice questions

    // --- Questions Data ---
    const questions = [
        {
            question: "Translate: 'A number increased by five is twelve.'",
            type: 'mc', // Multiple Choice
            options: ['x - 5 = 12', '5x = 12', 'x + 5 = 12', 'x / 5 = 12'],
            answer: 'x + 5 = 12',
            explanation: "Increased by means addition (+). So, 'a number (x) increased by five (+ 5) is (=) twelve (12)' becomes x + 5 = 12."
        },
        {
            question: "Translate: 'Three times a number, decreased by seven, is twenty.'",
            type: 'mc',
            options: ['3x + 7 = 20', 'x - 3 = 20', '3x - 7 = 20', '3(x - 7) = 20'],
            answer: '3x - 7 = 20',
            explanation: "Three times a number is 3x. Decreased by means subtraction (-). So, 'three times a number (3x) decreased by seven (- 7) is (=) twenty (20)' becomes 3x - 7 = 20."
        },
        {
            question: "If 'two times a number plus four is equal to eighteen', what is the number? (Enter the numerical answer)",
            type: 'text', // Text input for numerical answer
            equation: '2x + 4 = 18', // For internal reference/explanation
            answer: '7', // String for comparison
            explanation: "The equation is 2x + 4 = 18. Subtract 4 from both sides: 2x = 14. Divide by 2: x = 7."
        },
        {
            question: "The sum of a number and its half is 15. What is the number? (Enter the numerical answer)",
            type: 'text',
            equation: 'x + (x/2) = 15',
            answer: '10',
            explanation: "The equation is x + x/2 = 15. Combine terms: 3x/2 = 15. Multiply by 2: 3x = 30. Divide by 3: x = 10."
        },
        {
            question: "Sarah bought a book for $12 and 3 pens. If her total bill was $21, how much did each pen cost? (Enter the numerical answer)",
            type: 'text',
            equation: '12 + 3p = 21',
            answer: '3',
            explanation: "Let 'p' be the cost of one pen. The equation is 12 + 3p = 21. Subtract 12 from both sides: 3p = 9. Divide by 3: p = 3. Each pen cost $3."
        },
        {
            question: "Which equation represents: 'The product of a number and 6 is 42'?",
            type: 'mc',
            options: ['x + 6 = 42', 'x - 6 = 42', '6x = 42', 'x / 6 = 42'],
            answer: '6x = 42',
            explanation: "The product means multiplication. So, 'the product of a number (x) and 6 (6x) is (=) 42 (42)' becomes 6x = 42."
        },
        {
            question: "If a rectangle's length is twice its width, and its perimeter is 30 units, what is its width? (Enter the numerical answer)",
            type: 'text',
            equation: '2w + 2(2w) = 30', // Perimeter = 2(width) + 2(length)
            answer: '5',
            explanation: "Let width be 'w' and length be '2w'. Perimeter P = 2w + 2L = 2w + 2(2w) = 2w + 4w = 6w. So, 6w = 30. Divide by 6: w = 5. The width is 5 units."
        }
    ];

    totalQuestionsDisplay.textContent = questions.length;
    finalTotalQuestionsDisplay.textContent = questions.length;

    // --- Game Functions ---

    function showScreen(screenToShow) {
        // Hide all screens first
        startScreen.classList.remove('active');
        gameScreen.classList.remove('active');
        endScreen.classList.remove('active');
        // Show the desired screen
        screenToShow.classList.add('active');
    }

    function startGame() {
        currentQuestionIndex = 0;
        score = 0;
        scoreDisplay.textContent = score;
        showScreen(gameScreen);
        loadQuestion();
    }

    function loadQuestion() {
        const q = questions[currentQuestionIndex];
        questionText.textContent = q.question;
        feedbackMessage.textContent = ''; // Clear previous feedback
        feedbackMessage.classList.remove('correct', 'incorrect');
        submitButton.classList.remove('hidden');
        nextButton.classList.add('hidden');
        answerArea.innerHTML = ''; // Clear previous answer input/options
        selectedOption = null;

        if (q.type === 'mc') {
            q.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.classList.add('option-button');
                button.textContent = option;
                button.dataset.option = option; // Store the option text
                button.addEventListener('click', () => selectOption(button));
                answerArea.appendChild(button);
            });
        } else if (q.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Type your answer here...';
            input.id = 'text-answer-input';
            answerArea.appendChild(input);
            input.focus(); // Auto-focus for convenience
        }
    }

    function selectOption(button) {
        // Deselect any previously selected option
        const currentSelected = answerArea.querySelector('.option-button.selected');
        if (currentSelected) {
            currentSelected.classList.remove('selected');
        }
        // Select the clicked option
        button.classList.add('selected');
        selectedOption = button.dataset.option;
    }

    function checkAnswer() {
        const q = questions[currentQuestionIndex];
        let isCorrect = false;
        let userAnswer;

        if (q.type === 'mc') {
            userAnswer = selectedOption;
            isCorrect = (userAnswer === q.answer);
        } else if (q.type === 'text') {
            const inputElement = document.getElementById('text-answer-input');
            userAnswer = inputElement.value.trim();
            // Case-insensitive and flexible comparison for numbers (e.g., allow "7" or "7.0")
            isCorrect = (userAnswer.toLowerCase() === q.answer.toLowerCase());
        }

        if (isCorrect) {
            score++;
            feedbackMessage.textContent = 'Correct! 🎉 ' + (q.explanation || '');
            feedbackMessage.classList.add('correct');
        } else {
            feedbackMessage.textContent = `Incorrect. 😔 The correct answer was "${q.answer}". ` + (q.explanation || '');
            feedbackMessage.classList.add('incorrect');
        }

        scoreDisplay.textContent = score; // Update score display immediately

        // Disable input/options and show next button
        submitButton.classList.add('hidden');
        nextButton.classList.remove('hidden');
        if (q.type === 'text') {
            document.getElementById('text-answer-input').disabled = true;
        } else if (q.type === 'mc') {
            answerArea.querySelectorAll('.option-button').forEach(btn => btn.disabled = true);
        }
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            endGame();
        }
    }

    function endGame() {
        finalScoreDisplay.textContent = score;
        showScreen(endScreen);
    }

    // --- Event Listeners ---
    startButton.addEventListener('click', startGame);
    submitButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', nextQuestion);
    playAgainButton.addEventListener('click', startGame);
});
