var dog, happyDog, database, foodStock;
var dogS, dogS2;
var foodS=20;

function preload()
{
  dog=loadImage("images/dogImg.png");
  dog2=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dogS=createSprite(250, 250);
  dogS.addAnimation("dog", dog);
  dogS.addAnimation("happy dog", dog2);
  dogS.scale=0.1;
  database=firebase.database();
  foodStock=database.ref("food");
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)&&foodS>0){
    foodS-=1;
    writeStock(foodS);
    dogS.changeAnimation("happy dog", dog2);
  }
  drawSprites();
  textSize(20);
  fill("black");
  stroke("white");
  text("FOOD LEFT: " +foodS, 200, 150);
  textSize(20);
  fill("black");
  stroke("white");
  text("Press up arrow to feed :)", 250, 200);
  //add styles here

}
function readStock(data){
   foodS=data.val();
}
function writeStock(x){
  database.ref('/').update({
    food:x
  })
}

