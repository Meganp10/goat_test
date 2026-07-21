// ---------------------------------------------
// GOAT TEST FILE — guaranteed working
// ---------------------------------------------
// ------------------------------------------------------------
// GOAT TEST — using GOAT sprite object + crop arrays
// ------------------------------------------------------------

// Goat sprite object
const GOAT = {
  img: null,

  // Correct frame size for your 4-column sheet
  frameWidth: 396,   // width of ONE goat frame
  frameHeight: 248,  // height of ONE goat frame

  numFrames: 4,      // only use columns 0–3
  scale: 0.6,

  // Crop arrays — edit these to control visibility
  cropLeft:   [0, 0, 0, 0],
  cropRight:  [0, 0, 0, 0],
  cropTop:    [0, 0, 0, 0],
  cropBottom: [0, 0, 0, 0]
};

// Goat state
let goatFrameIndex = 0;
let goatX = 200;
let goatY = 300;
let goatDirection = "right";

// Animation + movement
const GOAT_ANIM_SPEED = 8;
const GOAT_MOVE_SPEED = 2;

function preload() {
  GOAT.img = loadImage("goat_spritesheet.png");
}

function setup() {
  createCanvas(800, 600);
  imageMode(CORNER);
}

function draw() {
  background(180, 220, 255);

  // Animate
  if (frameCount % GOAT_ANIM_SPEED === 0) {
    goatFrameIndex = (goatFrameIndex + 1) % GOAT.numFrames;
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

// ------------------------------------------------------------
// FRAME CROPPING FUNCTION (uses crop arrays)
// ------------------------------------------------------------
function getGoatFrame(index, row) {
  const fw = GOAT.frameWidth;
  const fh = GOAT.frameHeight;

  const col = index % GOAT.numFrames;

  return GOAT.img.get(
    col * fw + GOAT.cropLeft[index],
    row * fh + GOAT.cropTop[index],
    fw - GOAT.cropLeft[index] - GOAT.cropRight[index],
    fh - GOAT.cropTop[index] - GOAT.cropBottom[index]
  );
}

// ------------------------------------------------------------
// DRAW GOAT (correct rows + crop)
// ------------------------------------------------------------
function drawGoat() {
  // Row 0 = RIGHT-facing
  // Row 1 = LEFT-facing
  let row = (goatDirection === "left") ? 1 : 0;

  let frame = getGoatFrame(goatFrameIndex, row);

  image(
    frame,
    goatX,
    goatY,
    frame.width * GOAT.scale,
    frame.height * GOAT.scale
  );
}
