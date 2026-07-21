// ------------------------------------------------------------
// GOAT TEST — matches your 2×5 sprite sheet
// ------------------------------------------------------------

const GOAT = {
  img: null,

  frameWidth: 317,   // 1586 / 5
  frameHeight: 248,  // 496 / 2

  numFrames: 5,      // use ALL columns 0–4
  scale: 0.6,

  cropLeft:   [0, 0, 0, 0, 0],
  cropRight:  [0, 0, 0, 0, 0],
  cropTop:    [0, 0, 0, 0, 0],
  cropBottom: [0, 0, 0, 0, 0]
};



// Goat state
let goatFrameIndex = 0;
let goatX = 200;
let goatY = 300;
let goatDirection = "right";

const GOAT_ANIM_SPEED = 6;
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

