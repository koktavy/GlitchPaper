// The functions used by wall_generator at runtime:


/////////////////////// Setup code: ///////////////////////////

function startup() {
  fill(255,255,255); // Set the text color
  textSize(24);
  text("This program attempts to create abstract glitch wallpapers.",200,height/2-140);
  text("It generates these through user awe and frustration.",200,height/2-110);
  text("Use the arrow keys to play:",250,height/2-70);
  text("< / > adjusts the color variance",250,height/2-42);
  text("^ / v shifts the speed of the ball",250,height/2-20);
  text("Pressing the 's' key will save a .png image (browsers will vary)",200,height/2+7);
  text("Hit 'ENTER' to begin",200,height/2+35);
}


  
/////////////////////// Ball code: ////////////////////////////

// Draw the ellipse
function renderBall() {
  // Once the background is being updated to a 'current' state, this will eliminate ball trails
  push();
  stroke(0);
  strokeWeight(0.5);
  fill(15, 175, 150);
  ellipse(eX,eY,40,40); // (x,y,l,h); draws from center.
  pop();
}

// Make it move
function moveBall() {
  eY = eY + yspeed;
  eX = eX + xspeed;
}

// Make it bounce off walls
function detectWalls() {
  if (eY > height - 15) {
    bottomHit = !bottomHit;
    yspeed = -yspeed;
  }
  
  if (eY < 15) {
    topHit = !topHit;
    yspeed = -yspeed;
  }
  
  if (eX > width - 15) {
    rightHit = !rightHit;
    xspeed = -xspeed;
  }
  
  if (eX < 15) {
    leftHit = !leftHit;
    xspeed = -xspeed;
  }
}



/////////////////////// Block code: ////////////////////////////

// Block object constructor:
function block(x, y) {
  this.x = x * blockSize;  // Properties of every block
  this.y = y * blockSize;
  this.r = 0;
  this.g = 0;
  this.b = 0;
  
  // Two functions of block objects:
    // Make overwrites the object's color variables, then prints to draw
  this.make = function(x, y, z) {
    this.r = x;
    this.g = y;
    this.b = z;
    fill(newR(this.r),newG(this.g),newB(this.b));
    rect(this.x, this.y, blockSize, blockSize);
  }
  
    // Show simply prints a new instance to draw
  this.show = function() {
    fill(this.r, this.g, this.b)
    rect(this.x, this.y, blockSize, blockSize);
  }
  
}



//////////////////////////  Colors  ///////////////////////////

/* Still can't figure out how to make this one function:
   Problem is about taking a variable input global variable and setting that variable without using
   the global variable's name, in order to keep the input global variable variable. Make sense?
   (Similarly, see the currently unused wallHit() )
*/

// Successfully replace random() with noise() and you'll get some sweet results.

function newR(n) {
  if (n >= 255 || n <= 0) {
    n = 128;
  } else {
    n = random(n-v, n+v);
  }
  r = n;
  return r;
}

function newG(n) {
  if (n >= 255 || n <= 0) {
    n = 128;
  } else {
    n = random(n-v, n+v);
  }
  g = n;
  return g;
}

function newB(n) {
  if (n >= 255 || n <= 0) {
    n = 128;
  } else {
    n = random(n-v, n+v);
  }
  b = n
  return b;
}

// Ideally, a generic:
function newC(n) {
  if (n >= 255 || n <= 0) {
    n = 128;
  } else {
    n = random(n-v, n+v);
  }
  c = n
  return c;
}



//////////////////////////  Controls  ///////////////////////////

// Controls (movement could be tweaked, but they're kinda fun how they are)
function keyPressed() {
  
    // Start Game
  if (keyCode === ENTER) {
    if (yspeed !== 0) {
      return;
    } else {
      xspeed = 10;
      yspeed = 5;
    }
  }
  
  // Decrease color variance
  if (keyCode === LEFT_ARROW) {
    if (v < 10) {
      v -= 1;
    } else if (v < 25) {
      v -= 2;
    } else {
      v -= 5;
    }
  }
  
  // Increase color variance
  if (keyCode === RIGHT_ARROW) {
    if (v < 10) {
      v += 1;
    } else if (v < 25) {
      v += 2;
    } else {
      v += 5;
    }
  }
  
  // Speed up (unless inverted :P)
  if (keyCode === UP_ARROW) {
    if (yspeed == 0) {
      return;
    }
    xspeed += 2;
    yspeed += 2;
  }
  
  // Slow down (unless inverted :P)
  if (keyCode === DOWN_ARROW) {
    if (yspeed == 0) {
      return;
    }
    xspeed -= 2;
    yspeed -= 2;
  }
  
}

// When the user hits the 's' key, the blocks are drawn fresh in their current state and a .png is saved via browser.
function keyTyped() {
  if (key === 's') {
    for (var i = 0; i < width/blockSize; i++) { // Loop over each column
      for (var j = 0; j < height/blockSize; j++) {  // Loop over each row of the current column
        blocks[i][j].show(); // Now print the block in its current state, no color update
      }
    }
    saveCanvas('glitch_wp.png', 'png');
  }
}


//////////////////////////  Collision Color Update  ///////////////////////////

// Loop over the 2D array and update the block at each index with new colors
function updateColors() {
  for (var co = 0; co < width/blockSize; co++) {
    for (var ro = 0; ro < height/blockSize; ro++) {
      fill(newR(r),newG(g),newB(b));
      noStroke();
      blocks[co][ro].make(r, g, b);
    }
  }
}

// Test the fours walls for collision, updating the colors if so
function wallHit(w) {
  if (w === true) {
    w = !w;
    return;
  }
}

