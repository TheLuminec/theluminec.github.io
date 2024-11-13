var sugars = [];
var objects = [];
var sugarAmount = 1000;
var size = 2;
var selected = "Block";
var mouseDownSugar = false;
var buttons = [];

function setup(){
  createCanvas(800,800);
  for(var i=0; i<sugarAmount; i++){
    sugars.push(new Sugar(floor(random((width/2)-50, (width/2)+50)),floor(random(0, height-200)),i));
  }
  objects.push(new ObjectRect(0,height-50,width,30,objects.length));
  buttons.push(new Button("Block",width-100,15,85,50,buttons.length,true));
  buttons.push(new Button("Sugar",width-100,85,85,50,buttons.length,true));
}

function draw(){
  background(51);
  if(selected == "Sugar" && mouseDownSugar){
    sugars.push(new Sugar(floor(mouseX),floor(mouseY),sugars.length));
  }
  for(var i=0; i<sugars.length; i++) {
    sugars[i].update();
    sugars[i].show();
  }
  for(var i=0; i<objects.length; i++) {
    objects[i].show();
  }
  for(var i=0; i<buttons.length; i++) {
    if(buttons[i].showing){
      if(selected == buttons[i].name){
        buttons[i].selected = true;
      }
      else{
        buttons[i].selected = false;
      }
      buttons[i].show();
    }
  }
}

function mouseDragged(){
  if(selected == "Block"){
    objects.push(new ObjectRect(mouseX,mouseY,5,5,objects.length));
  }
  if(selected == "Sugar"){
    sugars.push(new Sugar(floor(mouseX),floor(mouseY),sugars.length));
  }
}

function mousePressed(){
  if(selected == "Block"){
    objects.push(new ObjectRect(mouseX,mouseY,5,5,objects.length));
  }
  if(selected == "Sugar"){
    mouseDownSugar = true;
  }
  for(var i=0; i<buttons.length; i++){
    if(mouseX > buttons[i].x && mouseX < buttons[i].x + buttons[i].width && buttons[i].y < mouseY && buttons[i].y + buttons[i].height > mouseY){
      buttons[i].clicked();
    }
  }
}

function mouseReleased(){
  if(selected == "Sugar"){
    mouseDownSugar = false;
  }
}

function CollideRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  var rect1 = {x: x1, y: y1, width: w1, height: h1}
  var rect2 = {x: x2, y: y2, width: w2, height: h2}

  return (rect1.x < rect2.x + rect2.width &&
     rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height &&
     rect1.y + rect1.height > rect2.y);
}

function CollideSugarY(x1,y1,x2,y2,dirX,dirY){
  if(y1+dirY == y2 && x1 == x2){
    return true;
  }
}

function CollideSugarX(x1,y1,x2,y2,dirX,dirY){
  if(x1+dirX == x2 && y1 == y2){
    return true;
  }
}
