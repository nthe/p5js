
var a = 0;

function setup(){
  createCanvas(windowWidth, windowHeight);
  textSize(18);
  noCursor();
  smooth(2);
}

function draw(){
  background(255);
  noFill();
  for(var y = 0; y < 20; y++){
    a += 0.3165;
    for(var x = 0; x < 20; x++){
      push();
      translate((x * 30) + width/2 - 300, (y * 30) + height/2 - 300);
      rotate(sin(a % TWO_PI));
      ellipse(0, 0, 20, 11);
      ellipse(0, 0, 20, 3);
      ellipse(0, 0, 19, 5);
      ellipse(0, 0, 18, 8);
      pop();
    }
  }
  fill(50);
  text("coffee", width/2 - 30, height - 30);
}
