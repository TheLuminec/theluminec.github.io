class ObjectRect{
  constructor(x,y,w,h,i){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.num = i;

  }

  show(){
    fill(0);
    noStroke();
    rect(this.x,this.y,this.width,this.height);
  }

}