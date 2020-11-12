var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage,ground2;
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime=0;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkeyMoving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite (400,350,900,10);
  ground.velocityX=-(4+3*score/10);
  ground.x=ground.width/2;
  
  obstacleGroup=new Group();
  
  bananaGroup=new Group();
}


function draw() {
  background("lightblue");
  
  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survivial Time "+ survivalTime, 100,50);
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   obstacles();
  
   banana();
  
   if (keyDown("Space")&&monkey.y>=200){
     monkey.velocityY=-12;
   }
  
  monkey.velocityY=monkey.velocityY+0.8;
    
   if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score=score+2;
    switch(score){
      case 10:monkey.scale=0.12;
      break;
      case 20:monkey.scale=0.14;
      break;
      case 30:monkey.scale=0.16;
      break;
      case 40:monkey.scale=0.18;
      break;
      default:break;
    }
   }
  
  if (obstacleGroup.isTouching(monkey)){
     monkey.scale=0.1;
  }
 drawSprites(); 
}

function obstacles(){
  if (frameCount%300===0){
    obstacle=createSprite(600,325,10,40);
    obstacle.velocityX=-4;
    obstacle.addImage("obstacles",obstacleImage);
    obstacle.scale=0.1;
    obstacle.lifetime=160;
    obstacleGroup.add(obstacle);
  }
}

function banana(){
   if (frameCount%80===0){
    var fruitBanana=createSprite(350,Math.round(random(120,200)),10,10);
     fruitBanana.addImage("banana",bananaImage);
     fruitBanana.scale=0.1;
     fruitBanana.velocityX=-(4+3*score/100);
     fruitBanana.lifetime=160;
     bananaGroup.add(fruitBanana);
   }
}