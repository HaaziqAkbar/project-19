var jungle, jungleImg;
var player,playerImg;
var happywizard,happywizardImg,confusedwizard,confusedwizardImg;
var mwand,mwand2,mwandg,mwand2g,mwand2Img,mwandImg;
var score = 0;
var collect;
var gameover;
var gamestate = play;
var play;
var end;


function preload(){

     jungleImg = loadImage("jungle.png");
     playerImg = loadImage("wizard.png");
     happywizardImg = loadImage("happy wizard.png");
     confusedwizardImg = loadImage("confused wizard.png");
     mwandImg = loadImage("magic wand.png");
     mwand2Img = loadImage("magic wand.png");
     collect = loadSound("LKEA9GH-vibrant-game-checkpoint-reached-1.mp3");
     gameover = loadSound("UC3CKCR-game-over-a.mp3");
}

function setup() {
    createCanvas(1350,650);

     player = createSprite(200,350);
     player.scale = 2;
     player.addImage(playerImg);
     player.visible = true;

     

     confusedwizard = createSprite(400,400,);
     confusedwizard.scale = 2;
     confusedwizard.addImage(confusedwizardImg);
     confusedwizard.visible = false;

     happywizard = createSprite(400,400);
     happywizard.scale = 2;
     happywizard.addImage(happywizardImg);
     happywizard.visible = false;

     mwandg = new Group();
     mwand2g = new Group();

}

function draw() {
   background(180);

   if (gamestate === play){
    
    
    textSize(20);
    fill("orange");
    
    image(jungleImg,0,0,width,height);
 
      player.x = World.mouseX;
     
     edges = createEdgeSprites();
     player.collide(edges);
 
      
     
     var needed = 20;
     var rand = Math.round(random(1,2));
      
     if(frameCount % 50 == 0){
        if(rand == 1){
        createWand();
        }
       else{
           createwand2();
       }
     }
 
     if(player.isTouching(mwandg)){
       mwandg.destroyEach();
       score = score+1;
        collect.play();
     }
 
     if(player.isTouching(mwand2g)){
         mwand2g.destroyEach();
         score = score+2;
         collect.play();
       }
       if( score >= needed){
           gamestate === end;
           happywizard.visible = true;
           textSize(30);
           fill("orange");
        text("you have  collected  the needed magic wands",600,200);
        text("press space to restart",600,250);
          mwand2g.destroyEach();
          mwandg.destroyEach();
          gameover.play();          
    }     
    
   }

   if (gamestate === end){
       if(keyDown("SPACE")){
       reset();
   }
   player.destroy();

   }
 
   drawSprites();
   text("Score: " + score,10,50);
   text("Needed magic sticks:" + needed,200,50);
    

   }


function createWand(){

mwand = createSprite(random(1350,350),40,10,10);
mwand.addImage(mwandImg);
mwand.scale = 0.7;
mwand.velocityY = 4;
mwand.lifetime = 150;
mwand.depth = player.depth;
player.depth = player.depth -1;
mwandg.add(mwand); 

}

function createwand2(){

    mwand2 = createSprite(random(1350,350),40,10,10);
    mwand2.addImage(mwand2Img);
    mwand2.scale = 0.7;
    mwand2.velocityY = 5;
    mwand2.lifetime = 150;
    mwand2.depth = player.depth;
    player.depth = player.depth -1;
    mwand2g.add(mwand2);

    }


    function reset(){
    confusedwizard.visible = false;
    happywizard.visible = false;
    score = 0;
    mwandg.destroyEach();
    mwand2g.destroyEach();
    gamestate === play;
    }