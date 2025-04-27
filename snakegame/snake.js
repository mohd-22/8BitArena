const gameboard = document.querySelector('#board');
const scoreDisplay = document.querySelector('#score');
const ctx = gameboard.getContext('2d');
const playAgainButton = document.querySelector('#playagain');
var height = gameboard.height;
var width = gameboard.width;
const block = 25;
ctx.fillStyle = '#99cc03';
ctx.fillRect(0, 0, width, height);
const snakeColor = 'black';
const snakeBorderColor = 'darkgreen';
const foodColor = 'red';
const foodBorderColor = 'darkred';
let levelSpeed;
let level;
let earnP = new Audio('sounds/earn.mp3');
let gameoverr = new Audio('sounds/Gameover.mp3');
gameoverr.volume = 0.3;
gameoverr.loop = false;
gameoverr.muted = false;
let music = new Audio('sounds/Music.mp3');
music.volume = 0.3;
music.loop = true;
music.muted = false;
earnP.volume = 0.3;
earnP.loop = false;
earnP.muted = false;

var running = true;
const startover = document.querySelector('.start');
let snake = [
    // { x: snakeX, y: snakeY }
];
setTimeout(() => {
    level = parseInt(prompt("Enter the level from 1 to 4 (1 being the slowest and 4 being the fastest): "));
    if (level === 1) {
        levelSpeed = 200;
    }
    else if (level === 2) {
        levelSpeed = 100;
    }
    else if (level === 3) {
        levelSpeed = 75;
    }
    else if (level === 4) {
        levelSpeed = 50;
    }
    else {
        levelSpeed = 150;
    }
    if (running) {
       
        gameInterval = setInterval(moveSnake, levelSpeed);
    }
}, 1000);
var xcor = block * 5;
var ycor = block * 5;
var snakeX = xcor;
var snakeY = ycor;
ctx.fillStyle = snakeColor;
ctx.fillRect(snakeX, snakeY, block, block);

let direction = '';
let gameInterval;

window.onload = function () {
    generateFood();
    document.addEventListener('keydown', changeDirection);
    music.play();
};

function changeDirection(e) {
    startover.style.display = 'none';

    if (e.code === "ArrowLeft" && direction !== 'right') {
        direction = 'left';
    } else if (e.code === "ArrowUp" && direction !== 'down') {
        direction = 'up';
    } else if (e.code === "ArrowRight" && direction !== 'left') {
        direction = 'right';
    } else if (e.code === "ArrowDown" && direction !== 'up') {
        direction = 'down';
    }
}

function moveSnake() {

    ctx.fillStyle = '#99cc03';
    ctx.fillRect(0, 0, width, height);


    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = { ...snake[i - 1] };
    }

    // Move the snake's head
    if (direction === 'left') {
        xcor -= block;
    } else if (direction === 'up') {
        ycor -= block;
    } else if (direction === 'right') {
        xcor += block;
    } else if (direction === 'down') {
        ycor += block;
    }

    if (snake.length > 0) {
        snake[0] = { x: xcor, y: ycor };
    } else {
        
        snake.push({ x: xcor, y: ycor });
    }


    if (xcor < 0 || xcor >= width || ycor < 0 || ycor >= height) {
        running = false;
        clearInterval(gameInterval);
        gameOver();
        return;
    }

    // Check for collisions with the snake's body
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === xcor && snake[i].y === ycor) {
            running = false;
            clearInterval(gameInterval);
            gameOver();
            return;
        }
    }

    if (xcor === foodX && ycor === foodY) {
        earnP.play();
        earnP.currentTime = 0;
        scoreDisplay.innerHTML = parseInt(scoreDisplay.innerHTML) + 1;
        generateFood();
        snake.push({ x: xcor, y: ycor });
    }


    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, block, block);
    ctx.strokeStyle = foodBorderColor;
    ctx.strokeRect(foodX, foodY, block, block);

    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            ctx.fillStyle = 'gray';
            ctx.fillRect(snake[i].x, snake[i].y, block, block);

        }
        else {

            ctx.fillStyle = snakeColor;
            ctx.fillRect(snake[i].x, snake[i].y, block, block);
            ctx.strokeStyle = snakeBorderColor;
            ctx.strokeRect(snake[i].x, snake[i].y, block, block);
        }
    }
}



function gameOver() {
    music.pause();
    gameoverr.play();
    playAgainButton.style.display = 'block';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(snake[i].x, snake[i].y, block, block);
        ctx.strokeStyle = snakeBorderColor;
        ctx.strokeRect(snake[i].x, snake[i].y, block, block);
    }

    ctx.fillStyle = 'white';
    ctx.font = '30px monospace';
    ctx.fillText('Game Over', width / 2 - 70, height / 2 - 15);
    ctx.fillText('Score: ' + scoreDisplay.innerHTML, width / 2 - 50, height / 2 + 15);

}

function generateFood() {
    foodX = Math.floor(Math.random() * (width / block)) * block;
    foodY = Math.floor(Math.random() * (height / block)) * block;
    for (let i = 0; i < snake.length; i++) {
        if (foodX === snake[i].x && foodY === snake[i].y) {
            generateFood();
        }
    }
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, block, block);
    ctx.strokeStyle = foodBorderColor;
    ctx.strokeRect(foodX, foodY, block, block);
}
function PlayAgain() {
    window.location.reload();
}

