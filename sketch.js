var bow , arrow,  scene;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;

var redB, greenB, blueB, pinkB, arrowGroup;

var score=0;

var arrowLag = 0;

var v = 0;

function preload(){
  
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  
}



function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
  score = 0    

  redB = createGroup();
  blueB = createGroup();
  greenB = createGroup();
  pinkB = createGroup();
  arrowGroup = createGroup();
}

function draw() {

  background(0);
  // moving ground
    scene.velocityX = -3 

    if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY
  
   // release arrow when space key is pressed
  if (keyDown("space") && arrowLag === 0) {
    arrowLag = 100;
    createArrow(); 
  }
   
  if(arrowLag>0){
    arrowLag--;
  }

  //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 50 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } 
    else if (select_balloon == 2) {
      greenBalloon();
    } 
    else if (select_balloon == 3) {
      blueBalloon();
    } 
    else {
      pinkBalloon();
    }
  }  

  drawSprites();
  text("Score: "+ score, 300,50);

  if(greenB.isTouching(arrowGroup)){
    arrowGroup.destroyEach();
    greenB.destroyEach();
    score+=5;
    arrowLag = 0;
    v = "green";
  }

  if(pinkB.isTouching(arrowGroup)){
    arrowGroup.destroyEach();
    pinkB.destroyEach();
    score+=1;
    arrowLag = 0;
    v = "pink";
  }

  if(blueB.isTouching(arrowGroup)){
    arrowGroup.destroyEach();
    blueB.destroyEach();
    score+=3;
    arrowLag = 0;
    v = "blue";
  }

  if(redB.isTouching(arrowGroup)){
    arrowGroup.destroyEach();
    redB.destroyEach();
    score+=3;
    arrowLag = 0;
    v = "red";
  }

  if(redB.isTouching(bow)){
    score-=10;
    redB.destroyEach();
    v = "-";
  }

  if(blueB.isTouching(bow)){
    score-=10;
    blueB.destroyEach();
    v = "-";
  }

  if(greenB.isTouching(bow)){
    score-=10;
    greenB.destroyEach();
    v = "-";
  }

  if(pinkB.isTouching(bow)){
    score-=10;
    pinkB.destroyEach();
    v = "-";
  }

  if(v === "-"){
    fill("black");
    text("-10",365,50);
  }

  if(v === "blue"){
    fill("blue");
    text("+3",365,50);
  }

  if(v === "green"){
    fill("green");
    text("+5",365,50);
  }

  if(v === "pink"){
    fill("pink");
    text("+1",365,50);
  }

  if(v === "red"){
    fill("red");
    text("+3",365,50);
  }

}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -8;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
}

function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = random(4,8);
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);  
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = random(5,7);
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = random(7,9);
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = random(5,6);
  pink.lifetime = 150;
  pink.scale = 1
  pinkB.add(pink);
}
