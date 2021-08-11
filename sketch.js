//                       ASURA MARDAN
//                        Level:- 3
//                    Killing of Ravana
//                      Good Over Evil

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var arrow, arrowImage;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score = 0;
var jumpSound, collidedSound;

var gameOver, restart, levelNo, instruction, asuraMardan;

var gameWon, nextLevel;


 function preload() {
  jumpSound = loadSound("assets/sounds/jump.wav")
  collidedSound = loadSound("assets/sounds/collided.wav")

  backgroundImg = loadImage("assets/background.jpg")
 

  trex_running = loadAnimation("assets/ramji.png");


  obstacle1 = loadImage("assets/ravan.png");
  obstacle2 = loadImage("assets/ravan.png");
  obstacle3 = loadImage("assets/ravan.png");
  obstacle4 = loadImage("assets/ravan.png");

  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  arrowImage = loadImage("assets/ARROW (2).png");

  levelNoImg = loadImage("assets/l3.png");

  instructionImg = loadImage("assets/instruction.png");

  gameWonImg = loadImage("assets/youWon.png");
  nextLevelImg = loadImage("assets/nextLevel.png");

  asuraMardanImg = loadImage("assets/asuraMardan.png");
}

function setup() {
  createCanvas(1360,600);

  asuraMardan= createSprite(430,40);
  asuraMardan.addImage(asuraMardanImg);
  asuraMardan.scale=0.2;

  trex = createSprite(180, 491);
  trex.addAnimation("running", trex_running);
  //trex.debug=true
  trex.setCollider('rectangle', 0, 0, 1500,2500)
  trex.scale = 0.1;

  invisibleGround = createSprite(149, 510, 20000, 10);
  invisibleGround.visible=false;

  ground = createSprite(115, 513,80000,0.1);
  
  obstacle = createSprite(875,290);
  obstacle.addImage(obstacle1);
  obstacle.scale=0.16;
  
  gameOver = createSprite(683,250);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(680,315);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.09;
  restart.scale = 0.09;

  gameOver.visible = false;
  restart.visible = false;
  

  gameWon = createSprite(683, 250);
  gameWon.addImage(gameWonImg);
  gameWon.scale = 0.37;
  gameWon.visible = false;

  nextLevel = createSprite(680,315);
  nextLevel.addImage(nextLevelImg);
  nextLevel.scale = 0.15;
  nextLevel.visible = false;

  levelNo = createSprite(830,45);
  levelNo.addImage(levelNoImg);
  levelNo.scale=0.15;

  instruction= createSprite(1150,55);
  instruction.addImage(instructionImg);
  instruction.scale=0.19;


1087,461
  // invisibleGround.visible =false
  obstaclesGroup = new Group();
 
  score = 0;
  arrowGroup= new Group();
}

function draw() {
  //trex.debug = true;
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: " + score, 30, 50);
  text(mouseX + ',' + mouseY, 33, 23);
  text.shapeColor=("white");
  
   trex.y=World.mouseY;

  if (gameState === PLAY) {
    
  // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
  }

  if ((arrowGroup.x>860 && arrowGroup.x<870)&&(arrowGroup.y==240))  {
    obstaclesGroup.destroyEach();
    arrowGroup.destroyEach();
      score=score+1;
  }
//868,240
    score = score + Math.round(getFrameRate() / 60);

    //trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    trex.collide(invisibleGround);
    

    if (obstaclesGroup.isTouching(trex)) {
      collidedSound.play()


      
      gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)) {
      reset();
    }
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
  
    obstaclesGroup.destroyEach();
  }

  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(1300, 370);
    obstacle.setCollider('circle', 0, 0, 100)
    obstacle.debug = true;
    
    //obstacle.velocityX = -(6 + 16 * score / 100);

    //generate random obstacles
    
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.13;
    obstacle.lifetime = 500;
    obstacle.depth = trex.depth;
    trex.depth += 1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }


// Creating  arrows for bow
function createArrow() {
  var arrow= createSprite(250, 367, 60, 10);
  arrow.addImage(arrowImage);
  //arrow.y=bow.y;
  arrow.velocityX = 10;
  arrow.y=trex.y-80;
  arrow.lifetime = 500;
  arrow.scale = 0.07;
  arrowGroup.add(arrow);
   
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  score = 0;

}
