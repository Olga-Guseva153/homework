let gameObjects = {
    pinkguy: {
        x: 300,
        y: 555,
        Left: 100,
        Right: 500,
        direction: 1,
        random: 0,
    }
};

function setup() {
    createCanvas(800, 800);
}

function draw() {
    background(66, 170, 255)
    fill(0,179,0)
    rect(0,603,800,222)
    const pinkguy = gameObjects.pinkguy;
    pinkguy.random = Math.floor(Math.random() * (15 - 5)) + 5;
    renderPinkguy();
    Move();
}

function renderPinkguy() {
    const pinkguy = gameObjects.pinkguy;
    stroke(0);
    strokeWeight(2);
    fill(230,117,164); 
    rect(pinkguy.x, pinkguy.y, 75, 50); 
    fill(255); 
    ellipse(pinkguy.x + 20, pinkguy.y + 15, 10, 10);
    ellipse(pinkguy.x + 50, pinkguy.y + 15, 10, 10);
    fill(0); 
    ellipse(pinkguy.x + 20, pinkguy.y + 15, 5, 5);
    ellipse(pinkguy.x + 50, pinkguy.y + 15, 5, 5);
}

function Move() {
    const pinkguy = gameObjects.pinkguy;
    pinkguy.x += pinkguy.random * pinkguy.direction;
    if (pinkguy.x <= pinkguy.Left) {
        pinkguy.x += pinkguy.Left - pinkguy.x;
        pinkguy.direction *= -1;
    } else if (pinkguy.x >= pinkguy.Right) {
        pinkguy.x -= pinkguy.x - pinkguy.Right;
        pinkguy.direction *= -1;
    }
}