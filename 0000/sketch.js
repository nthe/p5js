var particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(250);
  noFill();
}

function mousePressed() {
  particles.push(new Particle(mouseX, mouseY));
}

function draw() {
  // background(250);
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
}

function Particle(x, y) {
  this.pos = createVector(touchX, touchY);
  this.vel = createVector(random(-4, 4), random(-4, 4));
  this.nf = random(0, 1000.);
  this.history = [];

  this.update = function() {
    this.pos.add(this.vel.rotate(noise(this.nf) * 0.07));
    this.nf += 0.00174;

    this.avg = createVector(0, 0);

    for (var i = 0; i < this.history.length; i++) {
      this.history[i].x += random(-1, 1);
      this.history[i].y += random(-1, 1);
      this.avg.x += this.history[i].x;
      this.avg.y += this.history[i].y;
    }

    this.alpha = this.avg.div(this.history.length).dist(createVector(this.x, this.y));
    if(this.alpha > 150) this.alpha = 150;

    var v = createVector(this.pos.x, this.pos.y);
    this.history.push(v);
    if (this.history.length > 20) {
      this.history.splice(0, 1);
    }
  }

  this.show = function() {
    stroke(200 - this.alpha);
    beginShape();
    for (var i = 0; i < this.history.length; i++) {
      var pos = this.history[i];
      curveVertex(pos.x, pos.y);
    }
    endShape();
  }
}
