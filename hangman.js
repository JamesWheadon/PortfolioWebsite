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
                    document.getElementById('hangmanBlanks').textContent += `${word[i]} `;
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
            console.log("wrong");
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
}

function hangmanLost() {
    document.getElementById("hangmanMessage").textContent = `You lose, the word was ${word}`;
    document.getElementById("hangmanCover").style.display = "flex";
    document.getElementById("hangmanAni").style.animationName = "hangmanRotate";
}