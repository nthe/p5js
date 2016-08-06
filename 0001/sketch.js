
var PARTICLE_COUNT = 400;
var CONNECTIONS = PARTICLE_COUNT / 100;
var ATTRACT = true, FROZEN = false, SHOW_CLOUD = true, SHOW_CONNECTIONS = false;
var EASING = 0.85;
var swarm = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  noFill();
  textSize(12);
  noCursor();
  strokeCap(ROUND);
  smooth(2);
  ortho(-windowWidth/2, windowWidth/2, -windowHeight/2, windowHeight/2);
  for(var i=0; i<PARTICLE_COUNT; i++){
    swarm[i] = new Particle(createVector(random(windowWidth / 3, windowWidth * 0.66), random(windowHeight / 3, windowHeight * 0.66), random(-100, 100)));
  }
}

function draw(){
  background(250);
  fill(50, 50, 50, 100);
  noFill();
  if (SHOW_CLOUD) {
    for(var i = 0; i < PARTICLE_COUNT; i++) swarm[i].render(true);
  }
  else {
    for(var i = 0; i < PARTICLE_COUNT; i++) swarm[i].apply_force();
  }
  if (SHOW_CONNECTIONS) connect();
}

function mousePressed(){ ATTRACT = false; }
function mouseReleased(){ ATTRACT = true; }
function keyPressed(){
  switch(key){
    case 'a': FROZEN = !FROZEN; break;
    case 's': SHOW_CLOUD = !SHOW_CLOUD; break;
    case 'd': SHOW_CONNECTIONS = !SHOW_CONNECTIONS; break;
  }
}

function connect(){
  strokeWeight(0.33);
  stroke(50, 50);
  for(var i = CONNECTIONS; i < PARTICLE_COUNT; i = i + CONNECTIONS){
    line(
      swarm[i].pos.x, swarm[i].pos.y, 0, //swarm[i].pos.z,
      swarm[i-CONNECTIONS].pos.x, swarm[i-CONNECTIONS].pos.y, 0 //swarm[i-CONNECTIONS].pos.z
    );
  }
}

Particle = function(_pos){

  this.pos = _pos;
  this.mass = createVector(random(-10, 10), random(-10, 10), random(-10, 10));

  this.render = function(use_force){
    if(use_force) this.apply_force();
    if(this.d < windowWidth)
    strokeWeight((map(this.d, 0, windowWidth / 8, 4, 1)));
    stroke(50, map(this.d, 0, windowWidth, 255, 50));
    point(this.pos.x, this.pos.y, this.pos.z);
  }

  this.apply_force = function(){
    this.dist = createVector(touchX - this.pos.x, touchY - this.pos.y, 0 - this.pos.z);
    this.d = dist(touchX, touchY, 0, this.pos.x, this.pos.y, this.pos.z);
    this.dist.mult(0.99);

    if(this.d < 100)
    this.dist.mult(1 / this.d);
    else
    this.dist.mult(1 / (sqrt(this.d)));

    if(!FROZEN)
    this.mass.add(this.dist.mult(0.33));
    else
    this.dist.mult(0.025);

    if(!ATTRACT) this.pos.sub(this.dist.sub(this.mass).mult(EASING));
    else{
      if(this.d > 1 && ATTRACT)
      this.pos.add(this.dist.add(this.mass).mult(EASING));
    }

    if(this.pos.x > windowWidth - 20) this.pos.x = windowWidth - 20;
    if(this.pos.y > windowHeight - 20) this.pos.y = windowHeight - 20;
    if(this.pos.x < 20) this.pos.x = 20;
    if(this.pos.y < 20) this.pos.y = 20;
  }
  return this;
}
