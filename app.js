const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const circleObj = {
  x: 0,
  y: 0,
  size: 25,
  changex: 4,
  changey: 4
};

const circleObj2 = {
  x: 0,
  y: 0,
  size: 25,
  changex: 4,
  changey: 4,
};
const rectObj = {
  x: undefined,
  y: undefined,
  w: 200,
  h: 20,
};

const drawRect = () => {
  ctx.fillRect(rectObj.x, rectObj.y, rectObj.w, rectObj.h);
};


const drawCircle = (x, y) => {
  ctx.beginPath();
  ctx.arc((circleObj.x += x), circleObj.y + y, circleObj.size, 0, Math.PI * 2);
  ctx.fill();
};



for (x = 1; x <= 17; x++) {
  // console.log(circleObj.x);
  drawCircle(85, 30);
  drawCircle(0, 100);
  drawCircle(0, 170);
  drawCircle(0, 250);
}


const animate = () => {
  window.addEventListener("mousemove", (e) => {
    rectObj.x = e.x;
    rectObj.y = e.y;
    // console.log(e);
    if (rectObj.y > 650 && rectObj.y < 660) {
      ctx.clearRect(rectObj.x != e.x, e.y, canvas.width, canvas.height);
      drawRect();
    }
  });
  
  requestAnimationFrame(animate);
};


animate();



