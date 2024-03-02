const playBtn = document.getElementById("play");
const board = document.querySelector(".unclickable");
const levelElement = document.getElementById("level");
const tiles = document.querySelectorAll("[data-tile]");
const greenSound = new Audio("../sounds/green.mp3");
const redSound = new Audio("../sounds/red.mp3");
const blueSound = new Audio("../sounds/blue.mp3");
const yellowSound = new Audio("../sounds/yellow.mp3");

const colors = ["green", "red", "blue", "yellow"];
let pattern = [];
let newPatternColor;
let level = 0;

function restartGame() {
    pattern = [];
    playerPattern = [];
    level = 0;
    levelElement.innerHTML = level;
}

for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", function () {
    })
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
    if(!board.classList.toggle("unclickable"))
        board.classList.add("unclickable");
    level++;
    playerPattern = [];
    levelElement.innerHTML = level;
    newPatternColor = colors[Math.floor(Math.random() * colors.length)];
    pattern.push(newPatternColor);
    playRoundTiles(0);
    setTimeout(function () {
        board.classList.remove("unclickable");
    }, 1000 * pattern.length);
}

playBtn.onclick = function () {
    restartGame();
    gameRound();
}