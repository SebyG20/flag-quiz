// Shuffles an array randomly using sort and a random comparator
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Object containing flag image filename and alternative text for each country
const flagsData = {
  Japan: { src: "japan.png", alt: "White flag with red circle in center" },
  France: { src: "france.png", alt: "Three vertical stripes: blue, white, red" },
  Brazil: { src: "brazil.png", alt: "Green flag with yellow diamond and blue globe" },
  Canada: { src: "canada.png", alt: "White flag with red maple leaf and red bars" },
  Germany: { src: "germany.png", alt: "Three horizontal stripes: black, red, yellow" },
  Italy: { src: "italy.png", alt: "Three vertical stripes: green, white, red" },
  India: { src: "india.png", alt: "Orange, white, green stripes with blue wheel" },
  USA: { src: "USA.png", alt: "Red and white stripes with blue square of stars" },
  Spain: { src: "spain.png", alt: "Red-yellow-red horizontal stripes with crest" },
  UK: { src: "UK.png", alt: "Blue background with red and white cross overlay" },
  Australia: { src: "australia.png", alt: "Blue with white stars and UK flag in corner" },
  "South Korea": { src: "southkorea.png", alt: "White background with yin-yang and black trigrams" },
  China: { src: "china.png", alt: "Red background with large yellow star and four smaller ones" },
  Sweden: { src: "sweden.png", alt: "Blue background with yellow cross" },
  Norway: { src: "norway.png", alt: "Red background with blue cross outlined in white" },
  Mexico: { src: "mexico.png", alt: "Green-white-red stripes with eagle on cactus" },
  Russia: { src: "russia.png", alt: "White-blue-red horizontal stripes" },
  Argentina: { src: "argentina.png", alt: "Light blue-white-light blue with sun in center" },
  "South Africa": { src: "southafrica.png", alt: "Multicolor Y-shape with green, yellow, black" },
  Portugal: { src: "portugal.png", alt: "Red-green split with national coat of arms" }
};

// Array of quiz questions, each with the correct answer and three possible options
const questions = [
  { answer: "Japan", options: ["Japan", "South Korea", "China"] },
  { answer: "France", options: ["France", "Italy", "Netherlands"] },
  { answer: "Brazil", options: ["Brazil", "Argentina", "Portugal"] },
  { answer: "Canada", options: ["Canada", "USA", "UK"] },
  { answer: "Germany", options: ["Germany", "Belgium", "Austria"] },
  { answer: "Italy", options: ["Italy", "Mexico", "France"] },
  { answer: "India", options: ["India", "Pakistan", "Bangladesh"] },
  { answer: "USA", options: ["USA", "Australia", "UK"] },
  { answer: "Spain", options: ["Spain", "Portugal", "Italy"] },
  { answer: "UK", options: ["UK", "USA", "Australia"] },
  { answer: "Australia", options: ["Australia", "New Zealand", "UK"] },
  { answer: "South Korea", options: ["South Korea", "Japan", "China"] },
  { answer: "China", options: ["China", "Vietnam", "North Korea"] },
  { answer: "Sweden", options: ["Sweden", "Norway", "Finland"] },
  { answer: "Norway", options: ["Norway", "Denmark", "Iceland"] },
  { answer: "Mexico", options: ["Mexico", "Spain", "Colombia"] },
  { answer: "Russia", options: ["Russia", "Slovakia", "Serbia"] },
  { answer: "Argentina", options: ["Argentina", "Uruguay", "Chile"] },
  { answer: "South Africa", options: ["South Africa", "Kenya", "Nigeria"] },
  { answer: "Portugal", options: ["Portugal", "Spain", "Italy"] }
];

// Shuffle questions at the start of the game to randomize their order
const shuffledQuestions = shuffle([...questions]);

// Variables to track current question index, player's score, and username
let currentQuestion = 0;
let score = 0;
let username = "";

// DOM element references for different UI sections and buttons
const welcomeSection = document.getElementById("welcome-section");
const startBtn = document.getElementById("start-btn");
const usernameInput = document.getElementById("username");
const quizTitle = document.getElementById("quiz-title");
const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");
const retryBtn = document.getElementById("retry-btn");

// Displays the current question with its flag and shuffled answer options
function showQuestion() {
  const q = shuffledQuestions[currentQuestion];
  const flagInfo = flagsData[q.answer];
  
  if (!flagInfo) {
    console.error(`Flag data not found for ${q.answer}`);
    return;
  }
  
  const flagFile = flagInfo.src;
  const altText = flagInfo.alt;
  const shuffledOptions = shuffle([...q.options]);

  quizContainer.innerHTML = `
    <img src="assets/flags/${flagFile}" alt="${altText}" class="flag-img" />
    <div class="options">
      ${shuffledOptions.map(opt => `
        <button class="option-btn" data-answer="${opt}">${opt}</button>
      `).join("")}
    </div>
  `;

  // Attach click handlers to answer buttons
  const optionBtns = quizContainer.querySelectorAll('.option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      handleAnswer(btn, q.answer);
    });
  });

  // Hide next and retry buttons and clear feedback text
  nextBtn.style.display = "none";
  retryBtn.style.display = "none";
  result.innerText = "";
}

// Handles user answer selection, disables buttons, shows correct/incorrect colors, and updates score
function handleAnswer(selectedBtn, correctAnswer) {
  const optionBtns = quizContainer.querySelectorAll('.option-btn');
  let userWasCorrect = false;
  optionBtns.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add('correct');
    }
    if (btn === selectedBtn) {
      if (btn.textContent === correctAnswer) {
        userWasCorrect = true;
      } else {
        btn.classList.add('incorrect');
      }
    } else if (btn.textContent !== correctAnswer) {
      btn.classList.add('incorrect');
    }
  });
  if (userWasCorrect) {
    result.innerText = 'Correct!';
    score++;
  } else {
    result.innerText = 'Incorrect!';
  }
  currentQuestion++;
  // Show next button if more questions remain, otherwise show final result and retry button
  if (currentQuestion < shuffledQuestions.length) {
    nextBtn.style.display = "inline-block";
  } else {
    setTimeout(() => {
      quizContainer.innerHTML = "";
      nextBtn.style.display = "none";
      result.innerText = `${username}, you got ${score} out of ${shuffledQuestions.length} correct!`;
      retryBtn.style.display = "inline-block";
    }, 1000);
  }
}

// Start button click handler: validates username, hides welcome, and starts quiz
startBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (!name) {
    alert("Please enter your username to start the quiz.");
    return;
  }
  username = name;
  welcomeSection.style.display = "none";
  quizTitle.style.display = "block";
  quizContainer.style.display = "block";
  showQuestion();
});

// Next button click handler: shows the next question and hides the next button
nextBtn.addEventListener("click", () => {
  showQuestion();
  nextBtn.style.display = "none";
});

// Retry button click handler: reshuffles questions, resets score and current question, and restarts quiz
retryBtn.addEventListener("click", () => {
  // Show welcome section and hide quiz UI elements
  welcomeSection.style.display = "block";
  quizTitle.style.display = "none";
  quizContainer.style.display = "none";
  nextBtn.style.display = "none";
  retryBtn.style.display = "none";
  result.innerText = "";
  
  // Reset username input and score/question index for fresh start
  usernameInput.value = "";
  currentQuestion = 0;
  score = 0;
});

// Sets a random vibrant secondary color for the CSS variable --secondary
function setRandomSecondaryColor() {
  const hue = Math.floor(Math.random() * 360);
  const color = `hsl(${hue}, 80%, 50%)`;
  document.documentElement.style.setProperty('--secondary', color);
}

setRandomSecondaryColor();

// The quiz begins when the user clicks the start button and enters their username




// Start the quiz by showing the first question
showQuestion();
