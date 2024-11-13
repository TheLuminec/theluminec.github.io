class Pathfinder{
  constructor(x,y,fX,fY,i,preI){
    this.x = x;
    this.y = y;
    this.fX = fX;
    this.fY = fY;
    this.n = true;
    this.num = i;
    this.preNum = preI;
    this.hit = false;
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

