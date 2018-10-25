let coldColor = "cyan";
let warmColor = "yellow";
let hotColor = "orangered";
let winColor = "limegreen";
let prevGuessCounter = 0;

let submitButton = document.getElementById("submit");
let resetButton = document.getElementById("reset");
let userInput = document.getElementById("guess");
let hint = document.getElementById("hint");
let helper = document.getElementById("helper");
let theNumber = generateWinningNumber();
console.log(theNumber);

function generateWinningNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function generateHint() {
  let firstHint = Math.floor(Math.random() * (theNumber - 1) + 1);
  let secondHint = Math.floor(Math.random() * (100 - (theNumber + 1))) + (theNumber + 1);
  hint.backgroundColor = 'rgba(0,0,0,0)';
  hint.color = 'white';
  hint.innerHTML = `The number is either ${theNumber}, ${firstHint}, or ${secondHint}.`;
}

function resetGame() {
  prevGuessCounter = 0;
  theNumber = generateWinningNumber();
  console.log(theNumber);
  userInput.value = "";
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`guess${i}`).innerHTML = "-";
    document.getElementById(`guess${i}`).style.color = "black";
  }
  hint.style.color = "black";
  hint.style.backgroundColor = "rgba(0,0,0,0)";
  hint.innerHTML = "Make a guess between 1 and 100!";
  helper.disabled = false;
  submitButton.disabled = false;
  userInput.disabled = false;
}

function updateGuesses(prevGuess, guess, color, message) {
  hint.style.color = color;
  hint.innerHTML = message;
  prevGuess.style.color = color;
  prevGuess.innerHTML = guess;
}

function endGame(textColor, bgColor, message) {
  hint.style.color = textColor;
  hint.style.backgroundColor = bgColor;
  hint.innerHTML = message;
  helper.disabled = true;
  submitButton.disabled = true;
  userInput.disabled = true;
}

function submitGuess() {
  console.log(Number(userInput.value));
  if(isNaN(Number(userInput.value))) {
    hint.style.color = 'white';
    hint.style.backgroundColor = "rgba(0,0,0,0)";
    hint.innerHTML = "Invalid input, try again.";
    userInput.value = "";
    return;
  }
  prevGuessCounter++;
  let userGuess = Number(userInput.value),
    distance = theNumber - userGuess,
    howClose = Math.abs(distance),
    whichWay = distance > 0 ? "higher" : "lower",
    prevGuessBox = document.getElementById(`guess${prevGuessCounter}`),
    loseMessage = `YOU LOST, NOOB! The number was ${theNumber}. Press Reset to play again.`,
    winMessage = "You Win! Press Reset to play again!",
    coldMessage = `You're getting colder! Try guessing ${whichWay}!`,
    warmMessage = `You're getting warmer! Try guessing ${whichWay}!`,
    hotMessage = `You're getting hotter! Try guessing ${whichWay}!`;

  userInput.value = "";
  userInput.focus();

  if (howClose > 30) {
    updateGuesses(prevGuessBox, userGuess, coldColor, coldMessage);
    if (prevGuessCounter === 5) {
      endGame("black", "red", loseMessage);
    }
  } else if (howClose > 10) {
    updateGuesses(prevGuessBox, userGuess, warmColor, warmMessage);
    if (prevGuessCounter === 5) {
      endGame("black", "red", loseMessage);
    }
  } else if (howClose > 0) {
    updateGuesses(prevGuessBox, userGuess, hotColor, hotMessage);
    if (prevGuessCounter === 5) {
      endGame("black", "red", loseMessage);
    }
  } else {
    updateGuesses(prevGuessBox, userGuess, winColor, winMessage);
    endGame("white", "limegreen", winMessage);
  }
}

submitButton.addEventListener("click", submitGuess);
userInput.addEventListener("keyup", event => {
  if (event.key === "Enter") {
    submitGuess();
  }
});

resetButton.addEventListener("click", resetGame);

helper.addEventListener("click", generateHint);