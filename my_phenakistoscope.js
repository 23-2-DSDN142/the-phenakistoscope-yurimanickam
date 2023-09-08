const SLICE_COUNT = 10;
var blobs = [];


function setup_pScope(pScope){
  pScope.output_mode(ANIMATED_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(true);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);


  for (var i = 0; i < 29; i++) {
    var blob = new Blob(random(-400, 1000), random(-400, 1000), random(5, 15), color(random(100), random(255), random(255)));
    blobs.push(blob);
  }

}

function setup_layers(pScope){

  new PLayer(null, 10,10,50);  //lets us draw the whole circle background, ignoring the boundaries

  //var layer1 = new PLayer(faces);
  //layer1.mode( SWIRL(5) );
  //layer1.set_boundary( 200, 1000 );



  var layer3 = new PLayer(lava);
  layer3.mode( RING );
  layer3.set_boundary( 0, 800 );
}

function faces(x, y, animation, pScope){
  
  scale(animation.frame*2);

  ellipse(0,0,50,50); // draw head
  fill(30);
  ellipse(-10,-10,10,10); //draw eye
  ellipse(10,-10,10,10); // draw eye
  arc(0,10,20,10,0,180); // draw mouth

}

function squares(x, y, animation, pScope){

  // this is how you set up a background for a specific layer
  let angleOffset = (360 / SLICE_COUNT) / 2
  let backgroundArcStart = 270 - angleOffset;
  let backgroundArcEnd = 270 + angleOffset;

  fill(66, 135, 245)
  arc(x,y,800,800,backgroundArcStart,backgroundArcEnd); // draws "pizza slice" in the background

  fill(255)
  rect(-10,-300-animation.wave()*50,20,20) // .wave is a cosine wave btw

}

// define a class for the blobs
class Blob {
  constructor(x, y, r, c) {
    this.x = x; // x position
    this.y = y; // y position
    this.r = r; // radius
    this.c = c; // color
    this.vy = random(-0.001, -1); // vertical velocity
    this.ay = -0.001; // vertical acceleration
  }

  // update the position and velocity of the blob
  update() {
    this.y += this.vy;
    this.vy += this.ay;
    // if the blob reaches the top boundary, reset its position and velocity
    if (this.y < -400 - this.r) {
      this.y = 400 + this.r;
      this.vy = random(-5, -1);
    }
  }

  // draw the blob as an ellipse
  draw() {
    fill(this.c);
    noStroke();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

function lava(x, y, animation, pScope){
  
  // update and draw each blob in the array
  for (var i = 0; i < blobs.length; i++) {
    blobs[i].update();
    blobs[i].draw();
  }

}
//temp.commmit
function drawSpinWheel() {
  translate(width / 2, height / 2);

  angle -= spin;

  fill(60, 60, 30);
  ellipse(0, 0, width - 100, width - 10);

  for (var i = 0; i < 35; i++) {
    var x = cos(angle) * r * (i / 4);
    var y = sin(angle) * r * (i / 4);

    fill(21, 90, 100);
    ellipse(x, y, 5 + i, 5 + i);
    noFill();
    stroke(100);

    rotate(0.5);
  }

  fill(100);
  ellipse(0, 0, 60, 60);
}

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
}

function draw() {
  background(50);

  // Call the drawSpinWheel function on top of your existing code
  drawSpinWheel();
}
