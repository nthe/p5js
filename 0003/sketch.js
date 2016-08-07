
var easing = 0.05;
var max_velocity = 1.
var ns = null;

function setup(){
  createCanvas(windowWidth * 0.2, windowHeight);
  stroke(50, 100);
  smooth(2);
  frameRate(33);
  strokeWeight(1.5);
  background(250);
  ns = new NodeSystem(50);
}

function draw(){
  if(ns.nodes.length < ns.nodes_count){
    ns.grow(random(windowWidth * 0.18), windowHeight + 100 - (ns.nodes.length * 22));
  } else {
    ns.render();
    noLoop();
  }
}

function windowResized(){
  resizeCanvas(windowWidth * 0.2, windowHeight);
  background(250);
}

function NodeSystem(_nodes_count){
  this.nodes = []
  this.nodes_count = _nodes_count;

  this.grow = function(_x, _y){
    this.nodes.push(new Node(createVector(_x, _y)));
    this.render();
  }

  var dist = 0;

  this.render = function(){
    for(var i = 0; i < this.nodes.length; i++){
      for(var j = 0; j < this.nodes.length; j++){
        this.nodes[j].pos.x += random(-1, 1);;
        dist = this.nodes[i].pos.dist(this.nodes[j].pos);
        if(dist < 110){
          line(this.nodes[i].pos.x, this.nodes[i].pos.y, this.nodes[j].pos.x, this.nodes[j].pos.y);
        }
        if(dist < 30 & i != j){
          this.nodes[i].pos.rotate(PI/4);
        }
      }
    }
  }
}

function Node(_v){
  this.pos = _v;
  this.vel = createVector(random(-1, 1), random(-1, 1));

  this.update = function(){
    this.vel.limit(max_velocity);
    this.pos.add(this.vel * easing);
  }
}
