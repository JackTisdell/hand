# hand
Animation capable 3D hand models structured by recursive component objects.

### The basic idea
The goal of this project is to build a simple anatomical model of the hand in p5.js.
In particular, I would like to maintain a conceptual separation between the abstact informational model of the and
and the visual display model.

We aim to create a Hand object that is recursively decomposable into its components, thus revealing the topology of the hand.
The esential component Objects are the Phalanx, Metacarpal, CarpalGroup, and Wrist objects.

The **Phalanx** object has as properties its *length*, the *flexion* angle of the next interphalangeal joint, and the
next *phalanx*. In the special case of the distral phalanges, the flexion and phalanx properties are both null.  
The **Metacarpal** object has as properties its *length*, the *flexion* and *abduction* angles of its metacarpophalangeal
joint and it connencted *phalanx*.  
The **CarpalGroup** object has as properties the *flexion* and *adduction* angles of the thumb, the *spread* of the metacarpal
bones and an array of metacarpal objects corresponding to the *digits*.
