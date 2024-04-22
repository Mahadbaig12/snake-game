const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 20, y: 20 };
let dx = 0;
let dy = 0;
let score = 0;

function drawSnake() {
    snake.forEach((segment) => {
        ctx.fillStyle = "#006600";
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) {
        gameOver();
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(gameInterval);
    alert("Game Over! Your score is " + score);
    location.reload();
}

function gameLoop() {
    clearCanvas();
    drawSnake();
    drawFood();
    moveSnake();
    checkCollision();
    drawScore();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -1;
    } else if (e.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = 1;
    } else if (e.key === "ArrowLeft" && dx === 0) {
        dx = -1;
        dy = 0;
    } else if (e.key === "ArrowRight" && dx === 0) {
        dx = 1;
        dy = 0;
    }
});

generateFood();
let gameInterval = setInterval(gameLoop, 100);
