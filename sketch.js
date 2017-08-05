var thumb = new Metacarpal(1, PI/6, 0,
              new Phalanx(1, 0,
                new Phalanx(1)
              )
            );

var index = new Metacarpal(2, 0, 0
              new Phalanx(1, 0,
                new Phalanx(1, 0,
                  new Phalanx(1)
                )
              )
            );

var middle = new Metacarpal(2, 0, 0
              new Phalanx(1, 0,
                new Phalanx(1, 0,
                  new Phalanx(1)
                )
              )
            );

var ring = new Metacarpal(2, 0, 0
              new Phalanx(1, 0,
                new Phalanx(1, 0,
                  new Phalanx(1)
                )
              )
            );

var pinky = new Metacarpal(2, 0, 0
              new Phalanx(1, 0,
                new Phalanx(1, 0,
                  new Phalanx(1)
                )
              )
            );

var digits = [thumb, index, middle, ring, pinky];

var hand = new CarpalGroup(0, 0, 0, digits);
