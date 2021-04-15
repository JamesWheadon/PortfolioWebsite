const gameBoard = document.getElementById("snakeGame");
const context = gameBoard.getContext("2d");
if (window.innerWidth <= 540) {
    if (window.innerWidth <= 440) {
        if (window.innerWidth <= 340) {
            gameBoard.width = 240;
            gameBoard.height = 240;
        }
        else {
            gameBoard.width = 300;
            gameBoard.height = 300;
        }
    }
    else {
        gameBoard.width = 400;
        gameBoard.height = 400;
    }
}
const scale = gameBoard.width / 10;
const dS = scale * 0.4;
const colour = "rgb(70, 214, 4)";
let xSpeed, ySpeed, snakeHeadX, snakeHeadY, fruitX, fruitY, score, pathD, nextD, tail,eatenFruits, fullSnake, nextX, nextY;
let playing = false;
let pause = false;
const scoreCard = document.getElementById("yourScore");

document.getElementById("playPause").addEventListener("click", playPause);
gameBoard.addEventListener("touch", touchMove);
gameBoard.addEventListener("click", touchMove);

function playPause() {
    if (!playing) {
        playing = true;
        document.getElementById("playPause").textContent = "Pause";
        playSnake();
    } else {
            if (!pause) {
            pause = true;
            window.removeEventListener("keydown", pressedKey);
            clearInterval(gameInterval);
            document.getElementById("playPause").textContent = "Play";
        } else {
            pause = false;
            startInterval();
            document.getElementById("playPause").textContent = "Pause";
        }
    }
}

function playSnake() {
    xSpeed = scale;
    ySpeed = 0;
    nextX = 0;
    nextY = 0;
    snakeHeadX = scale * 1.5;
    snakeHeadY = scale * 0.5;
    score = 0;
    tail = [{x: scale * 0.5, y: scale * 0.5}];
    eatenFruits = [];
    newFruit();
    startInterval();
}

function startInterval() {
    gameInterval = window.setInterval(() => {
        window.addEventListener("keydown", pressedKey);
        context.clearRect(0, 0, gameBoard.width, gameBoard.height);
        if (nextX + nextY !== 0) {
            xSpeed = nextX;
            ySpeed = nextY;
        }
        growSnake();
        if (snakeHeadX === fruitX && snakeHeadY === fruitY) {
            score++;
            eatenFruits.push({x: fruitX, y: fruitY})
            newFruit();
        }
        if(snakeHeadX >= gameBoard.width || snakeHeadX < 0 || snakeHeadY >= gameBoard.height || snakeHeadY < 0)
        {
            clearInterval(gameInterval);
            playing = false;
        }
        drawSnake();
        drawFruit();
        updateScore();
    }, 200);
}

function pressedKey(event) {
    switch (event.key.toLowerCase()) {
        case "arrowup":
        case "w":
            if (ySpeed === 0) {
                nextX = 0;
                nextY = -scale;
            } 
            break;
        case "arrowdown":
        case "s":
            if (ySpeed === 0) {
                nextX = 0;
                nextY = scale;
            } 
            break;
        case "arrowleft":
        case "a":
            if (xSpeed === 0) {
                nextX = -scale;
                nextY = 0;
            } 
            break;
        case "arrowright":
        case "d":
            if (xSpeed === 0) {
                nextX = scale;
                nextY = 0;
            } 
            break;
        default:
            break;
    }
}

function touchMove(event) {
    const rect = gameBoard.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    if (x >= y) {
        if (x + y <= gameBoard.width) {
            nextX = 0;
            nextY = -scale;
        } else {
            nextX = scale;
            nextY = 0;
        }
    } else {
        if (x + y <= gameBoard.width) {
            nextX = -scale;
            nextY = 0;
        } else {
            nextX = 0;
            nextY = scale;
        }
    }
}

function growSnake() {
    if (eatenFruits.length > 0) {
        if (eatenFruits[0].x === tail[tail.length - 1].x && eatenFruits[0].y === tail[tail.length - 1].y) {
            moveSnake();
            tail.push(eatenFruits[0]);
            eatenFruits = eatenFruits.filter(item => item !== eatenFruits[0]);
        }
        else {
            moveSnake();
        }
    }
    else {
        moveSnake();
    }
}

function moveSnake() {
    if (tail.length > 0) {
        for (let i = tail.length - 1; i > 0; i--) {
            tail[i] = tail[i - 1];
        }
        tail[0] = { x: snakeHeadX, y: snakeHeadY };
    }
    snakeHeadX += xSpeed;
    snakeHeadY += ySpeed;
    yummyTail();
}

function yummyTail() {
    tail.forEach((item) => {
        if (item.x === snakeHeadX && item.y === snakeHeadY) {
            clearInterval(gameInterval);
            playing = false;
        }
    })
}

function drawSnake() {
    head = {x: snakeHeadX, y:snakeHeadY};
    fullSnake = [head].concat(tail);
    pathD = {x: (fullSnake[1].x - head.x)/scale, y: (fullSnake[1].y - head.y)/scale};
    context.beginPath();
    context.moveTo(head.x + pathD.y * dS + (pathD.x * scale / 2), head.y - pathD.x * dS + (pathD.y * scale / 2));
    let lefts = 0;
    for (let i = 1; i < fullSnake.length - 1; i++) {
        point = fullSnake[i];
        nextD = {x: (fullSnake[i + 1].x - point.x)/scale, y: (fullSnake[i + 1].y - point.y)/scale};
        if (pathD.x === nextD.x) {
            if (lefts > 0) {
                if (lefts === 1) {
                    quarterLeft(point);
                } else {
                    halfLeft(point);
                }
            }
            context.lineTo(point.x + pathD.y * dS, point.y - pathD.x * dS);
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
                context.lineTo(point.x, point.y - dS * pathD.x);
                context.quadraticCurveTo(point.x + dS * pathD.x, point.y - dS * pathD.x, point.x + dS * pathD.x, point.y)
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
                context.lineTo(point.x + dS * pathD.y, point.y);
                context.quadraticCurveTo(point.x + dS * pathD.y, point.y + dS * pathD.y, point.x, point.y + dS * pathD.y);
            }
        }
        pathD = nextD;
    }
    if (lefts > 0) {
        if (lefts === 1) {
            quarterLeft(fullSnake[fullSnake.length - 1]);
        } else {
            halfLeft(fullSnake[fullSnake.length - 1]);
        }
    }
    drawTailEnd(fullSnake[fullSnake.length - 1])
    pathD = {x: -pathD.x, y: -pathD.y}
    lefts = 0;
    for (let i = fullSnake.length - 2; i > 0; i--) {
        point = fullSnake[i];
        nextD = {x: (fullSnake[i - 1].x - point.x)/scale, y: (fullSnake[i - 1].y - point.y)/scale};
        if (pathD.x === nextD.x) {
            if (lefts > 0) {
                if (lefts === 1) { 
                    quarterLeft(point);
                } else {
                    halfLeft(point);
                }
            }
            context.lineTo(point.x + pathD.y * dS, point.y - pathD.x * dS);
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
                context.lineTo(point.x, point.y - dS * pathD.x);
                context.quadraticCurveTo(point.x + dS * pathD.x, point.y - dS * pathD.x, point.x + dS * pathD.x, point.y)
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
                context.lineTo(point.x + dS * pathD.y, point.y);
                context.quadraticCurveTo(point.x + dS * pathD.y, point.y + dS * pathD.y, point.x, point.y + dS * pathD.y);
            }
        }
        pathD = nextD;
    }
    if (lefts > 0) {
        if (lefts === 1) {
            quarterLeft(fullSnake[0]);
        } else {
            halfLeft(fullSnake[0]);
        }
    }
    drawHead(head);
    context.fillStyle = colour;
    context.fill();
    drawEatenFruit();
    drawEyes();
}

function drawTailEnd(tailEnd) {
    context.lineTo(tailEnd.x + pathD.y * dS - pathD.x * scale / 2, tailEnd.y - pathD.x * dS - pathD.y * scale / 2)
    context.bezierCurveTo(tailEnd.x + (pathD.y * dS) + (pathD.x * scale / 2), tailEnd.y - (pathD.x * dS) + (pathD.y * scale / 2), tailEnd.x - (pathD.y * dS) + (pathD.x * scale / 2), tailEnd.y + (pathD.x * dS) + (pathD.y * scale / 2), tailEnd.x - pathD.y * dS - pathD.x * scale / 2, tailEnd.y + pathD.x * dS - pathD.y * scale / 2);
}

function drawHead(head) {
    context.lineTo(head.x + pathD.y * dS - (pathD.x * scale / 2), head.y - pathD.x * dS - (pathD.y * scale / 2));
    context.bezierCurveTo(head.x + pathD.y * scale / 2, head.y - pathD.x * scale / 2, head.x + (pathD.x + 0.4 * pathD.y) * scale / 2, head.y + (-0.4 * pathD.x + pathD.y) * scale / 2, head.x + pathD.x * scale / 2, head.y + pathD.y * scale / 2);
    context.bezierCurveTo(head.x + (pathD.x - 0.4 * pathD.y) * scale / 2, head.y + (0.4 * pathD.x + pathD.y) * scale / 2, head.x - pathD.y * scale / 2, head.y + pathD.x * scale / 2, head.x - pathD.y * dS - (pathD.x * scale / 2), head.y + pathD.x * dS - (pathD.y * scale / 2));
}

function drawEyes() {
    context.beginPath();
    context.ellipse(head.x + pathD.y * scale / 5 - pathD.x * scale / 4, head.y + pathD.x * scale / 5 - pathD.y * scale / 4, dS / 3, dS / 4, -Math.PI / 4, 0, 2 * Math.PI);
    context.ellipse(head.x - pathD.y * scale / 5 - pathD.x * scale / 4, head.y - pathD.x * scale / 5 - pathD.y * scale / 4, dS / 3, dS / 4, Math.PI / 4, 0, 2 * Math.PI);
    context.fillStyle = "rgb(255,255,255)";
    context.fill();
    context.beginPath();
    context.arc(head.x + pathD.y * scale / 5 - pathD.x * scale / 4, head.y + pathD.x * scale / 5 - pathD.y * scale / 4, dS / 6, 0, 2 * Math.PI);
    context.arc(head.x - pathD.y * scale / 5 - pathD.x * scale / 4, head.y - pathD.x * scale / 5 - pathD.y * scale / 4, dS / 6, 0, 2 * Math.PI);
    context.fillStyle = "rgb(0,0,0)";
    context.fill();
}

function drawEatenFruit() {
    for (let fruit of eatenFruits) {
        context.beginPath();
        context.arc(fruit.x, fruit.y, scale / 2, 0, 2 * Math.PI);
        context.fillStyle = colour;
        context.fill();
    }
}

function quarterLeft(point) {
    context.arcTo(point.x + pathD.y * dS - pathD.x * (scale - dS),point.y - pathD.x * dS - pathD.y * (scale - dS),point.x + pathD.y * dS - pathD.x * (scale/2 - dS),point.y - pathD.x * dS - pathD.y * (scale / 2 - dS),(scale/2 - dS));
}

function halfLeft(point) {
    if (pathD.y === 0) {
        context.arcTo(point.x - pathD.x * (scale - dS),point.y - pathD.x * (scale - dS),point.x - pathD.x * (scale - dS),point.y - pathD.x * (scale/2),(scale/2 - dS))
        context.arcTo(point.x - pathD.x * (scale - dS),point.y - pathD.x * dS,point.x,point.y - pathD.x * dS,(scale/2 - dS))
    } else {
        context.arcTo(point.x + pathD.y * (scale - dS),point.y - pathD.y * (scale - dS),point.x + pathD.y * (scale/2),point.y - pathD.y * (scale - dS),(scale / 2 - dS));
        context.arcTo(point.x + pathD.y * dS,point.y - pathD.y * (scale - dS),point.x + pathD.y * dS,point.y,(scale / 2 - dS));
    }
}

function newFruit() {
    let fruitInSnake;
    do {
        fruitX = (Math.floor(Math.random() * (gameBoard.width / scale)) + 0.5) * scale;
        fruitY = (Math.floor(Math.random() * (gameBoard.height / scale)) + 0.5) * scale;
        fruitInSnake = false;
        if (fruitX !== snakeHeadX || fruitY != snakeHeadY) {
            for (point of tail) {
                if (fruitX === point.x && fruitY === point.y) {
                    fruitInSnake = true;
                    break;
                }
            }
        }
        else {
            fruitInSnake = true;
        }
    } while (fruitInSnake);
}

function drawFruit() {
    context.beginPath();
    context.arc(fruitX, fruitY, scale/4, 0, 2 * Math.PI);
    context.fillStyle = 'rgb(255, 0, 0)';
    context.fill();
}

function updateScore() {
    scoreCard.textContent = tail.length + eatenFruits.length - 1;
}