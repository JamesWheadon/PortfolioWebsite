const gameBoard = document.getElementById("snakeGame");
const context = gameBoard.getContext("2d");
const scale = 50;
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

//playSnake()

const testBoard = document.getElementById("test");
const ctx = testBoard.getContext("2d");
const headDirection = {x: 1, y: 0};
const head = {x: 100, y:100};
const testArray = [{x: 100, y:100}, {x: 150, y: 100}, {x: 150, y: 50}, {x: 200, y: 50}, {x: 200, y: 100}, {x: 200, y: 150}, {x: 150, y: 150}, {x: 150, y: 200}, {x: 150, y: 250}, {x: 200, y: 250}, {x: 250, y: 250}, {x: 250, y: 300}, {x: 250, y: 350}, {x: 300, y: 350}, {x: 300, y: 300}]//, {x: 300, y: 250}]
const dS = scale * 0.4;
let pathD = headDirection;
let nextD;
function drawSnake() {
    ctx.beginPath();

    ctx.moveTo(head.x + pathD.y * dS + (pathD.x * scale / 2), head.y - pathD.x * dS + (pathD.y * scale / 2));
    let lefts = 0;
    for (let i = 1; i < testArray.length - 1; i++) {
        point = testArray[i];
        nextD = {x: (testArray[i + 1].x - point.x)/scale, y: (testArray[i + 1].y - point.y)/scale};
        if (pathD.x === nextD.x) {
            if (lefts > 0) {
                if (lefts === 1) {
                    quarterLeft(point);
                } else {
                    halfLeft(point);
                }
            }
            ctx.lineTo(point.x + pathD.y * dS, point.y - pathD.x * dS);
            lefts = 0;
        } else if (pathD.x !== 0) {
            if (pathD.x === nextD.y) {
                if (lefts > 0) {
                    if (lefts === 1) {
                        quarterLeft(point);
                    } else {
                        halfLeft(point);
                    }
                }
                ctx.lineTo(point.x, point.y - dS * pathD.x);
                ctx.quadraticCurveTo(point.x + dS * pathD.x, point.y - dS * pathD.x, point.x + dS * pathD.x, point.y)
            }
            else {
                lefts++;
            }
        } else {
            if (pathD.y === nextD.x) {
                lefts++;
            }
            else {
                if (lefts > 0) {
                    if (lefts === 1) {
                        quarterLeft(point);
                    } else {
                        halfLeft(point);
                    }
                }
                ctx.lineTo(point.x + dS * pathD.y, point.y);
                ctx.quadraticCurveTo(point.x + dS * pathD.y, point.y + dS * pathD.y, point.x, point.y + dS * pathD.y);
            }
        }
        pathD = nextD;
    }
    if (lefts > 0) {
        if (lefts === 1) {
            quarterLeft(testArray[testArray.length - 1]);
        } else {
            halfLeft(testArray[testArray.length - 1]);
        }
    }
    drawTailEnd(testArray[testArray.length - 1])
    pathD = {x: -pathD.x, y: -pathD.y}
    lefts = 0;
    for (let i = testArray.length - 2; i > 0; i--) {
        point = testArray[i];
        nextD = {x: (testArray[i - 1].x - point.x)/scale, y: (testArray[i - 1].y - point.y)/scale};
        if (pathD.x === nextD.x) {
            if (lefts > 0) {
                if (lefts === 1) { 
                    quarterLeft(point);
                } else {
                    halfLeft(point);
                }
            }
            ctx.lineTo(point.x + pathD.y * dS, point.y - pathD.x * dS);
            lefts = 0;
        } else if (pathD.x !== 0) {
            if (pathD.x === nextD.y) {
                if (lefts > 0) {
                    if (lefts === 1) {
                        quarterLeft(point);
                    } else {
                        halfLeft(point);
                    }
                }
                ctx.lineTo(point.x, point.y - dS * pathD.x);
                ctx.quadraticCurveTo(point.x + dS * pathD.x, point.y - dS * pathD.x, point.x + dS * pathD.x, point.y)
            }
            else {
                lefts++;
            }
        } else {
            if (pathD.y === nextD.x) {
                lefts++;
            }
            else {
                if (lefts > 0) {
                    if (lefts === 1) {
                        quarterLeft(point);
                    } else {
                        halfLeft(point);
                    }
                }
                ctx.lineTo(point.x + dS * pathD.y, point.y);
                ctx.quadraticCurveTo(point.x + dS * pathD.y, point.y + dS * pathD.y, point.x, point.y + dS * pathD.y);
            }
        }
        pathD = nextD;
    }
    if (lefts > 0) {
        if (lefts === 1) {
            quarterLeft(testArray[0]);
        } else {
            halfLeft(testArray[0]);
        }
    }
    drawHead(head);
    
    ctx.fillStyle = color;
    ctx.fill();
    drawEyes();
}

function drawTailEnd(tailEnd) {
    ctx.lineTo(tailEnd.x + pathD.y * dS - pathD.x * scale / 2, tailEnd.y - pathD.x * dS - pathD.y * scale / 2)
    ctx.bezierCurveTo(tailEnd.x + (pathD.y * dS) + (pathD.x * scale / 2), tailEnd.y - (pathD.x * dS) + (pathD.y * scale / 2), tailEnd.x - (pathD.y * dS) + (pathD.x * scale / 2), tailEnd.y + (pathD.x * dS) + (pathD.y * scale / 2), tailEnd.x - pathD.y * dS - pathD.x * scale / 2, tailEnd.y + pathD.x * dS - pathD.y * scale / 2);
}

function drawHead(head) {
    ctx.lineTo(head.x + pathD.y * dS - (pathD.x * scale / 2), head.y - pathD.x * dS - (pathD.y * scale / 2));
    ctx.bezierCurveTo(head.x + pathD.y * scale / 2, head.y - pathD.x * scale / 2, head.x + (pathD.x + 0.4 * pathD.y) * scale / 2, head.y + (-0.4 * pathD.x + pathD.y) * scale / 2, head.x + pathD.x * scale / 2, head.y + pathD.y * scale / 2);
    ctx.bezierCurveTo(head.x + (pathD.x - 0.4 * pathD.y) * scale / 2, head.y + (0.4 * pathD.x + pathD.y) * scale / 2, head.x - pathD.y * scale / 2, head.y + pathD.x * scale / 2, head.x - pathD.y * dS - (pathD.x * scale / 2), head.y + pathD.x * dS - (pathD.y * scale / 2));
}

function drawEyes() {
    ctx.beginPath();
    ctx.ellipse(head.x + pathD.y * scale / 5 - pathD.x * scale / 4, head.y + pathD.x * scale / 5 - pathD.y * scale / 4, dS / 3, dS / 4, -Math.PI / 4, 0, 2 * Math.PI);
    ctx.ellipse(head.x - pathD.y * scale / 5 - pathD.x * scale / 4, head.y - pathD.x * scale / 5 - pathD.y * scale / 4, dS / 3, dS / 4, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(head.x + pathD.y * scale / 5 - pathD.x * scale / 4, head.y + pathD.x * scale / 5 - pathD.y * scale / 4, dS / 6, 0, 2 * Math.PI);
    ctx.arc(head.x - pathD.y * scale / 5 - pathD.x * scale / 4, head.y - pathD.x * scale / 5 - pathD.y * scale / 4, dS / 6, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fill();
}

function quarterLeft(point) {
    ctx.arcTo(point.x + pathD.y * dS - pathD.x * (scale - dS), point.y - pathD.x * dS - pathD.y * (scale - dS), point.x + pathD.y * dS - pathD.x * (scale/2 - dS), point.y - pathD.x * dS - pathD.y * (scale / 2 - dS), (scale/2 - dS));
}

function halfLeft(point) {
    ctx.arcTo(point.x + pathD.y * dS - pathD.x * (scale - dS) + pathD.y * 2 * (scale/2 - dS), point.y - pathD.x * dS - pathD.y * (scale/2) - pathD.y * 2 * (scale/2 - dS), point.x + pathD.y * dS - pathD.x * (scale/2 - dS) + pathD.y * (scale/2 - dS), point.y - pathD.x * dS - pathD.y * (scale/2) - pathD.y * 2 * (scale/2 - dS), (scale / 2 - dS));
    ctx.arcTo(point.x + pathD.y * dS - pathD.x * (scale - dS), point.y - pathD.x * dS - pathD.y * (scale/2) - pathD.y * 2 * (scale/2 - dS),point.x + pathD.y * dS - pathD.x * (scale - dS), point.y - pathD.x * dS - pathD.y * (scale/2) - pathD.y * (scale/2 - dS), (scale / 2 - dS));
}

drawSnake()