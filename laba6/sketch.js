let player;
let floor;
let countCanyons = 1;
let canyons = [];
let collectables = [];
let enemies = [];
let eyeOpen = true;
let blinkTimer = 0;

function setup() {
    createCanvas(1000, 800);

    floor = {
        x: 0,
        height: 200,
        color: color(25,255,25),
        draw: function () {
            fill(this.color);
            rect(this.x, height - this.height, width, this.height);
        }
    };

    for (let i = 0; i < countCanyons; i++) {
        canyons.push({
            x: 250 + i * 400,
            y: height - floor.height,
            width: 100,
            draw: function () {
                fill(69,41,12);
                rect(this.x, this.y, this.width, floor.height);
            }
        });
    }

    player = {
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        speedGravity: -5,
        color: color(255,92,119),
        grounded: false,
        dead: false,
        bullets: [],
        lastShotTime: 0,
        shootingCooldown: 500,

        draw: function () {
            fill(this.color);
            rect(this.x, this.y, this.width, this.height);
            this.drawEyes();
            this.gunDraw();
        },

        drawEyes: function () {
            fill(0);
            let eyeWidth = 10;
            let eyeHeight = 10;
            let eyeYOffset = 15;
            let eyeXOffset = 12;

            if (this.dead) {
                fill(200);
                ellipse(this.x + eyeXOffset, this.y + eyeYOffset, eyeWidth, eyeHeight);
                ellipse(this.x + this.width - eyeXOffset, this.y + eyeYOffset, eyeWidth, eyeHeight);
            } else {
                if (eyeOpen) {
                    ellipse(this.x + eyeXOffset, this.y + eyeYOffset, eyeWidth, eyeHeight);
                    ellipse(this.x + this.width - eyeXOffset, this.y + eyeYOffset, eyeWidth, eyeHeight);
                } else {
                    fill(200);
                    ellipse(this.x + eyeXOffset, this.y + eyeYOffset, eyeWidth, eyeHeight);
                    ellipse(this.x + this.width - eyeXOffset, this.y + eyeYOffset, eyeWidth, eyeHeight);
                }
            }
        },

        updateEyes: function () {
            blinkTimer++;
            if (blinkTimer > 60) {
                eyeOpen = !eyeOpen;
                blinkTimer = 0;
            }
        },

        gravity: function (floorHeight) {
            if (this.speedGravity < 15) {
                this.speedGravity++;
            }
            this.y += this.speedGravity;
            if (this.dead) {
                if (this.y > height) {
                    this.y = floorHeight;
                    this.x = 100;
                    this.dead = false;
                }
            } else if (this.y + this.height > height - floorHeight) {
                this.y = height - floorHeight - this.height;
                this.grounded = true;
            } else {
                this.grounded = false;
            }
        },

        jump: function () {
            if (this.grounded) {
                this.speedGravity = -20;
                this.grounded = false;
            }
        },

        moveLeft: function () {
            this.x -= 4;
        },

        moveRight: function () {
            this.x += 4;
        },

        movement: function () {
            if (!this.dead) {
                if (this.grounded && keyIsDown(87)) this.jump();
                if (keyIsDown(68)) this.moveRight();
                if (keyIsDown(65)) this.moveLeft();
            }
        },

        checkCanyon: function () {
            for (let i = 0; i < canyons.length; i++) {
                if (
                    this.y + this.height >= height - floor.height &&
                    this.x > canyons[i].x &&
                    this.x + this.width < canyons[i].x + canyons[i].width
                ) {
                    this.grounded = false;
                    this.dead = true;
                    this.speedGravity = 3;
                }
            }
        },

        gunDraw: function () {
            noStroke();
            fill(0);
            rect(this.x + this.width, this.y + this.height / 2 - 5, 10, 10);
            rect(this.x + this.width + 10, this.y + this.height / 2 - 2, 30, 4);
        },

        canShoot: function () {
            const currentTime = millis();
            return currentTime - this.lastShotTime >= this.shootingCooldown;
        },

        gunShot: function () {
            if (this.canShoot()) {
                let newBullet = {
                    x: this.x + this.width + 40,
                    y: this.y + this.height / 2,
                    speed: 10,
                    size: 5,
                    color: color(0)
                };
                this.bullets.push(newBullet);
                this.lastShotTime = millis();
            }
        },

        bulletUpdate: function () {
            for (let i = this.bullets.length - 1; i >= 0; i--) {
                let b = this.bullets[i];
                b.x += b.speed;
                
                // Check collision with pinkguy
                if (b.x > pinkguy.x && b.x < pinkguy.x + 75 &&
                    b.y > pinkguy.y && b.y < pinkguy.y + 50 && !pinkguy.dead) {
                    pinkguy.dead = true;
                    this.bullets.splice(i, 1);
                    continue;
                }
                
                if (b.x > width) {
                    this.bullets.splice(i, 1);
                }
            }
        },

        bulletDraw: function () {
            fill(0);
            noStroke();
            for (let bullet of this.bullets) {
                ellipse(bullet.x, bullet.y, bullet.size, bullet.size);
            }
        },

        checkCollisionWithPinkguy: function() {
            if (!this.dead && !pinkguy.dead &&
                this.x < pinkguy.x + 75 && this.x + this.width > pinkguy.x &&
                this.y < pinkguy.y + 50 && this.y + this.height > pinkguy.y) {
                this.dead = true;
                this.speedGravity = 3;
            }
        }
    };

    pinkguy = {
        x: 300,
        y: 555,
        Left: 400,
        Right: 700,
        direction: 1,
        random: 0,
        dead: false,

        draw: function () {
            if (this.dead) return;
            stroke(0);
            strokeWeight(2);
            fill(230, 117, 164);
            rect(this.x, this.y, 75, 50);
            fill(255);
            ellipse(this.x + 20, this.y + 15, 10, 10);
            ellipse(this.x + 50, this.y + 15, 10, 10);
            fill(0);
            ellipse(this.x + 20, this.y + 15, 5, 5);
            ellipse(this.x + 50, this.y + 15, 5, 5);
        },
        move: function () {
            if (this.dead) return;
            this.x += this.random * this.direction;
            if (this.x <= this.Left) {
                this.x += this.Left - this.x;
                this.direction *= -1;
            } else if (this.x >= this.Right) {
                this.x -= this.x - this.Right;
                this.direction *= -1;
            }
        }
    };
}

function draw() {
    background(102,217,255);
    floor.draw();

    for (let canyon of canyons) {
        canyon.draw();
    }
    
    pinkguy.random = Math.floor(Math.random() * (7 - 1)) + 1;
    pinkguy.move();
    pinkguy.draw();

    player.updateEyes();
    player.gravity(floor.height);
    player.movement();
    player.checkCanyon();
    player.checkCollisionWithPinkguy();

    if (keyIsDown(70)) {
        player.gunShot();
    }

    player.bulletUpdate();
    player.bulletDraw();
    player.draw();
}