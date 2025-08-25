const canvasModal = document.getElementById("canvas");
const openModal = document.querySelector(".sect");
const btn = document.querySelector(".btn");
const restartModal = document.querySelector(".restart");
const restartBtn = document.querySelector(".restart-btn");

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let score = 0;
let lives = 3;

const brickRowCount = 8;
const brickColumnCount = 8;
const delay = 500; //delay to reset the game

// Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 15,
  dx: 0,
  dy: 0,
  visible: false,
};

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 120,
  h: 10,
  speed: 10,
  dx: 0,
  visible: false,
};

// Create brick props
const brickInfo = {
  w: canvas.width / 11,
  h: canvas.height /30,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}
btn.addEventListener("click", () => {
  canvas.classList.remove("hidden");
  openModal.classList.add("hidden");
  bricks.visible = true;
  ball.visible = true;
  ball.dx = 6;
  ball.dy = -8;
  paddle.visible = true;
});

// Draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = ball.visible ? "#0095dd" : "transparent";
  ctx.fill();
  ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = paddle.visible ? "#0095dd" : "transparent";
  ctx.fill();
  ctx.closePath();
}

// Draw score on canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawLive() {
  ctx.font = "20px Arial";
  ctx.fillText(`Lives: ${lives}`, 20, 30);
}

// Draw bricks on canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  // Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// function startGame() {
//   ball.x = paddle.x + 35;
//   ball.y = paddle.y - 10;
//   moveBall();
// }
// Move ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision (right/left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // ball.dx = ball.dx * -1
  }

  // Wall collision (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // Brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  // Hit bottom wall - Lose
  if (ball.y + ball.size > canvas.height) {
    score = 0;
    lives--;
    if (lives < 1) {
      // alert("Game Over");
      restartModal.classList.remove("hidden");
      showAllBricks(false);
      canvasModal.classList.add("hidden");
      ball.dx = 0;
      ball.dy = 0;
      ball.y = canvas.height - 35
    }
  }
}

restartBtn.addEventListener("click", () => {
  showAllBricks(true);
  // location.reload();
  // startGame();
  canvasModal.classList.remove("hidden");
  ball.dx = 4;
  ball.dy = -3;
  restartModal.classList.add("hidden");
  lives = 3
});

// Increase score
function increaseScore() {
  score++;

  if (score - brickRowCount * brickColumnCount === 0) {
    ball.visible = false;
    paddle.visible = false;

    //After 0.5 sec restart the game
    setTimeout(function () {
      showAllBricks(true);
      score = 0;
      paddle.x = canvas.width / 2 - 40;
      paddle.y = canvas.height - 20;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.visible = true;
      paddle.visible = true;
    }, delay);
  }
}

// Make all bricks appear
function showAllBricks(visible) {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = visible));
  });
}

// Draw everything
function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawLive()
  drawBricks();
}

// Update canvas drawing and animation

function update() {
  //   startGame();
  movePaddle();
  moveBall();

  // Draw everything
  draw();

  requestAnimationFrame(update);
}
update();

// Keydown event
function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}

// Keyup event
function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

let touchStart
let currentX
// Touch start event
canvasModal.addEventListener('touchstart', (e)=>{
  e.preventDefault()
  touchStart = e.touches[0].clientX
  console.log(touchStart)
})

canvasModal.addEventListener('touchmove', (e)=>{
  e.preventDefault()
  currentX = e.touches[0].clientX
  const deltaX = currentX - touchStart
  if (deltaX > 0) {
    // console.log(e.touches[0])
    paddle.dx = paddle.speed;
  } else if (deltaX < 0) {
    paddle.dx = -paddle.speed;
  }
})

canvasModal.addEventListener('touchend', (e)=>{
  e.preventDefault()
  touchStart = 0
  paddle.dx = 0
})

// Keyboard event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// // Rules and close event handlers
// rulesBtn.addEventListener("click", () => rules.classList.add("show"));
// closeBtn.addEventListener("click", () => rules.classList.remove("show"));
