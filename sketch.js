  var trex ,trex_running;
  var        ground,groundimage,rno,cloudimage,obstacle1,obstacle2,obstacle3,obstacle4,  obstacle5,obstacle6,trexstop,restart,restartimage,restarterimage,restarter1,sound1,sound2,sound3
  var scores=0;
var play=1;
var end=0;
 var gamestate=play;
  var obstaclegroup,cloudgroup
  function preload()
  {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  groundimage= loadImage("ground2.png");
  
  cloudimage=loadImage("cloud.png");
  
  trexstop=loadImage("trex_collided.png");
  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  
  restartimage=loadImage("gameOver.png");
  restarterimage=loadImage("restart.png");
    
  sound1=loadSound("jump.mp3");
  sound2=loadSound("die.mp3");
  sound3=loadSound("checkPoint.mp3");  
    
  }

  function spawnclouds()
  {
  if(frameCount%80==0){
  rno=Math.round(random(20,120));    
    
  var clouds=createSprite(550,rno);
  clouds.addImage("cloud",cloudimage);
  clouds.velocityX=-5;
    
  trex.depth=clouds.depth+1;
    
  clouds.lifetime=130;
    
  cloudgroup.add(clouds);
  }
  }

  function spawnObstacles()
  {
  if(frameCount%100==0)
  {
  var obstacle=createSprite(width,height-75);
  obstacle.velocityX=-5-scores/40;
  console.log(obstacle.velocityX);  
  obstacle.lifetime=130;
    
  obstaclegroup.add(obstacle);
    
  var cactus=Math.round(random(1,6));
    
  switch(cactus)
  {
  case 1:obstacle.addImage("obstacle1",obstacle1);
  obstacle.scale=0.4;
  break
        
  case 2:obstacle.addImage("obstacle2",obstacle2);
  obstacle.scale=0.4;
  break
        
  case 3:obstacle.addImage("obstacle3",obstacle3);
  obstacle.scale=0.4;
  break
        
  case 4:obstacle.addImage("obstacle4",obstacle4);
  obstacle.scale=0.4;
  break
        
  case 5:obstacle.addImage("obstacle5",obstacle5);
  obstacle.scale=0.4;
  break
        
  case 6:obstacle.addImage("obstacle6",obstacle6);
  obstacle.scale=0.3;
  break
  }
  }
  }

  function setup()
  {
  
  createCanvas(windowWidth,windowHeight)
  
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale=0.5;
  trex.addImage("trex_collided",trexstop);
  
  ground=createSprite(200,height-60,40,30);
  ground.addImage("groundimage",groundimage);
  ground.velocityX=-5
  
  obstaclegroup=new Group();
  
  cloudgroup=new Group();
  
  restart=createSprite(width/2-30,height/2-50);
  restart.addImage("gameOver",restartimage);
  
  restarter1=createSprite(width/2,height/2);
  restarter1.addImage("restarter",restarterimage);
    restarter1.scale=0.5;
  }

  function draw()
  {
    
  background("white")
  
  drawSprites();
    
  console.log(trex.y);  
  
  trex.collide(ground);
  if(ground.x<-500)
  {
  ground.x=200;
  }

  if(gamestate){
  trex.velocityY=trex.velocityY+0.8;
  if(touches.length>0||keyDown("space")&&trex.y>height-120)
  { 
  trex.velocityY=-10;

  touches=[];  
    
  sound1.play();
  }
    
  if(keyDown("left")){
    trex.x=trex.x-5;
  }

  if(keyDown("right")){
    trex.x+=5;
  }

camera.position.x=trex.x;

  if(scores>localStorage["hi"]){
    localStorage["hi"]=scores;
  }  
    text("hi score: "+localStorage["hi"],350,40 );
  trex.changeAnimation("running", trex_running);
    
  ground.velocityX=ground.velocityX-0.05;  
    
  scores=scores+Math.round(frameRate()/60.1);
  if(scores%100==0){
      sound3.play();
  }
    
  spawnclouds();
    
  spawnObstacles();
    
  restart.visible=false;
    
  restarter1.visible=false;
    
  }
    
  else{
  ground.velocityX=0;
    
  obstaclegroup.setVelocityXEach(0);
  obstaclegroup.setLifetimeEach(20);
    
  cloudgroup.setVelocityXEach(0);
  cloudgroup.setLifetimeEach(20);
    
  trex.changeAnimation("trex_collided",trexstop);
  
  restart.visible=true;
    
  restarter1.visible=true;
    
  if(mousePressedOver(restarter1))
  {
  gamestart();
  }
  trex.velocityY=0;
  }
    
  if(trex.isTouching(obstaclegroup)){
    gamestate=end;
  }  
    
  text("score: "+scores,380,30);
  }
  
  function gamestart()
  {
  gamestate=play;
      
  obstaclegroup.destroyEach();
      
  cloudgroup.destroyEach();
      
  scores=0;
  }