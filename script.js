// script.js

// Initial game state
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let scores = { 'X': 0, 'O': 0 };

// Selecting the HTML elements
const playerTurn = document.getElementById('playerTurn');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const cells = document.querySelectorAll('.cell');

// Winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function to handle cell click
function cellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== '' || !isGameActive) {
    return;
  }

  // Update the game state and UI
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  // Check for a winner or a draw
  checkResult();
}

// Check for a winner or a tie
function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = gameState[winCondition[0]];
    const b = gameState[winCondition[1]];
    const c = gameState[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    announceWinner(currentPlayer);
    isGameActive = false;
    return;
  }

  const roundDraw = !gameState.includes('');
  if (roundDraw) {
    announceWinner('Draw');
    isGameActive = false;
    return;
  }

  // If no win or draw, switch to the other player
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  playerTurn.textContent = `Player ${currentPlayer}'s turn`;
}

// Announce winner or draw
function announceWinner(winner) {
  if (winner === 'Draw') {
    winnerMessage.textContent = 'Game ended in a draw!';
  } else {
    winnerMessage.textContent = `Player ${winner} wins!`;
    scores[winner]++;
    updateScoreboard();
  }
}

// Update the scoreboard
function updateScoreboard() {
  scoreX.textContent = scores['X'];
  scoreO.textContent = scores['O'];
}

// Restart the game
function restartGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';

  cells.forEach(cell => {
    cell.textContent = '';
  });

  winnerMessage.textContent = '';
  playerTurn.textContent = `Player X's turn`;
  updateScoreboard();
}

// Add event listeners to each cell and the restart button
cells.forEach(cell => {
  cell.addEventListener('click', cellClick);
});
restartButton.addEventListener('click', restartGame);

// Initialize the scoreboard
updateScoreboard();
