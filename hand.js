function Phalanx(length, flexion, phalanx) {
  this.length = length;
  this.flexion = flexion;
  this.phalanx = phalanx;

  this.draw = function() {
    extend(this.length);
    hinge(this.flexion, 5);
    if (this.phalanx) {
      // this.phalanx.phalanx ? ambientMaterial(0, 0, 200) : ambientMaterial(200, 0, 0);
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
    hinge(this.flexion, 5);
    // ambientMaterial(0, 200, 0);
    this.phalanx.draw();
  }

}

function CarpalGroup(thumbFlexion, thumbAdduction,
                      metacarpalSpread, digits) {
  this.thumbFlexion = thumbFlexion;
  this.thumbAdduction = thumbAdduction;
  this.metacarpalSpread = metacarpalSpread;
  this.digits = digits; // array of Metacarpal objects with digits[0] for thumb

  // set all five metacarpophalangeal abductions
  this.setMCPAbductions = function(values) {
    for (var i = 0; i < 5; i++) {
      this.digits[i].abduction = values[i];
    }
  }
  // set all five metacarpophalangeal flexions
  this.setMCPFlexions = function(values) {
    for (var i = 0; i < 5; i++) {
      this.digits[i].flexion = values[i];
    }
  }
  // set all five proximal interphalangeal flexions
  this.setPIPFlexions = function(values) {
    for (var i = 0; i < 5; i++) {
      this.digits[i].phalanx.flexion = values[i];
    }
  }
  // set all four distal interphalangeal flexions
  this.setDIPFlexions = function(values) {
    for (var i = 1; i < 5; i++) {
      this.digits[i].phalanx.phalanx.flexion = values[i-1];
    }
  }
  // get all five metacarpophalangeal abductions
  this.getMCPAbductions = function() {
    var values = [];
    for (var i = 0; i < 5; i++) {
      values.push(this.digits[i].abduction);
    }
    return values;
  }
  // get all five metacarpophalangeal flexions
  this.getMCPFlexions = function() {
    var values = [];
    for (var i = 0; i < 5; i++) {
      values.push(this.digits[i].flexion);
    }
    return values;
  }
  // get all five proximal interphalangeal flexions
  this.getPIPFlexions = function() {
    var values = [];
    for (var i = 0; i < 5; i++) {
      values.push(this.digits[i].phalanx.flexion);
    }
    return values;
  }
  // get all five distal interphalangeal flexions
  this.getDIPFlexions = function() {
    var values = [];
    for (var i = 1; i < 5; i++) {
      values.push(this.digits[i].phalanx.phalanx.flexion);
    }
    return values;
  }

  this.draw = function() {
    var base = 100; //width of carpal group
    var spread = map(this.metacarpalSpread, 0, 1, 1, 1.4);
    // ambientMaterial(120, 0, 180);
    box(base + 20, 20, 24);
    // push();
    //   rotateZ(PI/2);
    //   cylinder(10, base);
    // pop();
    push();
      translate(base/2, 0, 0);
      rotateX(-PI/12);
      // axisRose(40);
      rotateY(-this.thumbFlexion);
      rotateZ(PI/8*spread); // abduct thumb metacarpal
      // rotateY(-PI/3);
      // axisRose(40);
      rotateX(-this.thumbAdduction);
      rotateY(-PI/4)
      // ambientMaterial(255, 140, 0);
      this.digits[0].draw();
    pop();
    push();
      for (var i = 0; i < 4; i++) {
        push();
          translate(-base/4*(i-1), 0);  // translate to metacarpal base
          rotateZ(-PI/36*spread * (i-1)); // abduct metacarpal bone
          // ambientMaterial(255, 140, 0);
          this.digits[i+1].draw();
        pop();
      }
    pop();
  }
}

// The Hand object is redundant of the CarpalGroup object
// but this way, I can easily add a Wrist object between the two
function Hand(carpalGroup) {
  this.carpalGroup = carpalGroup;

  this.draw = function() {
    this.carpalGroup.draw();
  }

  this.openPalm = function() {
    var cg = this.carpalGroup;
    cg.setMCPAbductions(OPEN_PALM.mcpAbducitons);
    cg.setMCPFlexions(OPEN_PALM.mcpFlexions);
    cg.setPIPFlexions(OPEN_PALM.pipFlexions);
    cg.setDIPFlexions(OPEN_PALM.dipFlexion);
    cg.thumbFlexion = OPEN_PALM.thumbFlexion;
    cg.thumbAdduction = OPEN_PALM.thumbAdduction;
  }

  this.fist = function() {
    var cg = this.carpalGroup;
    cg.setMCPAbductions(FIST.mcpAbductions);
    cg.setMCPFlexions(FIST.mcpFlexions);
    cg.setPIPFlexions(FIST.pipFlexions);
    cg.setDIPFlexions(FIST.dipFlexions);
    cg.thumbFlexion = FIST.thumbFlexion;
    cg.thumbAdduction = FIST.thumbAdduction;
  }

  this.makeFist = function(t) {
    var cg = this.carpalGroup;
    cg.setMCPAbductions(
      lerpArray(OPEN_PALM.mcpAbductions, FIST.mcpAbductions, t));
    cg.setMCPFlexions(
      lerpArray(OPEN_PALM.mcpFlexions, FIST.mcpFlexions, t));
    cg.setPIPFlexions(
      lerpArray(OPEN_PALM.pipFlexions, FIST.pipFlexions, t));
    cg.setDIPFlexions(
      lerpArray(OPEN_PALM.dipFlexions, FIST.dipFlexions, t));
    cg.thumbFlexion =
      lerp(OPEN_PALM.thumbFlexion, FIST.thumbFlexion, pow(t,12));
    cg.thumbAdduction =
      lerp(OPEN_PALM.thumbAdduction, FIST.thumbAdduction, t);
  }
}

// HAND STATES

function JointState(mcpAbductions, mcpFlexions, pipFlexions,
                    dipFlexions, thumbFlexion, thumbAdduction) {
  this.mcpAbductions = mcpAbductions;
  this.mcpFlexions = mcpFlexions;
  this.pipFlexions = pipFlexions;
  this.dipFlexions = dipFlexions;
  this.thumbFlexion = thumbFlexion;
  this.thumbAdduction = thumbAdduction;
}

const OPEN_PALM = new JointState(
  [0, 0, 0, .03, .05],
  [.1, .1, .1, .1, .1],
  [.1, .1, .1, .1, .1],
  [.06, .06, .06, .06],
  0,
  0
)

const FIST = new JointState(
  [-.3, -.07, -0.03, 0, 0],
  [.9, 1.4, 1.5, 1.5, 1.6],
  [1.2, 2.1, 2, 2, 2],
  [1.4, 1.4, 1.4, 1.4],
  .6,
  .27
)

// HELPER FUNCTIONS

var k = 150; // thsi is the proportionality constant for the bone lengths
function extend(r) {
  r *= k;
  translate(0, r/2, 0);
  box(20, r, 24);
  // cylinder(10, r);
  translate(0, r/2, 0);
}
function hinge(angle, offset) {
  translate(0, 0, -offset);
  rotateX(-angle);
  translate(0, 0, offset);
}

function lerpArray(start, stop, amt) {
  var m = min(start.length, stop.length);
  var arr = [];
  for (var i = 0; i < m; i++) {
    arr.push(lerp(start[i], stop[i], amt));
  }
  return arr;
}
