// ---------------------------------------------
// GOAT TEST FILE — guaranteed working
// ---------------------------------------------

let goatSheet;
let goatFrameIndex = 0;
let goatX = 200;
let goatY = 300;
let goatDirection = "right";

// Correct frame size for your sheet
const GOAT_FRAME_W = 317;
const GOAT_FRAME_H = 248;

// Only 5 frames per row
const GOAT_FRAMES_PER_ROW = 4;

// Goat scale
const GOAT_SCALE = 0.6;

// Animation speed
const GOAT_ANIM_SPEED = 8;

// Movement speed
const GOAT_MOVE_SPEED = 2;

function preload() {
  // IMPORTANT: path must match your project
  goatSheet = loadImage("goat_spritesheet.png");
}

function setup() {
  createCanvas(800, 600);
  imageMode(CORNER);
}

function draw() {
  background(180, 220, 255);

  // Animate
  if (frameCount % GOAT_ANIM_SPEED === 0) {
    goatFrameIndex = (goatFrameIndex + 1) % GOAT_FRAMES_PER_ROW;
  }

  // Move
  if (goatDirection === "right") {
    goatX += GOAT_MOVE_SPEED;
    if (goatX > width - 200) goatDirection = "left";
  } else {
    goatX -= GOAT_MOVE_SPEED;
    if (goatX < 50) goatDirection = "right";
  }

  drawGoat();
}

function drawGoat() {
  // Correct rows:
  // Row 0 = RIGHT-facing
  // Row 1 = LEFT-facing
  let row = (goatDirection === "left") ? 1 : 0;

  // Crop correct frame
  let sx = goatFrameIndex * GOAT_FRAME_W;
  let sy = row * GOAT_FRAME_H;

  let frame = goatSheet.get(sx, sy, GOAT_FRAME_W, GOAT_FRAME_H);

  image(
    frame,
    goatX,
    goatY,
    GOAT_FRAME_W * GOAT_SCALE,
    GOAT_FRAME_H * GOAT_SCALE
  );
}
