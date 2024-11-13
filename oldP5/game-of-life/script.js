var size = 10;
var points = [];
var go = false;

function setup(){
  createCanvas(800, 800);
  for(var i=0; i<width/size; i++){
    for(var j=0; j<height/size; j++){
      points.push(new Point(i*size, j*size, points.length,false));
    }
  }
}

function draw(){
  background(51);
  grid();
  for(var i=0; i<points.length; i++){
    if(points[i].alive){
      points[i].show();
    }
  }
  if(go){
    update();
  }
}

function grid(){
  for(var i=0; i<width/size; i++){
    line(i*size, 0, i*size, height);
  }
  for(var i=0; i<width/size; i++){
    line(0, i*size, width, i*size);
  }
}

function update(){
  for(var i=0; i<points.length; i++){
    points[i].checkLife();
  }
  for(var i=0; i<points.length; i++){
    if(!points[i].alive && points[i].revive){
      points[i].alive = true;
      points[i].revive = false;
    }
    else if(points[i].alive && points[i].goingToDie){
      points[i].alive = false;
      points[i].goingToDie = false;
    }
  }
}

function keyPressed(){
  if(keyCode == 32){
    go = true;
  }
}

function keyReleased(){
  if(keyCode == 32){
    go = false;
  }
}

function mouseClicked(){
  var tmpX = (floor(mouseX/size))*size;
  var tmpY = (floor(mouseY/size))*size;
  for(var i=0; i<points.length; i++){
    if(tmpX == points[i].x && tmpY == points[i].y && !points[i].alive){
      points[i].alive = true;
      break;
    }
    else if(tmpX == points[i].x && tmpY == points[i].y && points[i].alive){
      points[i].alive = false;
      break;
    }
  }
}

function mouseDragged(){
  var tmpX = (floor(mouseX/size))*size;
  var tmpY = (floor(mouseY/size))*size;
  for(var i=0; i<points.length; i++){
    if(tmpX == points[i].x && tmpY == points[i].y && !points[i].alive){
      points[i].alive = true;
      break;
    }
  }
}
