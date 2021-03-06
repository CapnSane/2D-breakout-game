let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let lives = 3;

let ballRadius = 10;
let difficulty = 1;
let counts = 0;

let plusOrMinus = Math.round(Math.random()) * 2 - 1;

let x = canvas.width / 2;
let y = canvas.height / 2;

let dx = (Math.round(Math.random()) * 2 - 1) * Math.random() * 3;
let dy = -3;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 3;
let brickColumnCount = 6;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 5;
let brickOffsetTop = 30;
let brickOffsetLeft = 15;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// Listeners
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function keyDownHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = false;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}

function getRndColor() {
  let maxcolour = 200;
  let r = (maxcolour * Math.random()) | 0,
    g = (maxcolour * Math.random()) | 0,
    b = (maxcolour * Math.random()) | 0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

colour = getRndColor();

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = 'rgb(255, 100, 100)';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = `rgb(100, 255, 100)`;
        // ctx.fillStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        //   Math.random() * 256
        // )}, ${Math.floor(Math.random() * 256)})`;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          score += 1;
          if (getRndColor() == 'rgb(238, 238, 238)') {
            colour = 'rgb(0, 0, 0)';
          } else {
            colour = getRndColor();
          }
          dy = -dy;
          b.status = 0;
          if (score == brickRowCount * brickColumnCount) {
            alert(
              'YOU WIN, CONGRATS! YOUR SCORE IS: ' +
                score +
                '. You slapped the ball ' +
                counts +
                ' time(s)!'
            );
            document.location.reload();
          }
        }
      }
    }
  }
}

let score = 0;

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Score: ' + score, 8, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLives();
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX - 11 && x < paddleX + paddleWidth + 11) {
      counts += 1;
      difficulty += 0.2;
      dy = dy + difficulty;
      dx = dx * (Math.round(Math.random()) * 2 - 1) + difficulty * 2;
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert(
          'GAME OVER! YOUR SCORE IS: ' +
            counts +
            '. You broke ' +
            score +
            ' brick(s)!'
        );
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2 * (Math.round(Math.random()) * 2 - 1);
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed) {
    paddleX += 8;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 8;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
