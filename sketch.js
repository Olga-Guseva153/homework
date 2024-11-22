//game stage
var stage = 0;

//enemy
var EnPosX = 400;
var EnPosY = 650;
var EnSizeX = 40;
var EnSizeY = 40;
var EnState = enemyRight;
var EnDotLeft = 300;
var EnDotRight = 400;
let EnDirection = 1;
var EnRand;

function setup() {
    createCanvas(800, 800);
}

function draw() {
    if (stage == 0) {
        nebo();
        cloud();
        mountain();
        tree();
        canyon();
        money();
        EnRand = Math.floor(Math.random() * (10 - 1)) + 1;
        switch (EnState) {
            case "enemyLeft":
                enemyLeft();
                break;
            case "enemyRight":
                enemyRight();
                break;
            default:
                enemyRight();
                break;
        }
        enemyMovement()
    }
    console.log(EnRand)
}

function enemyMovement() {
    EnPosX += EnRand * EnDirection
    if (EnPosX <= EnDotLeft) {
        EnPosX += EnDotLeft - EnPosX
        EnDirection *= -1
        EnState = "enemyRight"
    } else if (EnPosX >= EnDotRight) {
        EnPosX -= EnPosX - EnDotRight
        EnDirection *= -1
        EnState = "enemyLeft"
    }
}

function enemyLeft() {
stroke(0);
strokeWeight(2);
fill(230,117,164); 
rect(EnPosX - EnSizeX, EnPosY, EnSizeX, EnSizeY);
fill(255);
ellipse(EnPosX - EnSizeX / 1, EnPosY + EnSizeY / 3, EnSizeX / 2, EnSizeY / 2);
ellipse(EnPosX - EnSizeX / 1 + EnSizeX / 2, EnPosY + EnSizeY / 3, EnSizeX / 2, EnSizeY / 2);
}

function enemyRight() {
stroke(0);
strokeWeight(2);
fill(230,117,164);
rect(EnPosX, EnPosY, EnSizeX, EnSizeY);
fill(255);
ellipse(EnPosX + EnSizeX / 1 - EnSizeX / 2 , EnPosY + EnSizeY / 3, EnSizeX / 2, EnSizeY / 2);
ellipse(EnPosX + EnSizeX / 1, EnPosY + EnSizeY / 3, EnSizeX / 2, EnSizeY / 2);

}

function nebo() {
background(66, 170, 255);   
noStroke();
fill(0,179,0);
rect(0,603,800,222);
}

function cloud() {
fill(255);                  
circle(600,300,70);  
circle(630,280,60);
circle(660,280,70);
circle(680,300,60);
circle(710,300, 70);
rect (600,300,110,35);
}

function mountain() {
fill(128,128,128);        
triangle(250,603,450,360,600,603);
}

function tree() {
fill(46,151,0);             
triangle(646,510, 676, 480, 706,510);
triangle(629,544, 676, 506, 720,544);
triangle (615,578, 676, 536, 734,578);
fill(97, 68,39);            
rect (666,578,20,25);
}

function canyon() {
fill(97, 68,39);           
quad(150,603,50,603,100,800,200,800);
}

function money() {
fill(247,242,26);
circle(450,700,25);
circle(430,740,25);  
circle(230,680,25);
}