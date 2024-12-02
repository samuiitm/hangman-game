// VARIABLES
const terminal = document.getElementById("terminal");
const hangman = document.getElementById("hangman");
const playAgain = document.getElementById("playAgain");
const alphabetButtons = [
    document.getElementById("bA"),
    document.getElementById("bB"),
    document.getElementById("bC"),
    document.getElementById("bD"),
    document.getElementById("bE"),
    document.getElementById("bF"),
    document.getElementById("bG"),
    document.getElementById("bH"),
    document.getElementById("bI"),
    document.getElementById("bJ"),
    document.getElementById("bK"),
    document.getElementById("bL"),
    document.getElementById("bM"),
    document.getElementById("bN"),
    document.getElementById("bO"),
    document.getElementById("bP"),
    document.getElementById("bQ"),
    document.getElementById("bR"),
    document.getElementById("bS"),
    document.getElementById("bT"),
    document.getElementById("bU"),
    document.getElementById("bV"),
    document.getElementById("bW"),
    document.getElementById("bX"),
    document.getElementById("bY"),
    document.getElementById("bZ")
];
const words = ["PROGRAMMING", "PUZZLE", "DELEGATE", "PLANNING", "AIRPLANE", "SWIMMING", "CARNIVORE", "PRETEND", "CHROME", "BELL", "TOAST", "POTATO", "DIVIDE", "LETTER", "DOCTOR"];

// EVENTS
alphabetButtons.forEach((button) => {
    button.addEventListener("click", () => verifyLetter(button.textContent));
});

// GLOBAL VARIABLES AND GAME INITIALIZATION
let randomWord = getRandomWord(words);
let wordProgress = playerProgress(randomWord);
let errorCount = 0;

terminal.innerHTML = wordProgress.join(" ");

// HANGMAN DRAWING
const hangmanParts = [
    "&nbsp|&nbsp <br>",
    "&nbsp0&nbsp <br>",
    "/",
    "|",
    "\\ <br>",
    "/",
    "&nbsp\\",
    ""
];

// FUNCTIONS
function getRandomWord(wordArray) {
    let randomIndex = Math.floor(Math.random() * words.length);
    let randomWord = wordArray[randomIndex];
    return randomWord.split("");
}

function playerProgress(word) {
    return Array(word.length).fill("_");
}

function drawHangman() {
    if (errorCount < hangmanParts.length) {
        hangman.innerHTML += hangmanParts[errorCount - 1];
    }
}

function verifyLetter(userInput) {
    let letterFound = false;
    const button = alphabetButtons.find(
        (btn) => btn.textContent === userInput
    );
    if (button) {
        button.disabled = true;
    }

    for (let i = 0; i < randomWord.length; ++i) {
        if (randomWord[i] === userInput) {
            wordProgress[i] = randomWord[i];
            letterFound = true;
        }
    }

    if (!letterFound) {
        ++errorCount;
        drawHangman();
    }

    updateProgress();
}

function updateProgress() {
    if (errorCount === 7) {
        gameLost();
    } else if (wordProgress.join("") === randomWord.join("")) {
        gameWon();
    } else {
        terminal.innerHTML = wordProgress.join(" ");
    }
}

function gameLost() {
    terminal.style.color = 'red';
    terminal.innerHTML = `YOU LOST!<br><p style="font-size: 15px; margin-top: 0; color: orange">THE WORD WAS "${randomWord.join("")}"</p>`;
    terminal.style.marginTop = '-150px';
    terminal.style.fontSize = '40px';
    hangman.style.fontSize = '30px';
    alphabetButtons.forEach(button => {
        button.style.visibility = 'hidden';
        button.disabled = true;
    });
    playAgain.style.visibility = 'visible';
}

function gameWon() {
    terminal.style.color = '#5eff00';
    terminal.style.marginTop = '-140px';
    terminal.style.fontSize = '30px';
    hangman.style.fontSize = '40px';
    terminal.innerHTML = `CONGRATULATIONS! <br><p style="font-size: 15px; margin-top: 0; color: "orange">YOU SAVED HIM!</p>`;
    hangman.innerHTML = `\\0/<br>
                    &nbsp |<br>
                    &nbsp/&nbsp\\`;
    alphabetButtons.forEach(button => {
        button.style.visibility = 'hidden';
        button.disabled = true;
    });
    playAgain.style.visibility = 'visible';
}

function newGame() {
    location.reload();
}