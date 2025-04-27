const backgroundMusic = new Audio("../sounds/Tic.mp3");
backgroundMusic.loop = true;
const clickSound = new Audio("../sounds/clickTic.wav");
let sound = true;
const resultSound = new Audio("../sounds/result.wav");
resultSound.volume = 1;
resultSound.muted = false; 
const cells = document.querySelectorAll(".cell");
const gameState = document.querySelector(".status");
const restartButton = document.querySelector(".res2");
const info = document.querySelector(".info");
const info2 = document.querySelector(".info2");
const winMassage = document.querySelector(".winMassege");
const winMasText = document.querySelector(".winMassegeText");
const p1score = document.querySelector(".playerOneScore");
const p2score = document.querySelector(".playerTwoScore");
const reloadButton = document.querySelector(".reload");
const gamest = document.querySelector(".gamest");

// retartButton
let currentPlayer = "X";
let PlayerOne, PlayerTwo;
let playerOneScore = 0, playerTwoScore = 0;
setTimeout(StartGame, 1000);
let winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];

const musicToggleButton = document.querySelector(".toggle-music");
musicToggleButton.addEventListener("click", () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
});


const soundoggleButton = document.querySelector(".toggle-sound");
soundoggleButton.addEventListener("click", () => {
    if (sound === true) {
        sound = false;
    }
    else {
        sound = true;
    }
});

function playSound() {
    if (sound === false) {
        return;
    }
    else {
        clickSound.currentTime = 0;
        clickSound.play();
    }
}

function StartGame() {
    PlayerOne = prompt("Enter Player One's name:");
    PlayerTwo = prompt("Enter Player Two's name:");
    cells.forEach(cell => cell.addEventListener("click", cellClikced));
    restartButton.addEventListener("click", restartGameFM)
    info.innerHTML = `${PlayerOne} is <span style="color: red; font-size: 30px;">X</span>`;
    info2.innerHTML = `${PlayerTwo} is <span style="color: red; font-size: 30px;">O</span>`;
    gameState.textContent = `${currentPlayer}'s turn`;
    backgroundMusic.play();
    backgroundMusic.volume = 0.2;
    backgroundMusic.muted = false;
}
function cellClikced() {
    playSound();
    this.removeEventListener("click", cellClikced);
    let cellIndx = this.getAttribute("cellIndx");
    if (options[cellIndx] !== "") {
        return;
    }
    options[cellIndx] = currentPlayer;
    this.textContent = currentPlayer;
    cheakWinner();
}
function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
    });
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    gameState.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.addEventListener("click", cellClikced));
}
function cheakWinner() {
    for (let i = 0; i < winCases.length; i++) {
        let [a, b, c] = winCases[i];
        if (options[a] === "" || options[b] === "" || options[c] === "") {
            continue;
        }
        if (options[a] === options[b] && options[a] === options[c]) {
            if (options[a] === "X") {
                playerOneScore++;
                let winMas = `${PlayerOne} is the winner`;
                ShowMas(winMas);
            }
            else if (options[a] === "O") {
                playerTwoScore++;
                let winMas = `${PlayerTwo} is the winner`;
                ShowMas(winMas);
            }
            return;
        }
    }
    if (!options.includes("")) {
        let drawMas = "It's a draw!";
        ShowMas(drawMas);

    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        gameState.textContent = `${currentPlayer}'s turn`;
    }
}

function ShowMas(mas) {

   resultSound.play();

    winMassage.classList.remove("hidden");
    winMassage.style.display = "flex";
    if (mas === "It's a draw!") {
        gamest.textContent = "Good Game!";
    }
    winMasText.textContent = mas;
    p1score.textContent = `${PlayerOne} : ${playerOneScore}`;
    p2score.textContent = `${PlayerTwo} : ${playerTwoScore}`;

}
function restartGameFM() {

    winMassage.style.display = "none";
    restartGame();

}
reloadButton.addEventListener("click", () => {
    location.reload();
});