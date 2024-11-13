var scl = 150;
var tiles = [];
var spawnAble = [2,4];
var tileColors = [];
var tilesCNum = 30;
var high = 0;
var failed = false;

function setup(){
  createCanvas(600,600).parent("gameCanvas");
  for(var i=0; i<tilesCNum; i++){
    tileColors.push([random(0,256),random(0,256),random(0,256)]);
  }
  tiles.push(new Tile(0,0,2));
}

function draw(){
  background(175);
  board();
  for(var i=0; i<tiles.length; i++){
    tiles[i].show();
  }
  if(failed){
    push()
    fill(0,0,0,180);
    rect(0,0,width,height);
    textSize(128);
    textAlign(CENTER);
    fill(255);
    text("Failed", width/2, (height/2)+32); 
    textSize(32);
    text("Click the screen to restart.", width/2, (height/2)+100); 
    pop()
  }
}

function board(){
  push();
  for(var i=0; i<width/scl; i++){
    strokeWeight(3);
    line(i*scl,0,i*scl,height);
  }
  for(var i=0; i<width/scl; i++){
    strokeWeight(3);
    line(0,i*scl,width,i*scl);
  }
  pop();
}

function newTile(){
  let x = floor(random(0,4));
  let y = floor(random(0,4));
  let num = spawnAble[floor(random(0,2))];
  let hit = false;
  for(var i=0; i<tiles.length; i++){
    if(x*scl == tiles[i].x && y*scl == tiles[i].y){
      hit = true;
      break;
    }
  }
  if(!hit){
    tiles.push(new Tile(x*scl,y*scl,num));
  }
  else{
    newTile();
  }
  //console.log(tiles[tiles.length-1]);
}

function move(dir){
  if(dir == 0){
    let going = [];
    let go = true;
    for(var i=0; i<tiles.length; i++){
      going.push(false);
    }
    while(go){
      background(175);
      board();
      for(var i=0; i<tiles.length; i++){
        if(tiles[i].y > scl/2){
          let hit = false;
          let ind = 0;
          for(var a=0; a<tiles.length; a++){
            if(tiles[a].y == tiles[i].y-scl && tiles[a].x == tiles[i].x && i != a){
              hit = true;
              ind = a;
              going[i] = true;
              break;
            }
          }
          if(!hit){
            tiles[i].y -= scl;
          }
          else if(tiles[ind].num == tiles[i].num){
            delete tiles[i];
            tiles[ind].num *= 2;
            tiles = cleanArray(tiles);
          }
        }
        else{
          going[i] = true;
        }
        tiles[i].show();
      }
      for(var i=0; i<tiles.length; i++){
        if(!going[i]){
          break;
        }
        else if(i == tiles.length-1){
          go = false;
        }
      }
    }
  }
  if(dir == 1){
    let going = [];
    let go = true;
    for(var i=0; i<tiles.length; i++){
      going.push(false);
    }
    while(go){
      background(175);
      board();
      for(var i=0; i<tiles.length; i++){
        if(tiles[i].x+scl < width-scl/2){
          let hit = false;
          let ind = 0;
          for(var a=0; a<tiles.length; a++){
            if(tiles[a].x == tiles[i].x+scl && tiles[a].y == tiles[i].y && i != a){
              hit = true;
              ind = a;
              going[i] = true;
              break;
            }
          }
          if(!hit){
            tiles[i].x += scl;
          }
          else if(tiles[ind].num == tiles[i].num){
            delete tiles[i];
            tiles[ind].num *= 2;
            tiles = cleanArray(tiles);
          }
        }
        else{
          going[i] = true;
        }
        tiles[i].show();
      }
      for(var i=0; i<tiles.length; i++){
        if(!going[i]){
          break;
        }
        else if(i == tiles.length-1){
          go = false;
        }
      }
    }
  }
  if(dir == 2){
    let going = [];
    let go = true;
    for(var i=0; i<tiles.length; i++){
      going.push(false);
    }
    while(go){
      background(175);
      board();
      for(var i=0; i<tiles.length; i++){
        if(tiles[i].y+scl < height-scl/2){
          let hit = false;
          let ind = 0;
          for(var a=0; a<tiles.length; a++){
            if(tiles[a].y == tiles[i].y+scl && tiles[a].x == tiles[i].x && i != a){
              hit = true;
              ind = a;
              going[i] = true;
              break;
            }
          }
          if(!hit){
            tiles[i].y += scl;
          }
          else if(tiles[ind].num == tiles[i].num){
            delete tiles[i];
            tiles[ind].num *= 2;
            tiles = cleanArray(tiles);
          }
        }
        else{
          going[i] = true;
        }
        tiles[i].show();
      }
      for(var i=0; i<tiles.length; i++){
        if(!going[i]){
          break;
        }
        else if(i == tiles.length-1){
          go = false;
        }
      }
    }
  }
  if(dir == 3){
    let going = [];
    let go = true;
    for(var i=0; i<tiles.length; i++){
      going.push(false);
    }
    while(go){
      background(175);
      board();
      for(var i=0; i<tiles.length; i++){
        if(tiles[i].x > scl/2){
          let hit = false;
          let ind = 0;
          for(var a=0; a<tiles.length; a++){
            if(tiles[a].x == tiles[i].x-scl && tiles[a].y == tiles[i].y && i != a){
              hit = true;
              ind = a;
              going[i] = true;
              break;
            }
          }
          if(!hit){
            tiles[i].x -= scl;;
          }
          else if(tiles[ind].num == tiles[i].num){
            delete tiles[i];
            tiles[ind].num *= 2;
            tiles = cleanArray(tiles);
          }
        }
        else{
          going[i] = true;
        }
        tiles[i].show();
      }
      for(var i=0; i<tiles.length; i++){
        if(!going[i]){
          break;
        }
        else if(i == tiles.length-1){
          go = false;
        }
      }
    }
  }
  if(!checkFail()){
    newTile();
  }
}

function cleanArray(arr) {
	var arr_ = [];
	for (var i in arr) {
		arr_.push(arr[i]);
	}
	return arr_;
}

function mouseClicked(){
  if(failed){
    failed = false;
    tiles = [];
    tiles.push(new Tile(0,0,2));
    
  }
}

function keyPressed(){
  if(!failed){
    if(keyCode == UP_ARROW){
      move(0);
    }
    if(keyCode == RIGHT_ARROW){
      move(1);
    }
    if(keyCode == DOWN_ARROW){
      move(2);
    }
    if(keyCode == LEFT_ARROW){
      move(3);
    }
  }
}

function checkFail(){
  if(tiles.length == 16){
    console.log("Failed");
    failed = true;
    let h = 0;
    for(var i=0; i<tiles.length; i++){
      if(tiles[i].num > h){
        h = tiles[i].num;
      }
    }
    high = h;
    document.getElementById("high").innerHTML = "Highscore: "+high;
    return true;
  }
  return false;
}
