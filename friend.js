const board = Array(9).fill(null);
const boardElement = document.getElementById('game-board');
let currentPlayer = 'X';

function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.addEventListener('click', () => makeMove(index));
    cellElement.textContent = cell;
    boardElement.appendChild(cellElement);
  });
}

function makeMove(index) {
  if (!board[index]) {
    board[index] = currentPlayer;
    if (checkWin()) {
      document.getElementById('message').textContent = `${currentPlayer} wins!`;
    } else if (board.every(cell => cell)) {
      document.getElementById('message').textContent = 'It\'s a tie!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    createBoard();
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

function restartGame() {
  board.fill(null);
  currentPlayer = 'X';
  document.getElementById('message').textContent = '';
  createBoard();
}

createBoard();
