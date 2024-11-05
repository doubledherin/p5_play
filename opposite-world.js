let speed;

function Star() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.previousZ = this.z;

  this.update = function () {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.previousZ = this.z;
    }
  };

  this.show = function () {
    fill(0);
    noStroke();

    const starX = map(this.x / this.z, 0, 1, 0, width);
    const starY = map(this.y / this.z, 0, 1, 0, height);

    const starRadius = map(this.z, 0, width, 16, 0);
    ellipse(starX, starY, starRadius, starRadius);

    const previousStarX = map(this.x / this.previousZ, 0, 1, 0, width);
    const previousStarY = map(this.y / this.previousZ, 0, 1, 0, height);

    this.previousZ = this.z;

    stroke(0);
    line(previousStarX, previousStarY, starX, starY);
  };
}

const stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 400; i++) {
    stars.push(
      new Star(
        random(0, windowWidth),
        random(0, windowHeight),
        random(0, windowWidth)
      )
    );
  }
  console.log("stars.length", stars.length);
}

function draw() {
  speed = map(mouseX, 0, width, 0, 50);
  background(255);
  translate(width / 2, height / 2);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}
