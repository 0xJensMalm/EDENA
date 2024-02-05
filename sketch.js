let colors = ["#292f36", "#4ecdc4", "#f7fff7", "#ff6b6b", "#ffe66d"];
let gfx; // Graphics buffer for high-res rendering

function setup() {
  // Determine the size for a square canvas based on the smaller window dimension
  let canvasSize = min(windowWidth, windowHeight);
  createCanvas(canvasSize, canvasSize);
  gfx = createGraphics(2000, 2000);
  gfx.pixelDensity(2);
  noLoop();
  setupControls();
  generateArt();
}

function generateArt() {
  gfx.background(random(colors)); // Clear the buffer with a new background color

  for (let i = 0; i < 50; i++) {
    let x = gfx.width / 2;
    let y = gfx.height / 2;
    let n = int(random(120, 150));
    let l = int(random(300, 400));
    hrr(gfx, x, y, n, l); // Draw new shapes on the gfx buffer
  }

  redraw(); // Force the draw loop to execute once
}

function hrr(g, x, y, num, l) {
  let nScl = random(0.001, 0.005); // Vary the noise scale for more dynamic transformation
  g.noStroke();

  for (let j = 0; j < num; j++) {
    let col = color(random(colors));
    col.setAlpha(random(100, 255));
    g.fill(col);

    // Start a new shape
    g.beginShape();
    let x0 = x;
    let y0 = y;

    for (let i = 0; i < l; i++) {
      g.vertex(x0, y0);

      // Use noise to calculate the angle for transformation
      let a = noise(x0 * nScl, y0 * nScl) * TWO_PI * 2;
      x0 += cos(a) * 3; // Adjust these values to control the transformation extent
      y0 += sin(a) * 3;

      // Occasionally reset the position to create disjointed shapes
      if (random(1) < 0.01) {
        x0 = x + random(-50, 50);
        y0 = y + random(-50, 50);
      }
    }

    g.endShape(CLOSE);
  }
}

function draw() {
  background(255); // Clear the canvas
  image(gfx, 0, 0, width, height); // Draw the gfx buffer scaled to fit the canvas
}

function setupControls() {
  let generateBtn = createButton("Generate");
  generateBtn.position(10, 10);
  generateBtn.mousePressed(() => {
    generateArt(); // Call generateArt when the button is pressed
  });

  // Setup the save button as before
  let saveBtn = createButton("Save");
  saveBtn.position(10, 40);
  saveBtn.mousePressed(() => {
    save(gfx, "myCanvas.png"); // Save the gfx buffer content
  });
}

function windowResized() {
  let canvasSize = min(windowWidth, windowHeight);
  resizeCanvas(canvasSize, canvasSize);
}
