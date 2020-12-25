var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstaclesGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  canvas = createCanvas(400,400);
  
  monkey = createSprite(50,380,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(200,380,800,5);
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}


function draw() {
  background(255);
  text("Survival Time: "+ score, 200,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -5;
  
    if(keyDown("space") && monkey.y >= 345) {
      monkey.velocityY = -20;
    }
  
    monkey.velocityY = monkey.velocityY + 1;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
  
}

function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    banana = createSprite(400,120,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 160;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    foodGroup.add(banana);
  } 
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400,355,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale = 0.125;
    
     //assign lifetime to the variable
    obstacle.lifetime = 160;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    obstaclesGroup.add(obstacle);
  } 
}