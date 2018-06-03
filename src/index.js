const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const button = document.querySelector("#button")
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

let prevCoord;

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

    let newCoord = {x,y}
    let c = newCoord.x - prevCoord.x;
    let r = newCoord.y - prevCoord.y;
    let grad = r/c;
    for (let i = 1; i < Math.abs(c); i++){
      const icol = x+(c/Math.abs(c))*i;
      const icolCurrentI = columns[icol].indexOf(1);
      columns[icol][icolCurrentI] = 0;
      columns[icol][y+Math.round(grad*i) ] = 1;
    }
  }
  prevCoord = {x,y};
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

  function play() {

    let imag = new Float32Array(canvasWidth);
    let real = new Float32Array(canvasWidth);

    // Sawtooth Fourier coefficients.
    let sign = 1;
    for (let k = 1; k < real.length; ++k) {
      imag[k] = 0;
      const y = columns[k].indexOf(1);
      if (y == -1) real[k] = 0;
      else real[k] = (y / canvasHeight) * 2 - 1;
    }

    console.log(real);


    var ac = new AudioContext();
    var osc = ac.createOscillator();
    var wave = ac.createPeriodicWave(real, imag);

    osc.setPeriodicWave(wave);

    osc.connect(ac.destination);

    osc.start();
    osc.stop(2);
}

button.addEventListener("click", play)
