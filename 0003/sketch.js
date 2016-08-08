
var a = 0; r = 0;

function setup(){
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(50, 150);
  r = windowWidth / 6;
  strokeWeight(0.3);
  background(250);
}

function draw(){
  background(250);
  push();
  a += .005;
  translate(windowWidth/2, windowHeight/2);
  rotate(a);
  beginShape(TRIANGLE_STRIP);
  for(var phi = 0; phi <= TWO_PI; phi += 0.05){
  for(var theta = 0; theta <= TWO_PI; theta += 0.5){
      curveVertex(
        (r) * cos(theta) * sin(phi + a),
        (r) * sin(theta) * sin(phi),
        (r + a) * cos(phi)
      );
    }

  }
  endShape();
  pop();
}
