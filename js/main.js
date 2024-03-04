const playBtn = document.getElementById("play");
const board = document.querySelector(".unclickable");
const levelElement = document.getElementById("level");
const highScoreElement = document.getElementById("high-score");
const tiles = document.querySelectorAll("[data-tile]");
const greenSound = new Audio("../sounds/green.mp3");
const redSound = new Audio("../sounds/red.mp3");
const blueSound = new Audio("../sounds/blue.mp3");
const yellowSound = new Audio("../sounds/yellow.mp3");
const wrongSound = new Audio("../sounds/wrong.mp3");
const gameOverSound = new Audio("../sounds/game-over.wav");
const gameWinSound = new Audio("../sounds/game-win.wav");

const colors = ["green", "red", "blue", "yellow"];
let pattern = [];
let playerPattern = [];
let newPatternColor;
let level = 0;
let countPlayerTiles;
let maxRounds = 12;
let highestScore = 0;

function restartGame() {
    highScoreElement.innerHTML = highestScore;
    pattern = [];
    playerPattern = [];
    level = 0;
    levelElement.innerHTML = level;
}

function gameOver() {
    wrongSound.play();
    setTimeout(function () {
        gameOverSound.play();
        board.classList.add("unclickable");
        if (highestScore < pattern.length)
            highestScore = pattern.length - 1;
        restartGame();
    }, 500);
}

function gameWin() {
    setTimeout(function () {
        gameWinSound.play();
        highestScore = maxRounds;
        board.classList.add("unclickable");
        restartGame();
    }, 500);
}

function checkPlayerPattern() {
    let correctPattern = true;
    for (let i = 0; i < playerPattern.length; i++) {
        console.log(i + "  " + playerPattern[i] + "   " + pattern[i]);
        if (playerPattern[i] != pattern[i]) {
            correctPattern = false;
            break;
        }
    }
    if (correctPattern && playerPattern.length == pattern.length) {
        if (pattern.length == maxRounds)
            gameWin();
        else
            gameRound();
        return true;
    }
    else if (correctPattern && playerPattern.length != pattern.length)
        return true;
    else {
        gameOver();
        return false;
    }
}

function playTileSound(tile) {
    if (tile == "green")
        greenSound.play();
    else if (tile == "red")
        redSound.play();
    else if (tile == "blue")
        blueSound.play();
    else
        yellowSound.play();
}

function playRoundTiles(i) {
    console.log(playerPattern + "   " + pattern);
    setTimeout(function () {
        if (pattern[i] == "green") {
            tiles[0].classList.remove("inactive");
            playTileSound(pattern[i]);
            setTimeout(function () {
                tiles[0].classList.add("inactive");
            }, 500);
        }
        else if (pattern[i] == "red") {
            tiles[1].classList.remove("inactive");
            playTileSound(pattern[i]);
            setTimeout(function () {
                tiles[1].classList.add("inactive");
            }, 500);
        }
        else if (pattern[i] == "blue") {
            tiles[2].classList.remove("inactive");
            playTileSound(pattern[i]);
            setTimeout(function () {
                tiles[2].classList.add("inactive");
            }, 500);
        }
        else {
            tiles[3].classList.remove("inactive");
            playTileSound(pattern[i]);
            setTimeout(function () {
                tiles[3].classList.add("inactive");
            }, 500);
        }
        i++;
        if (i < pattern.length) {
            playRoundTiles(i);
        }
    }, 800);
}

function gameRound() {
    board.classList.toggle("unclickable")

    level++;
    levelElement.innerHTML = level;

    countPlayerTiles = 0;
    playerPattern = [];

    newPatternColor = colors[Math.floor(Math.random() * colors.length)];
    pattern.push(newPatternColor);

    playRoundTiles(0);

    setTimeout(function () {
        board.classList.remove("unclickable");
    }, 1000 * pattern.length);
}

for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", function () {
        const clickedTile = tiles[i].getAttribute("data-tile");
        playerPattern.push(clickedTile);

        countPlayerTiles++;

        let correctStep = checkPlayerPattern();
        if (correctStep)
            playTileSound(clickedTile);
    })
}

playBtn.onclick = function () {
    restartGame();
    gameRound();
}