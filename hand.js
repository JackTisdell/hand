function Phalanx(length, flexion, phalanx) {
  this.length = length;
  this.flexion = flexion;
  this.phalanx = phalanx;

  this.draw = function() {
    extend(this.length);
    rotateX(-this.flexion);
    if (this.phalanx) {
      this.phalanx.phalanx ? ambientMaterial(0, 0, 200) : ambientMaterial(200, 0, 0);
      this.phalanx.draw();
    }
  }
}
// for distal phalanges, flexion and phalanx remain undefined

function Metacarpal(length, flexion, abduction, phalanx) {
  this.length = length;
  this.flexion = flexion;
  this.abduction = abduction;
  this.phalanx = phalanx;

  this.draw = function() {
    extend(this.length)
    rotateZ(this.abduction);
    rotateX(-this.flexion);
    ambientMaterial(0, 200, 0);
    this.phalanx.draw();
  }
}

function CarpalGroup(thumbFlexion, thumbAdduction, metacarpalSpread, digits) {
  this.thumbFlexion = thumbFlexion;
  this.thumbAdduction = thumbAdduction;
  this.metacarpalSpread = metacarpalSpread;
  this.digits = digits; // array of Metacarpal objects with digits[0] for thumb

  this.draw = function() {
    var base = 100; //width of carpal group
    var spread = map(this.metacarpalSpread, 0, 1, 1, 1.4);
    ambientMaterial(120, 0, 180);
    box(base, 20, 20);
    push();
      translate(base/2, 0, 0);
      rotateY(-PI/8 - this.thumbFlexion);
      // axisRose(40);
      rotateZ(PI/6*spread + this.thumbAdduction); // abduct thumb metacarpal
      rotateY(-PI/3);
      // axisRose(40);
      ambientMaterial(255, 140, 0);
      this.digits[0].draw();
    pop();
    push();
      for (var i = 0; i < 4; i++) {
        push();
          translate(-base/4*(i-1), 0);  // translate to metacarpal base
          rotateZ(-PI/36*spread * (i-1)); // abduct metacarpal bone
          ambientMaterial(255, 140, 0);
          this.digits[i+1].draw();
        pop();
      }
    pop();
  }
}

var k = 150; // thsi is the proportionality constant for the bone lengths

function extend(r) {
  r *= k;
  translate(0, r/2, 0);
  box(14, r, 20);
  translate(0, r/2, 0);
}
