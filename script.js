
// Utility function to shuffle an array (Fisher-Yates style random sort)
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}


// Object mapping country names to their flag image file and alt text
const flagsData = {
  Japan: {
    src: "https://www.google.com/imgres?q=japanese%20flag&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F9%2F9e%2FFlag_of_Japan.svg%2F1200px-Flag_of_Japan.svg.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFlag_of_Japan&docid=Wt2oZS8QZn261M&tbnid=XqR4YVk8UzMtyM&vet=12ahUKEwiUqqTN0tCOAxVLhf0HHZm3EQ8QM3oECAwQAA..i&w=1200&h=800&hcb=2&ved=2ahUKEwiUqqTN0tCOAxVLhf0HHZm3EQ8QM3oECAwQAA",
    alt: "White flag with red circle in center"
  },
  France: {
    src: "france.png",
    alt: "Three vertical stripes: blue, white, red"
  },
  Brazil: {
    src: "brazil.png",
    alt: "Green flag with yellow diamond and blue globe"
  },
  Canada: {
    src: "canada.png",
    alt: "White flag with red maple leaf and red bars"
  },
  Germany: {
    src: "germany.png",
    alt: "Three horizontal stripes: black, red, yellow"
  },
  Italy: {
    src: "italy.png",
    alt: "Three vertical stripes: green, white, red"
  },
  India: {
    src: "india.png",
    alt: "Orange, white, green stripes with blue wheel"
  },
  USA: {
    src: "usa.png",
    alt: "Red and white stripes with blue square of stars"
  },
  Spain: {
    src: "spain.png",
    alt: "Red-yellow-red horizontal stripes with crest"
  },
  UK: {
    src: "uk.png",
    alt: "Blue background with red and white cross overlay"
  },
  Australia: {
    src: "australia.png",
    alt: "Blue with white stars and UK flag in corner"
  },
  "South Korea": {
    src: "southkorea.png",
    alt: "White background with yin-yang and black trigrams"
  },
  China: {
    src: "china.png",
    alt: "Red background with large yellow star and four smaller ones"
  },
  Sweden: {
    src: "sweden.png",
    alt: "Blue background with yellow cross"
  },
  Norway: {
    src: "norway.png",
    alt: "Red background with blue cross outlined in white"
  },
  Mexico: {
    src: "mexico.png",
    alt: "Green-white-red stripes with eagle on cactus"
  },
  Russia: {
    src: "russia.png",
    alt: "White-blue-red horizontal stripes"
  },
  Argentina: {
    src: "argentina.png",
    alt: "Light blue-white-light blue with sun in center"
  },
  "South Africa": {
    src: "southafrica.png",
    alt: "Multicolor Y-shape with green, yellow, black"
  },
  Portugal: {
    src: "portugal.png",
    alt: "Red-green split with national coat of arms"
  }
};


// Array of quiz questions, each with the correct answer and multiple choice options
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


// Shuffle the questions for each game session
const shuffledQuestions = shuffle([...questions]);

// Track the current question index and user score
let currentQuestion = 0;
let score = 0;


// Get references to DOM elements
const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");
const retryBtn = document.getElementById("retry-btn");


// Display the current question, flag image, and answer options
function showQuestion() {
  const q = shuffledQuestions[currentQuestion];
  const flagInfo = flagsData[q.answer];
  
  // If flag data is missing, log an error and skip
  if (!flagInfo) {
    console.error(`Flag data not found for ${q.answer}`);
    return;
  }
  
  const flagFile = flagInfo.src;
  const altText = flagInfo.alt;

  // Shuffle the answer options for this question
  const shuffledOptions = shuffle([...q.options]);

  // Render the flag image and answer buttons
  quizContainer.innerHTML = `
    <img src="assets/flags/${flagFile}" alt="${altText}" class="flag-img" />
    <div class="options">
      ${shuffledOptions.map(opt => `
        <button class="option-btn" data-answer="${opt}">${opt}</button>
      `).join("")}
    </div>
  `;

  // Add event listeners to option buttons
  const optionBtns = quizContainer.querySelectorAll('.option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      handleAnswer(btn, q.answer);
    });
  });

  // Hide the next and retry buttons, and clear result until an answer is chosen
  nextBtn.style.display = "none";
  retryBtn.style.display = "none";
  result.innerText = "";
}



// Handle when a user selects an answer, provide feedback and color buttons
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
  // If there are more questions, show the next button; otherwise, show the final result and Retry button
  if (currentQuestion < shuffledQuestions.length) {
    nextBtn.style.display = "inline-block";
  } else {
    setTimeout(() => {
      quizContainer.innerHTML = "";
      nextBtn.style.display = "none";
      result.innerText = `You got ${score} out of ${shuffledQuestions.length} correct!`;
      retryBtn.style.display = "inline-block";
    }, 1000);
  }
}


// When the next button is clicked, show the next question
nextBtn.addEventListener("click", () => {
  showQuestion();
  nextBtn.style.display = "none";
});

// When the retry button is clicked, reset the quiz state and start over
retryBtn.addEventListener("click", () => {
  // Shuffle questions again for a new session
  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
  }
  currentQuestion = 0;
  score = 0;
  showQuestion();
});


// Set a random secondary color for the palette
function setRandomSecondaryColor() {
  // Generate a random color in HSL for vibrancy
  const hue = Math.floor(Math.random() * 360);
  const color = `hsl(${hue}, 80%, 50%)`;
  document.documentElement.style.setProperty('--secondary', color);
}

setRandomSecondaryColor();

// Start the quiz by showing the first question
showQuestion();
