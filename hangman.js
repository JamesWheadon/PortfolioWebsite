let wrongGuesses;
let word;
let guessedLetters;
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const guessInput = document.getElementById('hangmanGuess');

async function hangmanWord() {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?number=1`);
    const words = await response.json();
    return words[0];
}

function playHangman() {
    wrongGuesses = 0;
    guessedLetters = [];
    document.getElementById("hangmanAni").style.animationName = "";
    document.getElementById("leftArm").style.animationName = "";
    document.getElementById("rightArm").style.animationName = "";
    document.getElementById("wrongGuesses").innerHTML = "";
    document.getElementById("hangmanAni").style.left = "300px";
    document.getElementById("hangmanAni").style.top = "50px";
    Array.prototype.forEach.call(document.getElementsByClassName("hangmanDrawing"), element => {
        element.style.display = "none";
    });
    document.getElementById('hangmanBlanks').textContent = "";
    document.getElementById("hangmanCover").style.display = "none";
    let guessWord = hangmanWord();

    guessWord.then(generatedWord => {
        word = generatedWord;
        hangmanClue();
        guessInput.addEventListener('keyup', letterGuess);
    })
}

function letterGuess() {
    guessInput.value = "";
    guess = event.key.toLowerCase();
    if (alphabet.includes(guess) && !guessedLetters.includes(guess)) {
        guessedLetters.push(guess);
        if (word.includes(guess)) {
            let solved = true;
            document.getElementById('hangmanBlanks').textContent = '';
            for(let i = 0; i < word.length; i++) {
                if (guessedLetters.includes(word[i])) {
                    document.getElementById('hangmanBlanks').textContent += `${word[i].toUpperCase()} `;
                }
                else {
                    document.getElementById('hangmanBlanks').textContent += '_ ';
                    solved = false;
                }
            }
            if (solved) {
                hangmanWon();
            }
        }
        else {
            document.getElementById("wrongGuesses").innerHTML += `<span class="wrongGuess">${guess.toUpperCase()}</span> `;
            wrongGuesses++;
            drawHangman();
        }
    }
}

function hangmanClue() {
    for(let i = 0; i < word.length; i++) {
        document.getElementById('hangmanBlanks').textContent += '_ ';
    }
}

function drawHangman() {
    switch(wrongGuesses) {
        case 1:
            document.getElementById('hangmanBase').style.display = 'block';
            break;
        case 2:
            document.getElementById('hangmanStand').style.display = 'block';
            break;
        case 3:
            document.getElementById('hangmanFrame').style.display = 'block';
            break;
        case 4:
            document.getElementById('hangmanNoose').style.display = 'block';
            break;
        case 5:
            document.getElementById('hangmanHead').style.display = 'block';
            break;
        case 6:
            document.getElementById('hangmanBody').style.display = 'block';
            break;
        case 7:
            document.getElementById('hangmanArms').style.display = 'block';
            break;
        case 8:
            document.getElementById('hangmanLegs').style.display = 'block';
            hangmanLost();
            break;
        default:
            break;
    }
}

function hangmanWon() {
    document.getElementById("hangmanMessage").textContent = `Correct, the word was ${word}`;
    document.getElementById("hangmanCover").style.display = "flex";
    Array.prototype.forEach.call(document.getElementsByClassName("hangmanDrawing"), element => {
        element.style.display = "block";
    });
    document.getElementById('hangmanNoose').style.display = 'none';
    document.getElementById("hangmanAni").style.animationName = "hangmanCelebrate";
    document.getElementById("hangmanAni").style.left = "175px";
    document.getElementById("hangmanAni").style.top = "111.5px";
    document.getElementById("leftArm").style.animationName = "leftArmCelebrate";
    document.getElementById("rightArm").style.animationName = "rightArmCelebrate";
}

function hangmanLost() {
    document.getElementById("hangmanMessage").textContent = `You lose, the word was ${word}`;
    document.getElementById("hangmanCover").style.display = "flex";
    document.getElementById("hangmanAni").style.animationName = "hangmanRotate";
}