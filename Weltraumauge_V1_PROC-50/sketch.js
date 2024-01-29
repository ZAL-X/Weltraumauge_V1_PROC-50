var ship,shipImg;
var boss, bossImg;
var wall1, wall2;
var bullet1,bullet1Img,bullet1Group;
var bossLife=2300;
var timeShot=5;
var gameState=1;
var END=0, SERVE=1, PLAY=2

function preload(){
  shipImg=loadImage("ship.png")
  bossImg=loadImage("boss.png")
  bullet1Img=loadImage("red_bullet.png")
}
  
function setup() {
  createCanvas(1000,500);
  ship=createSprite(400, 400, 50, 50);
  ship.addImage(shipImg)
  ship.debug=true
  
  ship.scale=0.3

  boss=createSprite(900, 250, 50, 50);
  boss.addImage(bossImg)
  boss.debug=true
  boss.setCollider("circle",100,0,100)
  boss.scale=0.6

  wall1=createSprite(1000,400,200,20)
  wall1.visible=false
  wall2=createSprite(1000,100,200,20)
  wall2.visible=false

  bullet1Group = new Group()
}

function draw() {
  background("gray");  
  if (gameState===SERVE) {
    if (keyDown("space")) {
      boss.velocityY=2
      gameState=PLAY
    }
  }

  if (gameState===PLAY) {
    ShotBullets()
    keyMove()
    if (bossLife==0) {
      gameState=END
    }
  }
 
  if (gameState===END) {
    
  }

  drawSprites();
  fill("white")
  text("vida: "+bossLife,700,50)
  text("count: "+timeShot,700,450)
}

function ShotBullets() {
  if (timeShot<10) {
    timeShot+=Math.round(getFrameRate()/60);
  }

  if(boss.isTouching(bullet1Group)){
  for(var i=0;i<bullet1Group.length;i++){     
   if(boss.isTouching(bullet1Group)){
        bullet1Group[i].destroy();
        bossLife-=10
    }
  }
}

  if (timeShot>5) {
    if (keyDown("space")) {
        bullet1 = createSprite(ship.x,ship.y,20,10)
        bullet1.addImage(bullet1Img)
        bullet1.scale=0.2
        bullet1.velocityX = 20
        bullet1.lifetime=50
        bullet1Group.add(bullet1)
        timeShot=0
    }
  }
}

  function keyMove() {
   if (keyDown("w")) {
    ship.y-=10
  }
   if (keyDown("a")) {
    ship.x-=10
  }
   if (keyDown("s")) {
     ship.y+=10
  }
   if (keyDown("d")) {
     ship.x+=10
  }
   if (boss.collide(wall1)) {
     boss.velocityY-=2
  }
   if (boss.collide(wall2)) {
     boss.velocityY+=2
  }
}
