let timeLeft = 0;
let playerName;
setTimeout(() => {
    playerName = prompt("Enter your name: ");
    let gameDificulty = prompt("Enter game difficulty (1 for easy, 2 for medium, 3 for hard): ");

    if (gameDificulty == 1) {
        timeLeft = 120;
    } else if (gameDificulty == 2) {
        timeLeft = 90;
    } else if (gameDificulty == 3) {
        timeLeft = 60;
    } else {
        alert("Invalid input. Please enter a valid difficulty level.");
        timeLeft = 120;
    }

    beginText.textContent = `Hello ${playerName}`;
    beginText2.textContent = `You have ${timeLeft} seconds to finish!`;
}, 1000); // 2-second delay

let increase = 1;
let startGame = document.querySelector('.startGame');
let lastSecondsPlayed = false;
const overlay = document.querySelector('.overlay');
const beginText = document.querySelector('.over');
const beginText2 = document.querySelector('.over2');
const rotate = document.querySelector('.rot');
const cards = document.querySelectorAll('.cards');
const mainMusic = new Audio('cardmusic/main.mp3');
mainMusic.volume = 0.1;
mainMusic.loop = true;
mainMusic.muted = false;

const lastSeconds = new Audio('cardmusic/mixkit-retro-arcade-tick-tock-clock-timer-1052.wav');
lastSeconds.volume = 0.4;
lastSeconds.loop = false;
lastSeconds.muted = false;

const gameOver = new Audio('cardmusic/Gameover.wav');
gameOver.volume = 0.4;
gameOver.loop = false;
gameOver.muted = false;

const winMusic = new Audio('cardmusic/win.wav');
winMusic.volume = 0.4;
winMusic.loop = false;
winMusic.muted = false;

const matchMusic = new Audio('cardmusic/match.wav');
matchMusic.volume = 0.4;
matchMusic.loop = false;
matchMusic.muted = false;



// lastSeconds.play();

// const flipMusic = new Audio('cardmusic/flip.mp3');
// flipMusic.volume = 0.4;
// flipMusic.loop = false;
// flipMusic.muted = false; 

const newElement = document.createElement('div');
newElement.textContent = `Time Left: ${timeLeft}`;
newElement.classList.add('new-class');

const container = document.querySelector('.container');
container.insertBefore(newElement, container.firstChild);

// 

function changeTimer() {
    increase = 0;
}


let Bloks = Array.from(cards);
// console.log(Bloks);
let order = [...Array(Bloks.length).keys()];
// console.log(order);

function startTimer() {
    document.querySelectorAll('.cards').forEach(card => {
        card.addEventListener('click', flibCard)
    });
    mainMusic.play();
    let gameOverPlayed = false; // Add a flag to track if the gameOver sound has been played

    const timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft -= increase;
            newElement.textContent = `Time Left: ${timeLeft}`; // Update the timer display

            if (timeLeft <= 8 && !lastSeconds.muted) {
                console.log('last seconds');
                if (!lastSecondsPlayed) {
                    lastSeconds.play();
                }
            }
            else if (timeLeft === 0) {
                lastSeconds.pause();
            }
        } else {

            if (!gameOverPlayed) {
                mainMusic.pause();
                lastSeconds.pause();
                gameOver.play();
                gameOverPlayed = true;

            }

            clearInterval(timer); // Stop the timer when time is up
            beginText.textContent = `Time is up!`;
            beginText2.textContent = `You lost! Try again!`;
            startGame.textContent = 'Try Again';
            startGame.removeEventListener('click', startGame);
            startGame.addEventListener('click', () => {
                location.reload();
            });
            overlay.style.display = 'flex';

            document.querySelectorAll('.cards').forEach(card => {
                card.removeEventListener('click', flibCard);
            });

            newElement.textContent = 'Time is up!';
        }
    }, 1000);
}

startGame.addEventListener('click', () => {
    startTimer();
    overlay.style.display = 'none';
});

function generateRandomArray() {
    const array = [...Array(20).keys()];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


const randomArray = generateRandomArray();
console.log(randomArray);


for (let i = 0; i < 20; i++) {
    Bloks[i].style.order = randomArray[i];
    // console.log(Bloks[i]);  
}





//////////

/////////
function flibCard() {
    // flipMusic.play();
    this.classList.toggle('rotated');


    let flibedCards = Bloks.filter(Card => !Card.classList.contains('rotated') && !Card.classList.contains('matched'));
    console.log(flibedCards.length);
    if (flibedCards.length === 2) {

        let x = flibedCards[0].querySelector('.front');
        let y = flibedCards[1].querySelector('.front');
        const backgroundImage = window.getComputedStyle(x).backgroundImage;
        const backgroundImage2 = window.getComputedStyle(y).backgroundImage;

        const imageUrl1 = backgroundImage.slice(5, -2);
        const imageUrl2 = backgroundImage2.slice(5, -2);

        console.log(imageUrl1);
        console.log(imageUrl2);
        if (imageUrl1 === imageUrl2) {
            matchMusic.play();
            matchMusic.currentTime = 0;
            flibedCards[0].classList.remove('rotated');
            flibedCards[1].classList.remove('rotated');
            flibedCards[0].classList.add('matched');
            flibedCards[1].classList.add('matched');
            flibedCards[0].removeEventListener('click', flibCard);
            flibedCards[1].removeEventListener('click', flibCard);
            let matchedCards = Bloks.filter(block => block.classList.contains('matched'));
            console.log(matchedCards.length);
            if (matchedCards.length === 20) {
                mainMusic.pause();
                lastSecondsPlayed = true;
                lastSeconds.pause();
                gameOver.pause();
                winMusic.play();
                changeTimer();
                document.querySelectorAll('.cards').forEach(card => {
                    card.removeEventListener('click', flibCard);
                });
                beginText.textContent = `Congratulations ${playerName}!`;
                beginText2.textContent = `You finished the game!`;
                startGame.removeEventListener('click', startGame);
                overlay.style.display = 'flex';

            
                startGame.addEventListener('click', () => {
                    location.reload();
                });


            }
            flibedCards.length = 0;
        }
        else {
            setTimeout(() => {
                flibedCards[0].classList.add('rotated');
                flibedCards[1].classList.add('rotated');
                flibedCards.length = 0;
            }, 1000);
        }
        console.log(flibedCards.length);
    }


}

