var bg,bgImg;
var player, shooterw, shooterq;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var gameState = "fight"
var zombieGroup;
var bullet_g
var score
var life = 3
var bullet
var bulletImg


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  
  
  shooterq = loadImage("assets/shooter_q.png")
  shooterw = loadImage("assets/shooter_w.png")
  bulletImg = loadImage("bullet.png")
  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/Bg_img.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterq)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    zombieGroup = new Group();
    bullet_g = new Group();
  
}

function draw() {
  background(0); 

  if(gameState === "fight"){
    if(life ===3){
      heart3.visible=true
      heart2.visible=false
      heart1.visible=false
    }
  
    if(life ===2){
      heart3.visible=false
      heart2.visible=true
      heart1.visible=false
    }
  
    if(life ===1){
      heart3.visible=false
      heart2.visible=false
      heart1.visible=true
    }


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-60,20,10)
  bullet.addImage(bulletImg)
  bullet.velocityX = 20
  bullet_g.add(bullet)
  bullet.scale = 0.25
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooterw)
  
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterq)
}

if(zombieGroup.isTouching(bullet_g)){
  for(var i = 0;i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(bullet_g)){
      zombieGroup[i].destroy()
      bullet_g.destroyEach()
    }
  }
}

//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       } 
 }
}

//calling the function to spawn zombies
enemy();

drawSprites();
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.2
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}}
