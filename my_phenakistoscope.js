const SLICE_COUNT = 12;


function setup_pScope(pScope) {


    pScope.output_mode(ANIMATED_DISK);
    pScope.scale_for_screen(true);
    pScope.draw_layer_boundaries(false);
    pScope.set_direction(CCW);
    pScope.set_slice_count(SLICE_COUNT);


    //loading my images, and sequences
    pScope.load_image("planet", "png");//main central planet
    pScope.load_image("innerRing", "png");//inner ring
    pScope.load_image("middleRing", "png");//middle ring
    pScope.load_image("outerRing", "png");//spaceship
    pScope.load_image_sequence("ship", "png", 12)//ship+shadow

}

function setup_layers(pScope) {
    var bgcol = color("#000000ff");//allows me to use hex colours and colour picker.
    new PLayer(null, bgcol);  //lets us draw the whole circle background, ignoring the boundaries


    //background
    var background = new PLayer(bg);
    background.mode(RING);
    background.set_boundary(0, 1000);
    //stars
    var stars = new PLayer(drawStars);
    stars.mode(RING);
    stars.set_boundary(0, 1000);
    //planet
    var planetLayer = new PLayer(planet);
    planetLayer.mode(RING);
    planetLayer.set_boundary(0, 1000);
    //inner ring
    var innerRingLayer = new PLayer(innerRing);
    innerRingLayer.mode(RING);
    innerRingLayer.set_boundary(0, 1000);
    //middle ring
    var middleRingLayer = new PLayer(middleRing);
    middleRingLayer.mode(RING);
    middleRingLayer.set_boundary(0, 1000);
    //outer ring
    var outerRingLayer = new PLayer(outerRing);
    outerRingLayer.mode(RING);
    outerRingLayer.set_boundary(0, 1000);
    //ship
    var spaceShip = new PLayer(ship);
    spaceShip.mode(RING);
    spaceShip.set_boundary(0, 1000);
}

function bg(x, y, animation, pScope) {
    push();
    let innerCol = color("#1b1b191b"); // inner colour of ring
    let outerCol = color("#000000ff"); // outer colour of ring


    //arc logic from example
    let angleOffset = (360 / SLICE_COUNT) / 2;
    let backgroundArcStart = 270 - angleOffset;
    let backgroundArcEnd = 270 + angleOffset;
    noStroke();
    //method for a radial gradient that fills the arc, lerpColour p5.referebe
    for (let r = 1000; r >= 0; r -= 1) {
        let temp = map(r, 0, 1000, 0, 1);//scales the values
        let c = lerpColor(innerCol, outerCol, temp);
        fill(c);
        arc(x, y, r * 2, r * 2, backgroundArcStart, backgroundArcEnd);//draws gradient
    }
    pop();
}

//a nested loop method that allows for a lot of stars to be drawn seeminly randomly, but technically in a pattern
function drawStars(x, y, animation, pScope) {
  let starBounceSpeed = 0; //0-1, speed and intensity of the bounce
  let inside = 2000; //radius of the inner circle
  let outside = 19100; //radius of the outer circle
  let counter = 0//counter for the x position of the stars
  let xSet = 1500;//x offset of the stars
  let offset = 3400;//layer offset of the stars
  let scaleMod = 0.00;//scale modifier for the stars


  while (inside < outside) {
     
      //draw three sets of star lines, each with different factors of modification
      star(xSet - animation.frame, inside - animation.wave() * 50, 90 - animation.wave() * starBounceSpeed, 0.05 + scaleMod, 255 - animation.wave() * 80 + scaleMod * 100);
      star(offset + xSet - animation.frame, offset + inside - animation.wave() * 50, 90 - animation.wave() * starBounceSpeed, 0.05 + scaleMod, 255 - animation.wave() * 80 + scaleMod * 100);
      star(xSet - animation.frame + offset * 2, offset * 2 + inside - animation.wave() * 50, 90 - animation.wave() * starBounceSpeed, 0.05 + scaleMod, 255 - animation.wave() * 80 + scaleMod * 100);


      inside = inside + 500;
      counter++;
      xSet = xSet + 500;
      //nested if loop that flips and increases values
      inside = inside + 500;
      if (counter % 3 != 0) {
          xSet = -xSet + 100;
          scaleMod = scaleMod + 0.01;
      }
      else {//scales both the size and brightness of the stars  
          scaleMod = 0.01;
          scaleMod = -scaleMod;
      }

  }

}

//draws the main planet and scales it accordingly
function planet(x, y, animation, pScope) {
  push();
  scale(0.17);
  pScope.draw_image("planet", 0, 0);
  pop();
}

//draws the inner ring and scales it by a constant rate for the rings
function innerRing(x, y, animation, pScope) {
  push();
  scale(0.523);
  pScope.draw_image("innerRing", 0, 0);
  pop();
}
//draws the middle ring
function middleRing(x, y, animation, pScope) {
  push();
  scale(0.523);
  translate(0, animation.frame * -2);
  pScope.draw_image("middleRing", 0, 0);
  pop();
}
//draws the outer ring
function outerRing(x, y, animation, pScope) {
  push();
  scale(0.523);
  pScope.draw_image("outerRing", 0, 0);
  pop();
}

//draws the ship sequence and scales it by a 4:6 ratio of the ring ratio. The assets were scaled down from 12000px to 6000px.
function ship(x, y, animation, pScope) {
  push();
  scale(0.34866666666667);
  rotate();
  pScope.draw_image_from_sequence("ship", 0, 0, animation.frame);
  pop();
}

//holding the svg code for the stars, with passthroughs for the displayed location, rotation, scale and colour
function star(offsetX, offsetY, starRot, starScale, starColour) {
  push();
  scale(starScale);
  rotate(starRot);
  fill(starColour);

  beginShape();
  vertex(offsetX + 126.60, offsetY + 10.40);
  bezierVertex(offsetX + 126.20, offsetY + 10.60, offsetX + 125.40, offsetY + 15.20, offsetX + 124.20, offsetY + 23.80);
  bezierVertex(offsetX + 120.90, offsetY + 49.10, offsetX + 118.30, offsetY + 62.80, offsetX + 114.40, offsetY + 74.30);
  bezierVertex(offsetX + 108.40, offsetY + 92.20, offsetX + 99.50, offsetY + 102.90, offsetX + 84.50, offsetY + 110.30);
  bezierVertex(offsetX + 72.40, offsetY + 116.30, offsetX + 56.00, offsetY + 120.00, offsetX + 23.80, offsetY + 124.20);
  bezierVertex(offsetX + 10.90, offsetY + 126.00, offsetX + 10.00, offsetY + 126.20, offsetX + 10.00, offsetY + 128.00);
  bezierVertex(offsetX + 10.00, offsetY + 129.80, offsetX + 10.90, offsetY + 130.10, offsetX + 20.10, offsetY + 131.20);
  bezierVertex(offsetX + 68.30, offsetY + 137.30, offsetX + 86.50, offsetY + 143.00, offsetX + 99.70, offsetY + 156.20);
  bezierVertex(offsetX + 112.60, offsetY + 169.10, offsetX + 118.30, offsetY + 186.80, offsetX + 124.20, offsetY + 232.10);
  bezierVertex(offsetX + 125.90, offsetY + 245.00, offsetX + 126.10, offsetY + 245.90, offsetX + 127.90, offsetY + 245.90);
  bezierVertex(offsetX + 129.70, offsetY + 245.90, offsetX + 130.00, offsetY + 245.00, offsetX + 131.40, offsetY + 233.80);
  bezierVertex(offsetX + 137.40, offsetY + 187.00, offsetX + 143.10, offsetY + 169.20, offsetX + 156.20, offsetY + 156.20);
  bezierVertex(offsetX + 169.40, offsetY + 143.00, offsetX + 187.60, offsetY + 137.30, offsetX + 235.80, offsetY + 131.20);
  bezierVertex(offsetX + 245.00, offsetY + 130.00, offsetX + 245.90, offsetY + 129.70, offsetX + 245.90, offsetY + 128.00);
  bezierVertex(offsetX + 245.90, offsetY + 126.20, offsetX + 244.99, offsetY + 126.00, offsetX + 232.10, offsetY + 124.30);
  bezierVertex(offsetX + 207.10, offsetY + 121.10, offsetX + 193.70, offsetY + 118.40, offsetX + 182.50, offsetY + 114.80);
  bezierVertex(offsetX + 164.00, offsetY + 108.80, offsetX + 153.20, offsetY + 100.00, offsetX + 145.80, offsetY + 85.10);
  bezierVertex(offsetX + 139.50, offsetY + 72.40, offsetX + 135.90, offsetY + 56.60, offsetX + 131.40, offsetY + 22.20);
  bezierVertex(offsetX + 130.40, offsetY + 14.70, offsetX + 129.70, offsetY + 10.80, offsetX + 129.30, offsetY + 10.50);
  bezierVertex(offsetX + 128.50, offsetY + 9.90, offsetX + 127.50, offsetY + 9.90, offsetX + 126.60, offsetY + 10.40);
  endShape(CLOSE);
  pop();
}

