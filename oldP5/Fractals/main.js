var count = 0;
var scl = 600;
var fractals = [];
var newFracs = [];
var doing = "null";
var slider;

function setup(){
  createCanvas(800, 800).parent("gameCan");
  angleMode(DEGREES);
  strokeWeight(1);
  stroke(255);
  if(doing == "tri"){
    scl = 600;
    triangleFractal();
  }
  else if(doing == "tree"){
    scl = 150;
    treeFractal();
  }
  slider = document.getElementById("myRange")
}

function draw(){
  background(51);
  scl = slider.value;
  for(var i=0; i<fractals.length; i++){
    if(fractals[i].type == "tri"){
      push();
        line(fractals[i].startX,fractals[i].startY,fractals[i].endX,fractals[i].endY);
      pop();
    }
    else if(fractals[i].type == "tree"){
      push();
        translate(fractals[i].x,fractals[i].y);
        rotate(-fractals[i].rot);
        line(0,0,0,-fractals[i].size);
      pop();
    }
  }
}

function cleanArray(arr) {
	var arr_ = [];
	for (var i in arr) {
		arr_.push(arr[i]);
	}
	return arr_;
}

function triangleFractal(){
  //scl = 600;
  let vect = createVector(width/2,(height/2)-scl/2);
  vect = p5.Vector.fromAngle(radians(60), scl);
  fractals.push({type:"tri",startX:width/2,startY:(height/2)-scl/1.8,endX:vect.x+(width/2),endY:vect.y+((height/2)-scl/1.8),size:scl});
  vect = p5.Vector.fromAngle(radians(180), scl);
  fractals.push({type:"tri",startX:fractals[fractals.length-1].endX,startY:fractals[fractals.length-1].endY,endX:vect.x+(fractals[fractals.length-1].endX),endY:vect.y+(fractals[fractals.length-1].endY),size:scl});
  vect = p5.Vector.fromAngle(radians(-60), scl);
  fractals.push({type:"tri",startX:fractals[fractals.length-1].endX,startY:fractals[fractals.length-1].endY,endX:vect.x+(fractals[fractals.length-1].endX),endY:vect.y+(fractals[fractals.length-1].endY),size:scl});
  for(var i=0; i<count; i++){
    let tmpFrac = fractals.length;
    for(var a=0; a<tmpFrac; a++){
      if(fractals[a].type == "tri"){
        let originalFrac = {endX:fractals[a].endX,endY:fractals[a].endY};
        fractals[a].endX = ((fractals[a].endX-fractals[a].startX)/3)+fractals[a].startX;
        fractals[a].endY = ((fractals[a].endY-fractals[a].startY)/3)+fractals[a].startY;
        fractals[a].size /= 3;
        fractals.push({type:"tri",startX:((fractals[a].endX-fractals[a].startX)*2)+fractals[a].startX,startY:((fractals[a].endY-fractals[a].startY)*2)+fractals[a].startY,endX:originalFrac.endX,endY:originalFrac.endY,size:fractals[a].size});
        let tmpVect = createVector(fractals[a].endX,fractals[a].endY);
        let endVect = createVector(fractals[fractals.length-1].startX,fractals[fractals.length-1].startY);
        vect = p5.Vector.fromAngle(radians(-(atan2(endVect.x-tmpVect.x,endVect.y-tmpVect.y)-30)),fractals[a].size);
        fractals.push({type:"tri",startX:tmpVect.x,startY:tmpVect.y,endX:vect.x+tmpVect.x,endY:vect.y+tmpVect.y,size:fractals[a].size});
        fractals.push({type:"tri",startX:fractals[fractals.length-1].endX,startY:fractals[fractals.length-1].endY,endX:fractals[fractals.length-2].startX,endY:fractals[fractals.length-2].startY,size:fractals[a].size});
      }
    }
  }
}

function step(){
  if(doing == "tri"){
    let tmpFrac = fractals.length;
    for(var a=0; a<tmpFrac; a++){
      if(fractals[a].type == "tri"){
        let originalFrac = {endX:fractals[a].endX,endY:fractals[a].endY};
        fractals[a].endX = ((fractals[a].endX-fractals[a].startX)/3)+fractals[a].startX;
        fractals[a].endY = ((fractals[a].endY-fractals[a].startY)/3)+fractals[a].startY;
        fractals[a].size /= 3;
        fractals.push({type:"tri",startX:((fractals[a].endX-fractals[a].startX)*2)+fractals[a].startX,startY:((fractals[a].endY-fractals[a].startY)*2)+fractals[a].startY,endX:originalFrac.endX,endY:originalFrac.endY,size:fractals[a].size});
        let tmpVect = createVector(fractals[a].endX,fractals[a].endY);
        let endVect = createVector(fractals[fractals.length-1].startX,fractals[fractals.length-1].startY);
        vect = p5.Vector.fromAngle(radians(-(atan2(endVect.x-tmpVect.x,endVect.y-tmpVect.y)-30)),fractals[a].size);
        fractals.push({type:"tri",startX:tmpVect.x,startY:tmpVect.y,endX:vect.x+tmpVect.x,endY:vect.y+tmpVect.y,size:fractals[a].size});
        fractals.push({type:"tri",startX:fractals[fractals.length-1].endX,startY:fractals[fractals.length-1].endY,endX:fractals[fractals.length-2].startX,endY:fractals[fractals.length-2].startY,size:fractals[a].size});
      }
    }
  }
  else if(doing == "tree"){
    var fracNum = newFracs.length;
    for(var a=0; a<fracNum; a++){
      if(fractals[newFracs[a]].type == "tree"){
        let preFrac = fractals[newFracs[a]];
        delete newFracs[a];
        let v = p5.Vector.fromAngle(radians(preFrac.rot), preFrac.size);

        //print(v.x,v.y);

        fractals.push({x:preFrac.x-v.y,y:preFrac.y-v.x,size:preFrac.size/1.3,rot:preFrac.rot+45,type:"tree"});
        newFracs.push(fractals.length-1);
        fractals.push({x:preFrac.x-v.y,y:preFrac.y-v.x,size:preFrac.size/1.3,rot:preFrac.rot-45,type:"tree"});
        newFracs.push(fractals.length-1);
      }
    }
    newFracs = cleanArray(newFracs);
  }
}

function make(){
  if(doing == "tri"){
    triangleFractal();
  }
  else if(doing == "tree"){
    treeFractal();
  }
}

function treeFractal(){
  //scl = 150;
  fractals.push({x:width/2,y:height-100,size:scl,rot:0,type:"tree"});
  newFracs.push(fractals.length-1);

  for(var i=0; i<count; i++){
    var fracNum = newFracs.length;
    for(var a=0; a<fracNum; a++){
      if(fractals[a].type == "tree"){
        let preFrac = fractals[newFracs[a]];
        delete newFracs[a];
        let v = p5.Vector.fromAngle(radians(preFrac.rot), preFrac.size);

        //print(v.x,v.y);

        fractals.push({x:preFrac.x-v.y,y:preFrac.y-v.x,size:preFrac.size/1.3,rot:preFrac.rot+45,type:"tree"});
        newFracs.push(fractals.length-1);
        fractals.push({x:preFrac.x-v.y,y:preFrac.y-v.x,size:preFrac.size/1.3,rot:preFrac.rot-45,type:"tree"});
        newFracs.push(fractals.length-1);
      }
    }
    newFracs = cleanArray(newFracs);
  }
}

