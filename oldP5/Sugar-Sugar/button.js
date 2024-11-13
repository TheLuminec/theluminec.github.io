class Button{
  constructor(name,x,y,w,h,i,s){
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.num = i;
    this.showing = s;
    this.selected = false;

  }

  clicked(){
    if(selected != this.name){
      selected = this.name;
    }
    else if(selected == this.name){
      selected = null;
    }
  }

  show(){
    if(this.selected){
      fill(100);
    }
    else{
      fill(200);
    }
    rect(this.x,this.y,this.width,this.height);
    fill(0);
    textSize(32);
    text(this.name,this.x,this.y+(this.height/2)+12);
  }

}