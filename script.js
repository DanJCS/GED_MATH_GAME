document.addEventListener('DOMContentLoaded', () => {

    // --- DOM ELEMENTS ---
    const questionTextEl = document.getElementById('question-text');
    const answerInputEl = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');
    const feedbackTextEl = document.getElementById('feedback-text');
    const scoreEl = document.getElementById('score');
    const treeLevelEl = document.getElementById('tree-level');
    const treeImageEl = document.getElementById('tree-image');
    const quizContainer = document.querySelector('.quiz-container');
    const completionScreen = document.getElementById('completion-screen');
    const restartBtn = document.getElementById('restart-btn');

    // --- GAME STATE & CONTENT ---

    // You can easily add more questions here!
    const questions = [
        { question: "Solve for x: 3x - 7 = 11", answer: "6" },
        { question: "What is 25% of 200?", answer: "50" },
        { question: "A rectangle has a length of 10 cm and a width of 5 cm. What is its area in sq cm?", answer: "50" },
        { question: "If a store offers a 20% discount on a $40 shirt, what is the final price?", answer: "32" },
        { question: "Calculate the value of 5² + 3(4 - 2).", answer: "31" },
        { question: "A number is tripled and then increased by 5. The result is 23. What is the number?", answer: "6" },
        { question: "Find the average of the following numbers: 10, 15, 20, 25.", answer: "17.5" },
        { question: "What is the next number in the sequence: 3, 7, 11, 15, ...?", answer: "19" },
        { question: "The perimeter of a square is 36 inches. What is the length of one side?", answer: "9" },
        { question: "Simplify the expression: 4(x + 2) - 2x", answer: "2x + 8" },
        { question: "A car travels 180 miles in 3 hours. What is its average speed in miles per hour?", answer: "60" },
        { question: "Solve for y: y/4 + 5 = 8", answer: "12" },
        { question: "What is the value of |-8| + |3|?", answer: "11" },
        { question: "A bag contains 5 red marbles and 3 blue marbles. What is the probability of picking a blue marble?", answer: "3/8" },
        { question: "If x = -2, what is the value of x² + 3x - 4?", answer: "-6" }
    ];

    // Tree growth stages (using SVG icons for crispness)
    const treeStages = [
        'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/seedling.svg', // Level 1: Sapling
        'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/spa.svg', // Level 2: Small plant
        'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/tree.svg', // Level 3: Small Tree
        'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/pagelines.svg', // Level 4: Larger Tree
        'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/fan.svg' // Level 5: Full, leafy tree
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let treeLevel = 1;
    const correctAnswersForGrowth = 3; // Need 3 correct answers to level up the tree

    // --- FUNCTIONS ---

    function startGame() {
        currentQuestionIndex = 0;
        score = 0;
        treeLevel = 1;
        
        // Shuffle questions for replayability
        questions.sort(() => Math.random() - 0.5);

        updateProgressDisplay();
        loadQuestion();
        quizContainer.classList.remove('hidden');
        completionScreen.classList.add('hidden');
    }

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionTextEl.textContent = questions[currentQuestionIndex].question;
            answerInputEl.value = '';
            feedbackTextEl.textContent = '';
            answerInputEl.focus();
        } else {
            endGame();
        }
    }

    function checkAnswer() {
        const userAnswer = answerInputEl.value.trim();
        // Allow for some flexibility in answers (e.g., ignore case for text answers if any)
        const correctAnswer = questions[currentQuestionIndex].answer.toString();

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            feedbackTextEl.textContent = "Correct! Your tree is growing stronger.";
            feedbackTextEl.className = 'feedback-correct';
            score++;

            // Check for tree growth
            if (score % correctAnswersForGrowth === 0 && treeLevel < treeStages.length) {
                treeLevel++;
                feedbackTextEl.textContent = "Great job! Your tree just leveled up!";
                // Trigger animation
                treeImageEl.classList.add('grow-animation');
                setTimeout(() => {
                    treeImageEl.classList.remove('grow-animation');
                }, 500);
            }
            
            updateProgressDisplay();

            currentQuestionIndex++;
            setTimeout(loadQuestion, 1500); // Wait 1.5s before next question

        } else {
            feedbackTextEl.textContent = "Not quite. Give it another try!";
            feedbackTextEl.className = 'feedback-incorrect';
        }
    }
    
    function updateProgressDisplay() {
        scoreEl.textContent = score;
        treeLevelEl.textContent = treeLevel;
        // Update tree image based on level (adjust index)
        treeImageEl.src = treeStages[treeLevel - 1];
    }
    
    function endGame() {
        quizContainer.classList.add('hidden');
        completionScreen.classList.remove('hidden');
        // Final tree image
        treeImageEl.src = treeStages[treeStages.length - 1];
    }

    // --- EVENT LISTENERS ---
    submitBtn.addEventListener('click', checkAnswer);
    answerInputEl.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
    restartBtn.addEventListener('click', startGame);

    // --- INITIALIZE GAME ---
    startGame();

});
