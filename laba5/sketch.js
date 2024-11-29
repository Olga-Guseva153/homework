let floor
let gameChar
let canyon

function setup()
{
	createCanvas(900, 600);
	floor = {
	height: 200,
	color: color(100, 250, 50),
    
	drawFloor: function()
		{
		  noStroke();
		  fill(this.color);
		  rect(0, height - this.height, width, this.height)
		}
	}

	gameChar = {	
		xPos: 500,
		yPos: 200,
		width: 60,
        height: 30,
		grounded: false,
		forceGravity: -7,
		color: color(255, 163, 67),
		dead: false,
      
		drawCharacter: function()
			{
				fill(this.color);
            	circle(this.xPos, this.yPos, this.width, this.height)
			},
      
		gravity: function()
			{
				if (this.forceGravity > -5)
					this.forceGravity--
              
				if (this.yPos + this.height < height - floor.height)
					this.yPos -= this.forceGravity
              
				else 
				{
					this.grounded = true
				}
			},
      
		jump: function()
			{    
                if(!this.grounded)
                {
                  color(0)
                  circle(gameChar.xPos, gameChar.yPos, 10)
                }
              
				this.forceGravity = 15
				this.yPos -= this.forceGravity
				this.grounded = false
			},
      
		moveLeft: function() 
        { 
          this.xPos -= 4
        },
      
        moveRight: function() 
        { 
          this.xPos += 4
        },
      
        movement: function() 
        {
            if (!this.dead)
            {
                if (this.grounded && keyIsDown(32))
                    this.jump()
              
                if (keyIsDown(68))
                    this.moveRight()
              
					if (gameChar.xPos > 965)
						gameChar.xPos -= 5
              
                if (keyIsDown(65))
                    this.moveLeft()
              
					if (gameChar.xPos < 0)
						gameChar.xPos += 5
            }
        },
      
		canyonCheck: function()
        {
				if (this.grounded && canyon.danger.includes(gameChar.xPos))
					this.dead = true
		},
      
		deadAnimation: function()
        {
            if (this.dead)
            {
                if (this.yPos < height)
                    this.yPos -= this.forceGravity
              
                else
                {
                    this.yPos = height - floor.height - this.width
                    this.xPos = 500
                    this.grounded = true
                    this.dead = false
                }
            }
        }
	}
	
	canyon = {
		x: 130,
		y: 400,
		danger:[],
		numbers: function()
        {
			for (var i = this.x; i <= this.x + 90; i++)
            {
				this.danger.push(i)
			}
		},
      
		drawCanyon: function()
        {
			fill(110,64,9)
			rect(this.x, this.y, this.x , this.y - 70)
		}
	}
}


function draw()
{
	background(66,170,255)
	floor.drawFloor()
	canyon.drawCanyon()
	canyon.numbers()
	gameChar.drawCharacter()
	gameChar.gravity()
	gameChar.movement()
	gameChar.canyonCheck()
	gameChar.deadAnimation()
}
