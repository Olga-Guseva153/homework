let state = "idle";  
 
function setup() { 
  createCanvas(400, 400); 
} 
 
function draw() { 
  background(87,176,255); 
  fill(32,232,14)
  rect(0,310,400,90)

 
  if (state === "idle") { 
    drawIdle(); 
  } else if (state === "runLeft") { 
    drawRunLeft(); 
  } else if (state === "runRight") { 
    drawRunRight(); 
  } else if (state === "jump") { 
    drawJump(); 
  } else if (state === "jumpLeft") { 
    drawJumpLeft(); 
  } else if (state === "jumpRight") { 
    drawJumpRight(); 
  } 
} 
 
function drawIdle() { 
  stroke(255,218,185);
  strokeWeight(8) ;
  line(160, 250, 203, 234);  
  line(238, 250, 205, 237); 
  strokeWeight(10);
  line(190, 260, 190, 310); 
  line(210, 260, 210, 310); 
  strokeWeight(1);
  fill(79,0,112);
  ellipse(200,260, 40, 60);
  fill(255,218,185);
  ellipse(200, 210, 40, 40);
  fill(0);
  circle(207,210,6);
  circle(195,210,6);
} 
 

 
function drawRunLeft() {
  stroke(255,218,185)
  strokeWeight(8) 
  line(160, 250, 203, 234);  
  line(238, 250, 205, 237); 
  strokeWeight(10)
  line(186, 260, 197, 307); 
  line(210, 260, 200, 310); 
  strokeWeight(1)
  fill(79,0,112)
  ellipse(200,260, 40, 60);
  fill(255,218,185)
  ellipse(200, 210, 40, 40);
  fill(0)
  circle(207,210,6)
  circle(195,210,6) 
}

 
function drawRunRight() { 
  stroke(255,218,185)
  strokeWeight(8) 
  line(160, 250, 203, 234);  
  line(238, 250, 205, 237); 
  strokeWeight(10)
  line(190, 260, 184, 310); 
  line(210, 260, 216, 310); 
  strokeWeight(1)
  fill(79,0,112)
  ellipse(200,260, 40, 60);
  fill(255,218,185)
  ellipse(200, 210, 40, 40);
  fill(0)
  circle(207,210,6)
  circle(195,210,6) 
}
 
function drawJump() { 
  stroke(255,218,185)
  strokeWeight(8) 
  line(160, 220, 203, 204);  
  line(238, 220, 205, 207); 
  strokeWeight(10)
  line(190, 230, 190, 280); 
  line(210, 230, 210, 280); 
  strokeWeight(1)
  fill(79,0,112)
  ellipse(200,230, 40, 60);
  fill(255,218,185)
  ellipse(200, 180, 40, 40);
  fill(0)
  circle(207,180,6)
  circle(195,180,6)
} 

 
 
function keyPressed() { 
  if (key === '1') { 
    state = "idle"; 
  } else if (key === '2') { 
    state = "runLeft"; 
  } else if (key === '3') { 
    state = "runRight"; 
  } else if (key === '4') { 
    state = "jump"; 
  } 
}