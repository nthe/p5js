

var n = null;
var mouse_pos = null;
var easing = .05;
var max_velocity = 5.;
var init = false;

function setup(){
  noFill();
  mouse_pos = createVector(touchX, touchY);
  createCanvas(windowWidth, windowHeight);
  stroke(50);
  // frameRate(50);
  n = new Node(createVector(windowWidth / 2, windowHeight / 2));
  background(250);
}

function draw(){
  if(init){
    background(250);
    n.update();
    if(n.pos.dist(mouse_pos) < .5){
      noLoop();
    }
  } else {

      ellipse(windowWidth / 2, windowHeight / 2, 10, 10);
    // noLoop();
  }
}

function mouseMoved(){
  // if(!init) init = !init;
  init = true;
  redraw();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  background(250);
}


function Node(_v){
  this.pos = _v;
  this.vel = createVector(0, 0);

  this.update = function(){
    mouse_pos.x = touchX;
    mouse_pos.y = touchY;
    this.vel = p5.Vector.sub(mouse_pos, this.pos).mult(easing);
    this.vel.limit(max_velocity);
    this.pos.add(this.vel);
    ellipse(this.pos.x, this.pos.y, 10, 10);
  }
}
