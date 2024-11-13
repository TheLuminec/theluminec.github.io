var snake;
var scl = 20;
var widthNum = null;
var heightNum = null;
var food;
var dir = 1;
var preDir = 1;
var auto = false;
var finding = true;
var score = 0;
var pLen = 0;

function setup(){
  createCanvas(window.innerWidth,window.innerHeight).parent("gameDiv");

  snake = new Snake(10*scl,10*scl,3);
  food = createVector(floor(random(0,width)/scl)*scl,floor(random(0,height)/scl)*scl);
  widthNum = width/scl;
  heightNum = height/scl;
  background(51);

  makeManual();
}

function makeAuto() {
  auto = true;
  finding = true;
  frameRate(Infinity);
  startX = snake.x;
  startY = snake.y;
  goingX = food.x;
  goingY = food.y;
  paths = [];
  truePath = [];
  paths.push(new Pathfinder(startX, startY, startX, startY, 0, null, dir));
  generateNew();
}

function makeManual() {
  frameRate(15);
  auto = false;
  finding = false;
}

function draw(){
  if(!finding){
    background(51);
    Grid();
    if(auto){
      for(var i=0; i<truePath.length; i++){
        if(snake.x == truePath[i].x && snake.y == truePath[i].y){
          dir = truePath[i-1].dir;
        }
      } 
    }
    //snake.grow();
    snake.show();
    snake.move(dir);
    fill(255,0,0);
    rect(food.x,food.y,scl,scl);
    if(snake.x == food.x && snake.y == food.y){
      snake.grow();
      food = setFood();
      if(auto){
        startX = snake.x;
        startY = snake.y;
        goingX = food.x;
        goingY = food.y;
        paths = [];
        truePath = [];
        finding = true;
        score++;
        pLen = 0;
        paths.push(new Pathfinder(startX, startY, startX, startY, 0, null, dir));
        generateNew();
      }
    }
    snake.hitSelf();
    if(snake.x > width || snake.x <0 || snake.y<0 || snake.y > height){
      snake.kill();
    }
    if(truePath != undefined && auto){
      for(var i=0; i<truePath.length; i++){
          push()
          stroke(0,255,0);
          strokeWeight(3);
          line(truePath[i].fX+(scl/2),truePath[i].fY+(scl/2),truePath[i].x+(scl/2),truePath[i].y+(scl/2));
          pop()
        }
    }
  }
  else{
    generateNew();
    for(var i=0; i<paths.length; i++){
      paths[i].show();
      if(paths[i].n){
        break;
      }
      else if(i == paths.length-1){
        for(var a=0; a<paths.length; a++){
          if(paths[a].hit){
            truePath = tracePath(a);
            paths = [];
            finding = false;
            break;
          }
        }
      }
    }
    fill(255,0,0);
    rect(food.x,food.y,scl,scl);
  }
}

function Grid(){
  for(var i=0; i<width; i+=scl){
    stroke(255);
    line(i,0,i,height);
  }
  for(var i=0; i<height; i+=scl){
    stroke(255);
    line(0,i,width,i);
  }
}

function setFood(){
  let foodPos;
  while(true){
    foodPos = createVector(floor(random(0,width)/scl)*scl,floor(random(0,height)/scl)*scl);
    let foodG = true;
    for(var i=0; i<snake.size; i++){
      if(foodPos.x == snake.blocks[i].x && foodPos.y == snake.blocks[i].y){
        foodG = false;
        break;
      }
    }
    if(foodG){
      break;
    }
  }
  return foodPos;
}

function keyPressed(){
  let newDir = dir;
  if(keyCode == 32) {
    if(auto) {
      makeManual();
    }
    else {
      makeAuto();
    }
  }
  else if(keyCode == UP_ARROW){
    newDir = 0;
  }
  else if(keyCode == RIGHT_ARROW){
    newDir = 1;
  }
  else if(keyCode == DOWN_ARROW){
    newDir = 2;
  }
  else if(keyCode == LEFT_ARROW){
    newDir = 3;
  }
  if(dir != newDir){
    preDir = dir;
    dir = newDir;
  }
}
