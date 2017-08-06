var thumb = new Metacarpal(0.5, 0, -0.1,
              new Phalanx(0.4, 1,
                new Phalanx(0.2)
              )
            );
var index = new Metacarpal(1, 0, 0,
              new Phalanx(.55, 0,
                new Phalanx(0.4, 0,
                  new Phalanx(0.2)
                )
              )
            );
var middle = new Metacarpal(1, 0, 0,
              new Phalanx(.6, 0,
                new Phalanx(0.4, 0,
                  new Phalanx(0.2)
                )
              )
            );
var ring = new Metacarpal(0.9, 0, 0.03,
              new Phalanx(.6, 0,
                new Phalanx(0.4, 0,
                  new Phalanx(0.2)
                )
              )
            );
var pinky = new Metacarpal(0.75, 0, 0.05,
              new Phalanx(.55, 0,
                new Phalanx(0.3, 0,
                  new Phalanx(0.2)
                )
              )
            );
var digits = [thumb, index, middle, ring, pinky];
var hand = new CarpalGroup(0, 0, 0, digits);


function setup() {
  createCanvas(600, 600);

}

function draw() {
  background('#eee');
  translate(width/2, height - 100);
  scale(1, -1);
  coordScale(150);
  hand.draw();
}

function coordScale(r) {
  scale(r);
  strokeWeight(1/r);
}
