let bubbles = []
let bubbleSize = 10
let padding = 14
let offset = 5
let popSound
let redSplash

function preload() {
  popSound = loadSound("audio/pop.wav")
  redSplash = loadImage("images/redsplash.png")
}
function setup() {
  popSound.setVolume(0.2)
  createCanvas(windowWidth, windowHeight, WEBGL)
  background(225)
  makeBubbles()
}

function makeBubbles() {
  for (
    let j = 0;
    j < width + 5 * (bubbleSize + padding);
    j += bubbleSize + padding
  ) {
    for (
      let i = 0;
      i < height + 5 * (bubbleSize + padding);
      i += bubbleSize + padding
    ) {
      if ((j / (bubbleSize + padding)) % 2 === 0) {
        bubbles.push(new Bubble(i, j))
      } else {
        bubbles.push(new Bubble(i - (bubbleSize + padding) / 2, j))
      }
    }
  }
}

function draw() {
  cursor(HAND)
  background(225)
  fill(255, 0, 0)
  for (let bubble of bubbles) {
    bubble.draw()
  }
  if (mouseIsPressed) {
    for (let bubble of bubbles) {
      if (!bubble.popped) {
        bubble.checkMouseIsPressed()
      }
    }
  }
}

class Bubble {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.popped = false
  }

  checkMouseIsPressed() {
    let d = dist(mouseX, mouseY, this.x, this.y)
    if (d < bubbleSize / 2) {
      this.popped = true
      popSound.play()
    }
  }

  draw() {
    push()
    ambientLight(139, 0, 0) // a dark red ambient light
    pointLight(255, 255, 255, -1000, -1000, 0) // a white point light pointing down and to the right
    specularMaterial(255, 0, 0) // material reflects red light
    shininess(75)
    noStroke()
    translate(-width / 2 + this.x, -height / 2 + this.y, 0)
    if (this.popped) {
      image(redSplash, -bubbleSize * 3, -bubbleSize * 2)
    } else {
      sphere(bubbleSize)
    }
    pop()
  }
}
