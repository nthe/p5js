
var a = 0; r = 0;

function setup(){
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(50, 150);
  r = windowWidth / 6;
  strokeWeight(0.3);
  background(255);
}

function draw(){
  background(255);
  push();
  a += .005;
  translate(windowWidth/2, windowHeight/2);
  beginShape();
  for(var phi = 0; phi <= 200; phi += 1){
  for(var theta = 0; theta <= 200; theta += 1){
      curveVertex(
					theta % width + 20,
					phi / 20,
					0
      //  (r) * cos(theta) * sin(phi + a),
      //  (r) * sin(theta) * sin(phi),
      //  (r + a) * cos(phi)
      );
    }

  }
  endShape();
  pop();
}
