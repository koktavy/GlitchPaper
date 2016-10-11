/* Wallpaper/Glitch Art Generator version 2 in progress 10-11-16 by Tavius Koktavy for David Rios' "Creative Computing" - NYU Tisch Fall 2016.
   This program is still technically a work in progress of a more fully-featured wallpaper generator (and also gltich art generator),
   and the current version functions an interactive game. Left and right arrow keys change the variance which the colors will
   randomly change between whenever the ball hits a wall. The up and down arrow keys affect the speed and sometimes direction of the ball.
*/

function setup() {
  
  createCanvas(960,540); // Half of 1920 x 1080 ratio for testing, set blockSize to 30 to emulate full HD at scale
  fill(0);
  var columns = width/blockSize;
  var rows = height/blockSize;

  // Blank block array intitialization
  blocks = new Array(columns);        // Make an array over the width (columns)
  for (var i = 0; i < columns; i++) { // Loop over those columns
    blocks[i] = new Array(rows);      // And make a block for every row of every column
  }
  
  // Fill the array
  for (var co = 0; co < columns; co++) { // Loop over each column
    for (var ro = 0; ro < rows; ro++) {  // Loop over each row of the current column
      blocks[co][ro] = new block(co,ro); // Initialize a block object in the array, at that (x,y) position
      blocks[co][ro].make(r, g, b);   // 'Activate' that block, giving it color and a shape
    }
  }

  // User instructions
  startup();
  
}



function draw() {

  // Check that the user has started, then begin refreshing the wallpaper
  if (yspeed !== 0) {
    for (var i = 0; i < width/blockSize; i++) { // Loop over each column
      for (var j = 0; j < height/blockSize; j++) {  // Loop over each row of the current column
        blocks[i][j].show(); // Now print the block in its current state, no color update
      }
    }
  }
  
  // Ball functions
  renderBall();
  moveBall();
  detectWalls(); // If a wall is detected, that wall will be set to true, or 'hit'
  
  // If a wall is hit, change the color based on current variance
  if (topHit) {
    topHit = !topHit;
    updateColors();
  }
  if (bottomHit) {
    bottomHit = !bottomHit;
    updateColors();
  }
  if (leftHit) {
    leftHit = !leftHit;
    updateColors();
  }
  if (rightHit) {
    rightHit = !rightHit;
    updateColors();
  }  
  
  // Helpful info for the user:
  fill(255);
  textSize(18);
  text("Color variance at +/- " + v, 20, 20);
  text("Speed: " + xspeed + "x, " + yspeed + "y.", 20, 40);
  text("Press 's' to save as glitch_wp", 20, 60);
  
}










/*       vvvvvvvvv                                   vvvvvvvvvv
    vvvvvvvvvvvvvv CODE GRAVEYARD / IN-PROGRESS ZONE vvvvvvvvvvvvvvv
*/

  /* Notes:
     - shapes overlap each other when drawn later
     - p5 uses "var" not "int"
     - 1920 and 1080 both divisible by 60
     - triangle(x1, y1, x2, y2, x3, y3) x and y of each point
     - rect(x, y, w, h) x, y of top left corner
     - random(min,max);
     - noise()???
  */


// Use saveCanvas(canvas,filename,extension) to save the image out.
// Use saveFrames() for exporting gifs?
// See Shiffman's 10.2 Video Photobooth for hints towards camera input
  

 // triangle(0, 0, 50, 0, 0, 50);
 // triangle(100, 100, 50, 0, 0, 50);
 

/* Wallpaper generator
1.) Create a grid of shapes   (CHECK)
  - Input to determine the shape
  - Input to determine the blockSize/density of the shapes
2.) Color the shapes
  - Randomly at first   (CHECK)
    - then with near-color variation    (CHECK)
    - color skew affected by input (slider?)
    - How to avoid gross color combos?
  - Fun: random colors on click, to add a localized splash of your own
  - Transparent objects? Main color background?

*/