class Tile{
  constructor(x,y,num){
    this.x = x;
    this.y = y;
    this.num = num;
  }

  show(){
    let p = 0;
    if(this.num != 2){
      for(var i=1; i<32; i++){
        if(this.num/2 == 2*i){
          p = i;
          break;
        }
      }
      fill(tileColors[p]);
    }
    else{
      fill(tileColors[0]);
    }
    rect((this.x)+10,(this.y)+10,scl-20,scl-20);
    fill(0);
    textAlign(CENTER);
    textSize(32);
    text(this.num,(this.x)+scl/2,(this.y)+scl/2+10);
  }

}

