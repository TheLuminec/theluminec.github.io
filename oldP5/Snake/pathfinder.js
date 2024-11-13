class Pathfinder{
  constructor(x,y,fX,fY,i,preI,dir_){
    this.x = x;
    this.y = y;
    this.fX = fX;
    this.fY = fY;
    this.n = true;
    this.num = i;
    this.preNum = preI;
    this.hit = false;
    this.dir = dir_;
    if(x == goingX && y == goingY){
      this.hit = true;
    }
  }

  show(){
    push()
    fill(255,0,0);
    stroke(255,0,0);
    strokeWeight(2);
    //rect(this.x+(scl/4),this.y+(scl/4),scl/2,scl/2);
    line(this.fX+(scl/2),this.fY+(scl/2),this.x+(scl/2),this.y+(scl/2));
    pop()
  }

}

var goingX;
var goingY;
var startX;
var startY;
var paths = [];
var truePath = [];


function tracePath(id){
  let tmpPath = [];
  let traceNum = id;
  tmpPath.push(paths[traceNum])
  while(true){
    traceNum = paths[traceNum].preNum;
    if(traceNum == null){
      break;
    }
    else{
      tmpPath.push(paths[traceNum])
    }
  }
  return tmpPath;
}

function generateNew(){
  let length = paths.length;
  let gotHit = false;
  for(var i=0; i<length; i++){
    if(paths[i].hit){
      gotHit = true;
      break;
    }
    if(paths[i].n){
      paths[i].n = false;
      if(checkCollidePath(i, paths[i].x, paths[i].y+scl) && checkCollideWall(paths[i].x, paths[i].y+scl)){
        paths.push(new Pathfinder(paths[i].x, paths[i].y+scl, paths[i].x, paths[i].y, paths.length,i,2));
        pLen++;
      }
      if(checkCollidePath(i, paths[i].x+scl, paths[i].y) && checkCollideWall(paths[i].x+scl, paths[i].y)){
        paths.push(new Pathfinder(paths[i].x+scl, paths[i].y, paths[i].x, paths[i].y, paths.length,i,1));
        pLen++;
      }
      if(checkCollidePath(i, paths[i].x, paths[i].y-scl) && checkCollideWall(paths[i].x, paths[i].y-scl)){
        paths.push(new Pathfinder(paths[i].x, paths[i].y-scl, paths[i].x, paths[i].y, paths.length,i,0));
        pLen++;
      }
      if(checkCollidePath(i, paths[i].x-scl, paths[i].y) && checkCollideWall(paths[i].x-scl, paths[i].y)){
        paths.push(new Pathfinder(paths[i].x-scl, paths[i].y, paths[i].x, paths[i].y, paths.length,i,3));
        pLen++;
      }
    }
  }
  if(gotHit){
    for(var i=0; i<length; i++){
      paths[i].n = false;
    }
  }
}

function checkCollideWall(x,y){
  for(var i=0; i<snake.size; i++){
    if(x >= snake.blocks[i].x && x < snake.blocks[i].x+scl-1 && y >= snake.blocks[i].y && y < snake.blocks[i].y+scl-1){
      return false;
    }
    if(x < 0 || x > width || y < 0 || y > height){
      return false;
    }
  }
  return true;
}

function checkCollidePath(id,x,y){
  for(var i=0; i<paths.length; i++){
    if(i != id){
      if(x == paths[i].x && y == paths[i].y){
        return false;
        break;
      }
    }
  }
  return true;
}
