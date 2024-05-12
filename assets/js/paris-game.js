var myCards = document.getElementById("game-container");
var resultsArray = [];
var counter = 0;
var text = document.getElementById("total-time");
var seconds = 0;
var tens = 0;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var Interval;
var images = ["AS", "KS", "QS", "JS", "10S"];
var resetButton = document.getElementById("reset-button");

// Event Listeners
resetButton.addEventListener("click", resetGame);

//Initialize the game
buildGameGrid();

// Functions

// Reset variables
function resetVariables() {
  resultsArray = [];
  counter = 0;
  clearInterval(Interval);
  seconds = "00";
  tens = "00";
  appendSeconds.innerHTML = seconds;
  appendTens.innerHTML = tens;
}

// Shuffle function
function shuffle(o) {
  for (
    var j, x, i = o.length;
    i;
    j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}

// Build the game grid
function buildGameGrid() {
  myCards.innerHTML = "";
  var cards = images.concat(images.slice()); // Duplicate the array
  cards = shuffle(cards); // Shuffle the cards
  for (var i = 0; i < cards.length; i++) {
    var card = createCard(cards[i]);
    myCards.appendChild(card);
  }
}

// Create a card element
function createCard(imageName) {
  var card = document.createElement("div");
  card.dataset.item = imageName;
  card.dataset.view = "card";
  card.addEventListener("click", cardClickHandler);
  return card;
}

// Card click handler
function cardClickHandler() {
  var clickedCard = this;

  if (
    clickedCard.classList.contains("flipped") ||
    clickedCard.classList.contains("correct")
  ) {
    return; // Ignore clicks on flipped or correct cards
  }

  clickedCard.classList.add("flipped");
  resultsArray.push(clickedCard.dataset.item);

  if (resultsArray.length > 1) {
    checkMatch();
  }

  // Start the timer if not already started
  if (!Interval) {
    Interval = setInterval(startTimer, 10);
  }
}

// Check if the selected cards match
function checkMatch() {
  var flippedCards = document.querySelectorAll(".flipped");

  if (resultsArray[0] === resultsArray[1]) {
    flippedCards.forEach(function (card) {
      card.classList.remove("flipped");
      card.classList.add("correct");
    });
    counter++;
    win();
  } else {
    setTimeout(function () {
      flippedCards.forEach(function (card) {
        card.classList.remove("flipped");
      });
    }, 500);
  }

  resultsArray = [];
}

// Check if the game is won
function win() {
  if (counter === images.length) {
    clearInterval(Interval);
    text.innerHTML =
      "Your time was " + seconds + ":" + (tens < 10 ? "0" + tens : tens);
  }
}

// Start the timer
function startTimer() {
  tens++;
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;
    tens = 0;
  }
  appendTens.innerHTML = tens < 10 ? "0" + tens : tens;
}

// Reset the game
function resetGame() {
  clearInterval(Interval);
  resetVariables();
  buildGameGrid();
  text.innerHTML = "";
}
