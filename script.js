const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;
const brickRowCount = 9;
const brickColumnCount = 5;
const delay = 500;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 10,
  dx: 3,
  dy: -1,
  visible: true,
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 3,
  dx: 0,
  visible: true,
};

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetx: 45,
  offsety: 60,
  visible: true,
};

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetx;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsety;
    bricks[i][j] = [x, y, ...brickInfo];
  }
}

function drawball() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillstyle = visible ? "#e3e3e3" : "transparent";
  ctx.fill();
  ctx.closePath();
}
function drawpaddle() {
  ctx.beginPath();
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillstyle = visible ? "#e3e3e3" : "transparent";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  bricks.forEach((coulumn) => {
    coulumn.forEach((brick) => {
      ctx.beginPath();
      ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
        ctx.fillStyle = brick.visible ? "#e3e3e3" : "transparent";
        ctx.fill()
        ctx.closePath()
    });
  });
}

function movePaddle() {
    paddle.x += paddle.dx
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x= canvas.width-paddle.w
    }
    if (paddle.x < 0) {
        paddle.x=0
    }
}
function moveBall() {
  ball.x += ball.dx
  ball.y += ball.dy
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1
  }
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1
  }
  if (ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
    ball.dy = -ball.speed
  }
  bricks.forEach(coulumn => {
    coulumn.forEach{
      brick => {
        if (brick.visible) {
          if (ball.x - ball.size > brick.x && ball.x + ball.size < brick.x + brick.w && ball.y + ball.size > brick.y && ball.y - ball.size < brick.y + brick.h) {
            ball.dy *= -1
            brick.visible = false
          }
        }
      }
    }
  }}
