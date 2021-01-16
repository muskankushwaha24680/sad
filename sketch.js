//Create variables here
var dog , dogImg , happydogImg , database , foodS , foodStock ;
var FeedDog , AddFood ;
var fedTime , lastFed ;
var foodObj ;

function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  happydogImg = loadImage("happydog.png");
}

function setup() {
  createCanvas(800, 500);
  
  dog = createSprite(700,260,40,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodObj = new Food();

  feed = createButton("Feed The Dog");
  feed.position(700,95);
feed.mousePressed(FeedDog);

addFood = createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(AddFood);

  database = firebase.database();
  
 
}


function draw() {  
background(46,139,87);

foodObj.display();



fill(225,225,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed: " + lastFed%12 + "PM" ,350 , 30);
  }

  else if(lastFed===0){
    text("Last Feed: 12 AM" ,350,30 );
  }
  else{
    text("Last Feed: " + lastFed + " AM" ,350,30);
  }

  fedTime = database.ref('Feed Time');
  fedTime.on("value" , function(data){
    lastFed = data.val();
  })

 
  drawSprites();
  
  
  //add styles here
 
 // feedDog();
 // addFoods();
}


function feedDog(){

  dog.addImage(happydogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
   FeedTime: hour()
  })
}

function addFoods(){

  foodS++;
  database.ref('/').update({
    Food: foodS
  
  })
 

}