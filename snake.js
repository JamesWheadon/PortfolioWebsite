const gameBoard = document.getElementById("snakeGame");
const context = gameBoard.getContext("2d");
const scale = 20;
const color = "rgb(70, 214, 4)";
let xSpeed, ySpeed, snakeHeadX, snakeHeadY, fruitX, fruitY, score;
let tail;
let eatenFruits = [];

function playSnake() {
    newFruit();
    window.addEventListener("keydown", pressedKey);
    xSpeed = scale;
    ySpeed = 0;
    snakeHeadX = 0;
    snakeHeadY = 0;
    score = 0;
    tail = [];
    gameInterval = window.setInterval(() => {
        context.clearRect(0, 0, 500, 500);
        moveSnake();
        if (snakeHeadX === fruitX && snakeHeadY === fruitY) {
            score++;
            eatenFruits.push({x: fruitX, y: fruitY})
            newFruit();
        }
        if(snakeHeadX >= gameBoard.width || snakeHeadX < 0 || snakeHeadY >= gameBoard.height || snakeHeadY < 0)
        {
            clearInterval(gameInterval);
        }
        drawSnake();
        drawFruit();
    }, 200);
}

function pressedKey(event) {
    switch (event.key.toLowerCase()) {
        case "arrowup":
        case "w":
            if (ySpeed === 0) {
                xSpeed = 0;
                ySpeed = -scale;
            } 
            break;
        case "arrowdown":
        case "s":
            if (ySpeed === 0) {
                xSpeed = 0;
                ySpeed = scale;
            } 
            break;
        case "arrowleft":
        case "a":
            if (xSpeed === 0) {
                xSpeed = -scale;
                ySpeed = 0;
            } 
            break;
        case "arrowright":
        case "d":
            if (xSpeed === 0) {
                xSpeed = scale;
                ySpeed = 0;
            } 
            break;
        default:
            break;
    }
}

function moveSnake() {
    if (tail.length > 0) {
        for (let i = 0; i < tail.length - 1; i++) {
            tail[i] = tail[i + 1];
        }
        tail[tail.length - 1] = { x: snakeHeadX, y: snakeHeadY };
    }
    snakeHeadX += xSpeed;
    snakeHeadY += ySpeed;
    yummyTail();
    growSnake();
}

function drawSnake() {
    context.beginPath();
    context.arc(snakeHeadX+scale/2, snakeHeadY+scale/2, scale/2, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    drawSnakeTail();
}

function drawSnakeTail() {
let tailRadius = scale/4;
    for (i = 0; i < tail.length; i++) {
        tailRadius=tailRadius+((scale/4)/tail.length);
        context.beginPath();
        context.fillStyle = color;
        context.arc((tail[i].x+scale/2), (tail[i].y+scale/2), tailRadius, 0, 2 * Math.PI);
        context.fill();
    }
}

function newFruit() {
    fruitX = Math.floor(Math.random() * (gameBoard.width / scale)) * scale;
    fruitY = Math.floor(Math.random() * (gameBoard.height / scale)) * scale;
}

function drawFruit() {
    context.beginPath();
    context.arc(fruitX + scale/2, fruitY + scale/2, scale/4, 0, 2 * Math.PI);
    context.fillStyle = 'rgb(255, 0, 0)';
    context.fill();
}

function growSnake() {
    for (fruit of eatenFruits) {
        if (!tail.includes(fruit)) {
            tail.push(fruit);
            eatenFruits = eatenFruits.filter(item => item !== fruit);
            break;
        }
    }
}

function yummyTail() {
    tail.forEach((item) => {
        if (item.x === snakeHeadX && item.y === snakeHeadY) {
            console.log(tail, {x: snakeHeadX, y: snakeHeadY})
            clearInterval(gameInterval);
        }
    })
}

playSnake()