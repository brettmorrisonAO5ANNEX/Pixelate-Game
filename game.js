const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const restartButton = document.getElementById("restart-button");
const splitThreshold = 2;
const startSize = 300;

restartButton.addEventListener("click", resetGame);
canvas.addEventListener('click', handleMouseClick);

//creating image for reference in getAverageColor()
const image = new Image();
image.src = 'trispiral.jpg';

let circles = []; // create an empty array to store circles

let shouldRedraw = true;

function getAverageColor(image, x, y, size) {
  // Create a temporary canvas to draw the image on
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  //sample game canvas for dimensions
  const gameCanvas = document.getElementById('game-canvas');
  const gameCanvasWidth = gameCanvas.width;
  const gameCanvasHeight = gameCanvas.height;

  // Set the canvas dimensions to the region of the image we want to sample
  canvas.width = gameCanvasWidth;
  canvas.height = gameCanvasHeight;

  // Draw the image onto the canvas
  ctx.drawImage(image, -x, -y, 600, 600);

  // Get the color data for the region of the canvas
  const imageData = ctx.getImageData(0, 0, size, size).data;

  // Calculate the average color of the region
  let totalRed = 0;
  let totalGreen = 0;
  let totalBlue = 0;
  let pixelCount = 0;

  for (let i = 0; i < imageData.length; i += 4) {
      totalRed += imageData[i];
      totalGreen += imageData[i + 1];
      totalBlue += imageData[i + 2];
      pixelCount++;
  }

  const avgRed = totalRed / pixelCount;
  const avgGreen = totalGreen / pixelCount;
  const avgBlue = totalBlue / pixelCount;

  const avgColor = `rgb(${Math.round(avgRed)}, ${Math.round(avgGreen)}, ${Math.round(avgBlue)})`
  // console.log(avgColor);
  return avgColor;
}

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.isSplit = false;
    this.color = color;
  }

  draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      // ctx.fillStyle = 'grey';
      ctx.fillStyle = this.color;
      ctx.fill();
      console.log("drawing");
  }

  split() {
      if (this.radius - 1 > splitThreshold) {
          // remove the circle from the canvas
          circles.splice(circles.indexOf(this), 1);

          // split the circle into four smaller circles
          let r = this.radius / 2;
          let x1 = this.x - r;
          let x2 = this.x + r;
          let y1 = this.y - r;
          let y2 = this.y + r;

          let c1 = new Circle(x1, y1, r, getAverageColor(image, x1 - r, y1 - r, r * 2));
          let c2 = new Circle(x2, y1, r, getAverageColor(image, x2 - r, y1 - r, r * 2));
          let c3 = new Circle(x1, y2, r, getAverageColor(image, x1 - r, y2 - r, r * 2));
          let c4 = new Circle(x2, y2, r, getAverageColor(image, x2 - r, y2 - r, r * 2));

          circles.push(c1, c2, c3, c4);
      }
      this.isSplit = true;
      shouldRedraw = true;
  }

  isMouseOverCircle(mouseX, mouseY) {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    return dx * dx + dy * dy <= this.radius * this.radius;
  }
}

// create the initial circle
let initialCircle = new Circle(canvas.width / 2, canvas.height / 2, startSize, getAverageColor(image, canvas.width / 2 - startSize, canvas.height / 2 - startSize, startSize * 2));
circles.push(initialCircle);

// function to handle mouse click event
function handleMouseClick(event) {
  let mouseX = event.clientX - canvas.offsetLeft;
  let mouseY = event.clientY - canvas.offsetTop;

  for (let i = 0; i < circles.length; i++) {
      let circle = circles[i];
      if (!circle.isSplit && circle.isMouseOverCircle(mouseX, mouseY) && circle.radius / 2 > splitThreshold) {
          circle.split();
          break;
      }
  }
}   

// draw all the circles in the circles array
function drawCircles() {
  for (let i = 0; i < circles.length; i++) {
      if (!circles[i].isSplit) {
          // circles[i].drawSquareBorder();
          circles[i].draw();
      }
  }     
}

// animation loop
function animate() {
  if (shouldRedraw) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCircles();

    shouldRedraw = false; // Reset shouldRedraw to false
  }

  requestAnimationFrame(animate); // Request next frame
}

function resetGame() {
  // remove all circles from the array
  circles.splice(0, circles.length);

  // create the initial circle and set redrawFlag back to true
  shouldRedraw = true;
  let initialCircle = new Circle(canvas.width / 2, canvas.height / 2, startSize);
  circles.push(initialCircle);
}

// start the animation loop
window.onload = function() {
  animate();
}