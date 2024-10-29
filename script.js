const textDisplay = document.getElementById('text-display');
const inputArea = document.getElementById('input-area');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const resultDisplay = document.getElementById('result');

let testText = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime;

// Random passage array
const passages = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes a man perfect.",
  "Every moment is a fresh beginning.",
  "Be yourself; everyone else is already taken.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts."
];

function startTest() {
  // Reset previous results and setup
  inputArea.value = "";
  resultDisplay.textContent = "";
  startButton.disabled = true;
  inputArea.disabled = false;
  inputArea.focus();
  
  // Display random passage and start timer
  testText = passages[Math.floor(Math.random() * passages.length)];
  textDisplay.textContent = testText;
  startTime = new Date().getTime();
}

function endTest() {
  endTime = new Date().getTime();
  const totalTime = (endTime - startTime) / 1000;
  const typedText = inputArea.value.trim();
  
  // Calculate typing speed (words per minute)
  const wordCount = typedText.split(" ").length;
  const speed = Math.round((wordCount / totalTime) * 60);

  // Calculate accuracy
  const correctWords = testText.split(" ").filter((word, i) => word === typedText.split(" ")[i]).length;
  const accuracy = ((correctWords / wordCount) * 100).toFixed(2);

  // Display results
  resultDisplay.textContent = `Speed: ${speed} WPM | Accuracy: ${accuracy}%`;
}

startButton.addEventListener('click', () => {
  startTest();
});

inputArea.addEventListener('input', () => {
  if (inputArea.value.trim() === testText) {
    inputArea.disabled = true;
    startButton.disabled = false;
    endTest();
  }
});

resetButton.addEventListener('click', () => {
  inputArea.value = "";
  inputArea.disabled = true;
  startButton.disabled = false;
  resultDisplay.textContent = "";
  textDisplay.textContent = "Press 'Start Test' to begin!";
});
