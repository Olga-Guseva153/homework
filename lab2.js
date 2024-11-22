let x
let y
function setup() {
  createCanvas(500, 500);
  x = 0
  y = 0
}
function draw() {
  background(122,189,255);
  fill(214,193,196)
  ellipse(x+200,y+245,50,60)
    strokeWeight(8)
  line(x+190,y+350,x+180,y+390)
  line(x+210,y+350,x+220,y+390)
  line(x+150,y+330,x+200,y+280)
  line(x+250,y+330,x+200,y+280)
  fill(169,32,62)
  ellipse(x+200,y+320,45,75)
  if(keyIsPressed){
    if(key == "D"){
      x = x + 1
    } 
  }
  if(keyIsPressed){
    if(key == "A"){
      x = x - 1
    } 
  }
  if(keyIsPressed){
    if(key == "W"){
      y = y - 1
    }
  }
  if(keyIsPressed){
    if(key == "S"){
      y = y + 1
    }
  }
}
