const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const {
  top: canvasTop,
  left: canvasLeft,
  width: canvasWidth,
  height: canvasHeight
} = canvas.getBoundingClientRect();
const columns = Array.from({ length: canvasWidth }).map(v => {
  return Array.from({ length: canvasHeight }).map(() => 0);
});
let shouldDraw = false;

document.addEventListener("mousedown", () => (shouldDraw = true));
document.addEventListener("mouseup", () => (shouldDraw = false));

canvas.addEventListener("mousemove", function(event) {
  const { clientX, clientY } = event;
  const x = clientX - canvasLeft;
  const y = clientY - canvasTop;

  if (shouldDraw) {
    const currentIndex = columns[x].indexOf(1);
    columns[x][currentIndex] = 0;
    columns[x][y] = 1;
  }
});

function whiteBg() {
  // Make the canvas white
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1000, 500);
}

function drawPixel(x, y) {
  // Paint a pixel
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, 1, 1);
}

function run() {
  whiteBg();
  columns.forEach((column, ci) => {
    column.forEach((row, ri) => {
      if (row === 1) {
        drawPixel(ci, ri);
      }
    });
  });
  window.requestAnimationFrame(run);
}

whiteBg();
run();
