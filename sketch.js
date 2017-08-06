var thumb = new Metacarpal(0.7, 0.1, 0,
              new Phalanx(0.4, 0.1,
                new Phalanx(0.24)
              )
            );
var index = new Metacarpal(.98, 0.1, 0,
              new Phalanx(.57, 0.1,
                new Phalanx(0.4, 0.06,
                  new Phalanx(0.24)
                )
              )
            );
var middle = new Metacarpal(1, 0.1, 0,
              new Phalanx(.6, 0.1,
                new Phalanx(0.4, 0.06,
                  new Phalanx(0.24)
                )
              )
            );
var ring = new Metacarpal(0.9, 0.1, 0.03,
              new Phalanx(.6, 0.1,
                new Phalanx(0.4, 0.06,
                  new Phalanx(0.24)
                )
              )
            );
var pinky = new Metacarpal(0.75, 0.1, 0.05,
              new Phalanx(.55, 0.1,
                new Phalanx(0.3, 0.06,
                  new Phalanx(0.22)
                )
              )
            );
var digits = [thumb, index, middle, ring, pinky];
var hand = new Hand(new CarpalGroup(0, 0, 0, digits));

function setup() {
  createCanvas(400, 500, WEBGL);
}

function draw() {
  background('#aaa');
  scale(1, -1, 1);
  translate(0, -150, 0)
  ambientLight(100);
  pointLight(255, 255, 255, -1, 2, 2);
  rotateY(PI/2 + frameCount*0.005);
  normalMaterial();
  hand.draw();
  hand.makeFist(sin(frameCount*0.003)*sin(frameCount*0.003));
}

function axisRose(r) {
  push();
    ambientMaterial(200, 0, 0);
    translate(r/2, 0, 0)
    box(r, r/20, r/20);
  pop();
  push();
    ambientMaterial(0, 200, 0);
    translate(0, r/2, 0)
    box(r/20, r, r/20);
  pop();
  push();
    ambientMaterial(0, 0, 200);
    translate(0, 0, r/2)
    box(r/20, r/20, r);
  pop();
}
