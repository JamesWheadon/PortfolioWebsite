let wordGuessed;
let wrongGuesses;
let word;
let guessedLetters = [];
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const guessInput = document.getElementById('hangmanGuess');

async function hangmanWord() {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?number=1`);
    const words = await response.json();
    return words[0];
}

function playHangman() {
    wordGuessed = false;
    wrongGuesses = 0;
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
            document.getElementById('hangmanBlanks').textContent = '';
            for(let i = 0; i < word.length; i++) {
                if (guessedLetters.includes(word[i])) {
                    document.getElementById('hangmanBlanks').textContent += `${word[i]} `;
                }
                else {
                    document.getElementById('hangmanBlanks').textContent += '_ ';
                }
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
            break;
    }
}

playHangman()