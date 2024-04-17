const boardSize = 8;
const squareSize = 50;

const canvas = document.createElement('canvas');
canvas.width = boardSize * squareSize;
canvas.height = boardSize * squareSize;
canvas.style.border = '2px solid black';
canvas.style.display = 'block';
canvas.style.margin = '0 auto';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

class Pawn {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, squareSize / 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color === 'white' ? 'white' : 'black';
    ctx.fill();
    ctx.strokeStyle = this.color === 'white' ? 'black' : 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x - squareSize / 12, this.y - squareSize / 12, squareSize / 16, 0, Math.PI * 2);
    ctx.arc(this.x + squareSize / 12, this.y - squareSize / 12, squareSize / 16, 0, Math.PI * 2);
    ctx.fillStyle = this.color === 'white' ? 'black' : 'white';
    ctx.fill();

    ctx.beginPath();
    if (this.color === 'white') {
      ctx.arc(this.x, this.y, squareSize / 6, 0, Math.PI);
    } else {
      ctx.arc(this.x, this.y + squareSize / 6, squareSize / 6, Math.PI, 0);
      ctx.strokeStyle = 'white';
    }
    ctx.stroke();
  }
}

function drawChessboard() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if ((i + j) % 2 === 0) {
        ctx.fillStyle = '#FFFFFF';
      } else {
        ctx.fillStyle = '#000000';
      }
      ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
    }
  }
}

function getRandomPosition(occupiedPositions) {
  let x, y;
  do {
    x = Math.floor(Math.random() * boardSize) * squareSize + squareSize / 2;
    y = Math.floor(Math.random() * boardSize) * squareSize + squareSize / 2;
  } while (occupiedPositions.some(pos => pos.x === x && pos.y === y));

  occupiedPositions.push({ x, y });
  return { x, y };
}

drawChessboard();

const pawns = [];
const occupiedPositions = [];
for (let i = 0; i < 16; i++) {
  const color = i < 8 ? 'white' : 'black';
  const { x, y } = getRandomPosition(occupiedPositions);
  const pawn = new Pawn(x, y, color);
  pawns.push(pawn);
}

pawns.forEach(pawn => {
  pawn.draw();
});