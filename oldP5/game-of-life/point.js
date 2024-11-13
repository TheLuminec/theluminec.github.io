class Point{
  constructor(x,y,id,alive){
    this.x = x;
    this.y = y;
    this.id = id;
    this.goingToDie = false;
    this.revive = false;
    this.alive = alive;
  }

  checkLife(){
    var nextTo = 0;
    for(var i=0; i<points.length-1; i++){
      if(this.id != i && points[i].alive){
        if(points[i].x >= this.x-size && points[i].y >= this.y-size && points[i].x <= this.x+size && points[i].y <= this.y+size){
          nextTo++;
        }
      }
    }
    if(nextTo != 2 && nextTo != 3 && this.alive){
      this.goingToDie = true;
    }
    if(!this.alive){
      if(nextTo == 3){
        this.revive = true;
      }
    }
  }

  show(){
    fill(255);
    rect(this.x,this.y,size,size);
  }

}


