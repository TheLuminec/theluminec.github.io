class Sugar{
  constructor(x,y,i){
    this.x = x;
    this.y = y;
    this.dirX = 0;
    this.dirY = 0;
    this.num = i;
    this.gravity = 1;
    this.hitSugar = false;

  }

  update(){
    this.dirY = this.gravity;
    this.dirX = 0;
    this.hitSugar = false;
    this.checkObjectCollide();
    this.checkSugarCollide();
    if(this.hitSugar){
      this.dirX = round(random(-1,1));
      this.checkObjectCollide();
      this.checkSugarCollide();
    }
    this.x += this.dirX;
    this.y += this.dirY;
  }

  checkObjectCollide(){
    for(var i=0; i<objects.length; i++){
      if(CollideRect(this.x,this.y,size,size,objects[i].x,objects[i].y,objects[i].width,objects[i].height)){
        this.dirY = 0;
        this.dirX = 0;
      }
    }
  }
  checkSugarCollide(){
    for(var i=0; i<sugars.length; i++){
      if(CollideSugarY(this.x,this.y,sugars[i].x,sugars[i].y,this.dirX,this.dirY)){
        this.dirY = 0;
        this.hitSugar = true;
      }
      if(CollideSugarX(this.x,this.y,sugars[i].x,sugars[i].y,this.dirX,this.dirY)){
        this.dirX = 0;
        this.hitSugar = true;
      }
    }
  }

  show(){
    stroke(255);
    point(this.x,this.y);
  }
}