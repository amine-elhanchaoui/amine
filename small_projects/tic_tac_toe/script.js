// Game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = {
    X: 0,
    O: 0
};
let playerNames = {
    X: 'Player X',
    O: 'Player O'
};

// DOM elements
const nameInputScreen = document.querySelector('.name-input-screen');
const container = document.querySelector('.container');
const playerXInput = document.getElementById('player-x');
const playerOInput = document.getElementById('player-o');
const startGameButton = document.querySelector('.start-game-button');
const cells = document.querySelectorAll('.cell');
const playerTurnElement = document.querySelector('.player-turn');
const playerScores = document.querySelectorAll('.player-score');
const resetButton = document.querySelector('.reset-button');
const resetScoreButton = document.querySelector('.reset-score-button');
const winMessage = document.querySelector('.win-message');
const drawMessage = document.querySelector('.draw-message');

// Start game with player names
function startGame() {
    const playerXName = playerXInput.value.trim();
    const playerOName = playerOInput.value.trim();

    if (!playerXName || !playerOName) {
        alert('Please enter names for both players!');
        return;
    }

    playerNames.X = playerXName;
    playerNames.O = playerOName;
    
    nameInputScreen.style.display = 'none';
    container.style.display = 'block';
    initGame();
}

// Initialize game
function initGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    updateStatus();
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

// Update game status
function updateStatus() {
    playerTurnElement.textContent = `${playerNames[currentPlayer]}'s Turn`;
    playerScores[0].textContent = `${playerNames.X}: ${scores.X}`;
    playerScores[1].textContent = `${playerNames.O}: ${scores.O}`;
}

// Check for win
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return null;
}

// Check for draw
function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (gameBoard[index] !== '' || !gameActive) return;

    // Update game board
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    // Check for win or draw
    const winner = checkWin();
    if (winner) {
        gameActive = false;
        scores[winner]++;
        showWinMessage(winner);
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        showDrawMessage();
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

// Show win message
function showWinMessage(winner) {
    const winContent = winMessage.querySelector('.win-content');
    winContent.innerHTML = `
        <h2>${playerNames[winner]} Wins!</h2>
        <button class="play-again-button">
            <i class="fas fa-redo"></i>
            Play Again
        </button>
    `;
    winMessage.style.display = 'flex';
    animateWinMessage();
}

// Show draw message
function showDrawMessage() {
    const drawContent = drawMessage.querySelector('.draw-content');
    drawContent.innerHTML = `
        <h2>It's a Draw!</h2>
        <button class="play-again-button">
            <i class="fas fa-redo"></i>
            Play Again
        </button>
    `;
    drawMessage.style.display = 'flex';
    animateDrawMessage();
}

// Animate win message
function animateWinMessage() {
    const winContent = winMessage.querySelector('.win-content');
    winContent.style.animation = 'none';
    winContent.offsetHeight; // Trigger reflow
    winContent.style.animation = 'popIn 0.5s ease';
}

// Animate draw message
function animateDrawMessage() {
    const drawContent = drawMessage.querySelector('.draw-content');
    drawContent.style.animation = 'none';
    drawContent.offsetHeight; // Trigger reflow
    drawContent.style.animation = 'popIn 0.5s ease';
}

// Reset game
function resetGame() {
    initGame();
    winMessage.style.display = 'none';
    drawMessage.style.display = 'none';
}

// Reset scores
function resetScores() {
    scores = { X: 0, O: 0 };
    updateStatus();
}

// Event listeners
startGameButton.addEventListener('click', startGame);

// Add enter key support for name inputs
playerXInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        playerOInput.focus();
    }
});

playerOInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startGame();
    }
});

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
resetScoreButton.addEventListener('click', resetScores);

// Close messages when clicking outside
winMessage.addEventListener('click', (e) => {
    if (e.target === winMessage) {
        winMessage.style.display = 'none';
    }
});

drawMessage.addEventListener('click', (e) => {
    if (e.target === drawMessage) {
        drawMessage.style.display = 'none';
    }
});

// Initialize game on load
initGame(); 