// The global variables used by wall_generator at runtime:


// User control
var blockSize = 30;  // Default to 60, it is resolution friendly
var sizeSlider;

// Color
var r = 200;
var g = 200;
var b = 200;
var v = 20; // variance

// Ellipse
var eX = 50;
var eY = 50;
var xspeed = 0;
var yspeed = 0;

// Collision
var topHit = false;
var bottomHit = false;
var leftHit = false;
var rightHit = false;

// Block array declaration
var blocks;