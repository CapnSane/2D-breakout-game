let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let x = 0;
let y = canvas.height / 2;

let dx = 1;
let dy = -0.45;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'rgb(0, 149, 221)';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;
}

setInterval(draw, 10);
