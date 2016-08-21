var particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noFill();
  stroke(20);
  textSize(14);
}

function mousePressed() {
  particles.push(new Particle(mouseX, mouseY));
  if(particles.length > 5) particles.splice(0, 1);
}

function draw() {
  noFill();
  stroke(20);
  background(255, 20);
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
  fill(20);
  noStroke();
  text("click to add smoke chain", 20, height - 30);
}

function Particle(x, y) {
  this.pos = createVector(touchX, touchY);
  this.history = [];
  this.closeup = false;

  this.update = function() {
    this.pos.x = touchX;
    this.pos.y = touchY;

    for (var i = 0; i < this.history.length; i++) {
      this.history[i].x += random(-1, 1);
      this.history[i].y += random(-1 , 1);
    }

    this.history.push(this.pos.copy());
    if (this.history.length > 50) {
      this.history.splice(0, 1);
    }
  }

  this.show = function() {
    beginShape();
    for (var i = 0; i < this.history.length; i++) {
      pos = this.history[i];
      curveVertex(pos.x, pos.y);
    }
    endShape();
  }
}
