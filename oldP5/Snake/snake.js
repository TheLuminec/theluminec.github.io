class Snake{
  constructor(x,y,size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.blocks = [
      {x:x-scl,y:y},
      {x:x-scl-scl,y:y},
      {x:x-scl-scl-scl,y:y}
    ];
    this.lastPos = createVector(x-(scl*4),y);
  }

  grow(){
    this.blocks.push({x:this.lastPos.x,y:this.lastPos.y});
    this.size ++;
  }

  hitSelf(){
    for(var i=0; i<this.size; i++){
      if(this.blocks[i].x == this.x && this.blocks[i].y == this.y){
        this.kill();
        break;
      }
    }
  }

  kill(){
    let x = 10*scl;
    let y = 10*scl;
    this.x = x;
    this.y = y;
    this.blocks = [
      {x:x-scl,y:y},
      {x:x-scl-scl,y:y},
      {x:x-scl-scl-scl,y:y}
    ];
    console.log(score);
    score = 0;
    this.size = 3;
    dir = 1;
  }

  move(dir){
    if(dir == 0){
      if(this.blocks[0].x != this.x || this.blocks[0].y != this.y-scl){
        this.lastPos = this.blocks[this.size-1];
        for(var i=this.size-1; i>0; i--){
          this.blocks[i].x = this.blocks[i-1].x;
          this.blocks[i].y = this.blocks[i-1].y;
        }
        this.blocks[0].x = this.x;
        this.blocks[0].y = this.y;
        this.y -= scl;
      }
      else{
        dir = preDir;
        this.move(dir);
      }
    }
    if(dir == 1){
      if(this.blocks[0].x != this.x+scl || this.blocks[0].y != this.y){
        this.lastPos = this.blocks[this.size-1];
        for(var i=this.size-1; i>0; i--){
          this.blocks[i].x = this.blocks[i-1].x;
          this.blocks[i].y = this.blocks[i-1].y;
        }
        this.blocks[0].x = this.x;
        this.blocks[0].y = this.y;
        this.x += scl;
      }
      else{
        dir = preDir;
        this.move(dir);
      }
    }
    if(dir == 2){
      if(this.blocks[0].x != this.x || this.blocks[0].y != this.y+scl){
        this.lastPos = this.blocks[this.size-1];
        for(var i=this.size-1; i>0; i--){
          this.blocks[i].x = this.blocks[i-1].x;
          this.blocks[i].y = this.blocks[i-1].y;
        }
        this.blocks[0].x = this.x;
        this.blocks[0].y = this.y;
        this.y += scl;
      }
      else{
        dir = preDir;
        this.move(dir);
      }
    }
    if(dir == 3){
      if(this.blocks[0].x != this.x-scl || this.blocks[0].y != this.y){
        this.lastPos = this.blocks[this.size-1];
        for(var i=this.size-1; i>0; i--){
          this.blocks[i].x = this.blocks[i-1].x;
          this.blocks[i].y = this.blocks[i-1].y;
        }
        this.blocks[0].x = this.x;
        this.blocks[0].y = this.y;
        this.x -= scl;
      }
      else{
        dir = preDir;
        this.move(dir);
      }
    }
  }

  show(){
    stroke(0);
    fill(255);
    rect(this.x,this.y,scl,scl);
    for(var i=0; i<this.size; i++){
      rect(this.blocks[i].x,this.blocks[i].y,scl,scl);
    }
  }

}
