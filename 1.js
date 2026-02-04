// Dữ liệu thẻ - 4 cặp
const emojis = ['🍎', '🍌', '🍇', '🍉'];
const cardsData = [...emojis, ...emojis];

let moves = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

const board = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const resetBtn = document.getElementById('reset-btn');

// Hàm xáo trộn mảng (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCards() {
  board.innerHTML = '';
  shuffle(cardsData).forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${value}</div>
      </div>
    `;

    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.classList.add('flipped');
  moves++;
  movesDisplay.textContent = moves;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCount += 2;

    if (matchedCount === cardsData.length) {
      setTimeout(() => {
        alert(`Chúc mừng! Bạn đã thắng!\nSố lượt: ${moves}`);
      }, 700);
    }

    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 1100);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function resetGame() {
  moves = 0;
  matchedCount = 0;
  movesDisplay.textContent = moves;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  createCards();
}

// Khởi tạo game
createCards();

// Sự kiện nút Chơi lại
resetBtn.addEventListener('click', resetGame);