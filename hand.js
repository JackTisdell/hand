function Phalanx(length, flexion, phalanx) {
  this.length = length;
  this.flexion = flexion || null;
  this.phalanx = phalanx || null;
}

function Metacarpal(length, flexion, abduction, phalanx) {
  this.length = length;
  this.flexion = flexion;
  this.abduction = abduction;
  this.phalanx = phalanx;
}

function CarpalGroup(thumbFlexion, thumbAdduction, metacarpalSpread, digits) {
  this.thumbFlexion = thumbflexion;
  this.thumbAdduction = thumbAdduction;
  this.metacarpalSpreal = metacarpalSpread;
  this.digits = digits; // array of Metacarpal objects with digits[0] for thumb
}
