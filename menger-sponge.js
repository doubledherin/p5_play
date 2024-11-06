let a = 0;
let b = 0;
let c = 0;
const sponge = [];

// function Box() {

//   function generate() {
//     for (let x = -1, x < 2; x++) {
//       for (let y = -1, y < 2; y++) {
//         for (let z = -1, z < 2; z++) {
//           sponge.push(box())
//         }

//       }

//     }
//   }
// }

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // An array of Box objects
  // Star with one
  var b = new Box(0, 0, 0, 200);
  sponge.push(b);
}

function mousePressed() {
  // Generate the next set of boxes
  var next = [];
  for (var i = 0; i < sponge.length; i++) {
    var b = sponge[i];
    var newBoxes = b.generate();
    next = next.concat(newBoxes);
  }
  sponge = next;
}

function draw() {
  background(50);
  stroke(255);
  noFill();

  rotateX(a);
  rotateY(b);
  rotateZ(c);
  // box(height / 2);
  for (var i = 0; i < sponge.length; i++) {
    sponge[i].show();
  }
  a += 0.01;
  b += 0.01;
  c += 0.01;
}
