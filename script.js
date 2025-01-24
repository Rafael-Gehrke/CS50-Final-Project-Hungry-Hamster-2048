document.addEventListener('DOMContentLoaded', () => {
var board;
var score = 0;
var rows = 4;
var columns = 4;
let highScore = localStorage.getItem('highScore') || 0;
const gameOverElem = document.getElementById('game-over');
const winScreenElem = document.getElementById('win-screen');
document.getElementById('high-score').innerText = highScore;
let win = false;

function setGame() {
     board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    //create 2 to begin the game
    setTwo();
    setTwo();
}

function updateTile(tile, num) { //Updates the tile style
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
    } else if (e.code == "ArrowRight") {
        slideRight();
    } else if (e.code == "ArrowUp") {
        slideUp();
    } else if (e.code == "ArrowDown") {
        slideDown();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row) {
    return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
            checkHighScore();
            if (!win) {
                checkForWin();
            }
            showPopupText();
        }
    }
    row = filterZero(row);
    //add zeroes
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function checkHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        document.getElementById('high-score').innerText = highScore;
    }
    return;
}

function copyArray(array) {
    return array.map(row => row.slice());
}

function arraysEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr1[i].length; j++) {
            if (arr1[i][j] !== arr2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function slideLeft() {
    let boardIn = copyArray(board);
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    if (!arraysEqual(board, boardIn)) {
        setTwo();
    }
}

function slideRight() {
    let boardIn = copyArray(board);
    for (let r = 0; r < rows; r++) {
        let row = board[r];         //[0, 2, 2, 2]
        row.reverse();              //[2, 2, 2, 0]
        row = slide(row)            //[4, 2, 0, 0]
        board[r] = row.reverse();   //[0, 0, 2, 4];
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    if (!arraysEqual(board, boardIn)) {
        setTwo();
    }
}

function slideUp() {
    let boardIn = copyArray(board);
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    if (!arraysEqual(board, boardIn)) {
        setTwo();
    }
}

function slideDown() {
    let boardIn = copyArray(board);
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    if (!arraysEqual(board, boardIn)) {
        setTwo();
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        // If no empty tiles, check for game over
        if (checkForGameOver()) {
            return;
        }
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            tile.classList.add('new');
            found = true;
            // Remove a classe de animação após 300ms
            setTimeout(() => {
                tile.classList.remove('new');
            }, 300);
        }
    }
    checkForGameOver()
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}

function checkForGameOver() {
    // Check for any empty spaces
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return false; // Not game over if there's an empty space
            }
        }
    }
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
            if (board[r][c] == board[r][c + 1]){
                return false;
            }
        }
    }
    for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == board[r + 1][c]){
                return false;
            }
        }
    }
        // If we reach here, no moves are possible
        gameOverElem.style.display = 'flex';
    return true;
}

function checkForWin() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 2048) {
                winScreenElem.style.display = 'flex';
                win = true;
                return true;
            }
        }
    }
}

document.getElementById('resume-btn').addEventListener('click', () => {
    hideWinScreen();
    // Optionally, reset the game or resume from the current state
});

function hideWinScreen() {
    winScreenElem.style.display = 'none';
}

// Function to restart the game
function restartGame() {
    score = 0;
    win = false;
    document.getElementById("score").innerText = score;
    gameOverElem.style.display = 'none';
    // Clear existing tiles
    let boardElement = document.getElementById("board");
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }
    setGame();
}
document.getElementById('restart-btn').addEventListener('click', restartGame);


const phrases = [
    "Make it hungrier!",
    "Hungrier than that",
    "Just. Make. it. Hungrier.",
    "JUST DO IT",
    "I BELIEVE IN YOU",
    "WE’RE RIDING THE EDGE HERE",
    "You fool, don’t stop now",
    "We can go one step further",
    "And this... Is... to go... even further beyond!"
]

function showPopupText() {
    if (document.querySelector('.popup-text')) {
        return; // Exit the function if a phrase is already displayed
    }
    const popupText = document.createElement('div');
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    popupText.classList.add('popup-text');
    popupText.innerText = phrase;
    // Position phrase in a random area
    const x = window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.4;
    const y = window.innerHeight * 0.3 + Math.random() * window.innerHeight * 0.4;
    popupText.style.left = `${x}px`;
    popupText.style.top = `${y}px`;
    popupText.style.display = 'block';
    document.body.appendChild(popupText);
    // Remove the phrase after 2 seconds
    setTimeout(() => {
        popupText.remove();
    }, 2000);
}

setGame();
});
