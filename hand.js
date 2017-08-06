function Phalanx(length, flexion, phalanx) {
  this.length = length;
  this.flexion = flexion;
  this.phalanx = phalanx;

  this.draw = function() {
    extend(this.length);
    if (this.phalanx) {
      this.phalanx.phalanx ? stroke(0, 0, 200) : stroke(200, 0, 0);
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
    stroke(255, 140, 0);
    extend(this.length);
    rotate(-this.abduction);
    stroke(0, 200, 0);
    this.phalanx.draw();
  }
}

function CarpalGroup(thumbFlexion, thumbAdduction, metacarpalSpread, digits) {
  this.thumbFlexion = thumbFlexion;
  this.thumbAdduction = thumbAdduction;
  this.metacarpalSpread = metacarpalSpread;
  this.digits = digits; // array of Metacarpal objects with digits[0] for thumb

  this.draw = function() {
    var base = 0.6; //width of carpal group
    var spread = map(this.metacarpalSpread, 0, 1, 1, 1.4);
    line(-base/2, 0, base/2, 0);
    translate(base/2, 0);
    push();
      rotate(-PI/6*spread + this.thumbAdduction); // abduct thumb metacarpal
      this.digits[0].draw();
    pop();
    push();
      for (var i = 0; i < 4; i++) {
        translate(-base/4, 0);  // translate to metacarpal base
        push();
          rotate(PI/36*spread * (i-1)); // abduct metacarpal bone
          this.digits[i+1].draw();
        pop();
      }
    pop();
  }
}

function extend(x) {
  line(0, 0, 0, x);
  translate(0, x);
}
