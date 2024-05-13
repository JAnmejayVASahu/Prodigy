let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function handleClick(index) {
  if (gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;
    render();
    if (checkWin()) {
      const winCombination = getWinningCombination();
      highlightWinningCells(winCombination);
      setTimeout(() => {
        alert(currentPlayer + ' wins!');
        resetGame();
      }, 1000); // Delay alert to allow animation to complete
    } else if (checkDraw()) {
      alert('It\'s a draw!');
      resetGame();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function render() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = gameBoard[index];
  });
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winConditions.some(combination => {
    const [a, b, c] = combination;
    return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

function getWinningCombination() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winConditions) {
    const [a, b, c] = combination;
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return combination;
    }
  }

  return null;
}

function highlightWinningCells(combination) {
  combination.forEach(index => {
    const cell = document.querySelector(`.cell:nth-child(${index + 1})`);
    cell.classList.add('winner');
  });
}

function checkDraw() {
  return gameBoard.every(cell => cell !== '');
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  clearHighlight();
  render();
}

function clearHighlight() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.classList.remove('winner');
  });
}
