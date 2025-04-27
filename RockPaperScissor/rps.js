const playerChoice = document.querySelector(".right");
const computerChoice = document.querySelector(".left");
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissor = document.querySelector(".scissor");
const player = document.querySelector(".player");
const computer = document.querySelector(".computer");
let playerScore = 0;
let computerScore = 0;
let playerName = prompt("Enter your name: ");
let startButton = document.querySelector(".malik");

console.log(startButton.textContent);
const overlay = document.querySelector(".overlay");
const F_text = document.querySelector(".first");
const S_text = document.querySelector(".second");
const T_text = document.querySelector(".third");


const getPoint = new Audio("rpsMusic/getPount.wav");
const losePoint = new Audio("rpsMusic/losePoint.wav");
const mainMusic = new Audio("rpsMusic/main.mp3");

getPoint.volume = 0.5;
losePoint.volume = 0.5;
mainMusic.volume = 0.1;

getPoint.muted = false;
losePoint.muted = false;
mainMusic.muted = false;


F_text.innerText = `Hey ${playerName}`;
S_text.innerText = `You are playing against Chad`;
T_text.innerText = `First one get 3 points wins`;

rock.addEventListener("click", shake);
paper.addEventListener("click", shake);
scissor.addEventListener("click", shake);

startButton.addEventListener("click", () => {
    overlay.style.display = "none";
    mainMusic.play();
    mainMusic.loop = true;
}
);
function shake(e) {
    playerChoice.classList.toggle("shake2");
    computerChoice.classList.toggle("shake");
    stopshake();

    let playerCh = e.target.className;


    setTimeout(() => {
        computerChoiceFunc();
        changechoice(playerCh);


        setTimeout(() => {
            if (playerCh === "rock" && computerChoice.textContent === "✌️") {
                playerScore++;
                getPoint.currentTime = 0;
                getPoint.play();
                player.innerText = `${playerName}'s Score: ${playerScore}`;
            } else if (playerCh === "rock" && computerChoice.textContent === "✋") {
                computerScore++;
                losePoint.currentTime = 0;
                losePoint.play();
                computer.innerText = `Chad's Score: ${computerScore}`;
            } else if (playerCh === "paper" && computerChoice.textContent === "✊") {
                playerScore++;
                getPoint.currentTime = 0;
                getPoint.play();
                player.innerText = `${playerName}'s Score: ${playerScore}`;
            } else if (playerCh === "paper" && computerChoice.textContent === "✌️") {
                computerScore++;
                losePoint.currentTime = 0;
                losePoint.play();
                computer.innerText = `Chad's Score: ${computerScore}`;
            } else if (playerCh === "scissor" && computerChoice.textContent === "✋") {
                playerScore++;
                getPoint.play();
                getPoint.currentTime = 0;

                player.innerText = `${playerName}'s Score: ${playerScore}`;
            } else if (playerCh === "scissor" && computerChoice.textContent === "✊") {
                computerScore++;
                losePoint.play();
                losePoint.currentTime = 0;
                computer.innerText = `Chad's Score: ${computerScore}`;
            }
            if (playerScore === 3) {
                mainMusic.pause();
                setTimeout(() => {
                    overlay.style.display = "flex";
                    F_text.innerText = `congratulations ${playerName}`;
                    S_text.innerText = `You beat Chad`;
                    T_text.innerText = `You are the best`;
                    startButton.innerText = "Play Again";
                    startButton.addEventListener("click", () => {
                        location.reload();
                    });


                }, 500);
            }
            else if (computerScore === 3) {
                mainMusic.pause();
                setTimeout(() => {
                    overlay.style.display = "flex";
                    F_text.innerText = `Sorry ${playerName}`;
                    S_text.innerText = `You lost against Chad`;
                    T_text.innerText = `Better luck next time`;
                    startButton.innerText = "Play Again";
                    startButton.addEventListener("click", () => {
                        location.reload();
                    });


                }, 500);
            }
        }, 500);
    }, 1000);
}

function computerChoiceFunc() {
    let choices = ["rock", "paper", "scissor"];
    let randomChoice = choices[Math.floor(Math.random() * choices.length)];
    if (randomChoice === "rock") {
        computerChoice.textContent = "✊";
    }
    if (randomChoice === "paper") {
        computerChoice.textContent = "✋";
    }
    if (randomChoice === "scissor") {
        computerChoice.textContent = "✌️";
    }

}
function changechoice(playerCh) {
    if (playerCh === "rock") {
        playerChoice.textContent = "✊";
    }
    if (playerCh === "paper") {
        playerChoice.textContent = "✋";
    }
    if (playerCh === "scissor") {
        playerChoice.textContent = "✌️";
    }

}


function stopshake() {
    setTimeout(() => {
        playerChoice.classList.remove("shake2");
        computerChoice.classList.remove("shake");
    }, 1000);
}

player.innerText = `${playerName}'s Score: ${playerScore}`;
computer.innerText = `Chad's Score: ${computerScore}`;