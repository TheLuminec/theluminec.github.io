var walls = [];
var scl = 5;
var goingX;
var goingY;
var startX;
var startY;
var goingSet = false;
var start = false;
var paths = [];
var doingPhase = 0;
var truePath = [];
var mode = 0;
var startBlock;
var endBlock;
var creatingBlock = false;
var size = 10;
var gotHit = false;

function setup() {
  createCanvas(800, 800).parent("canvas");
  //frameRate(60);
  walls.push(new Wall(0, 0, width, scl));
  walls.push(new Wall(width - scl, 0, scl, height));
  walls.push(new Wall(0, height - scl, width, scl));
  walls.push(new Wall(0, 0, scl, height));


}

function draw() {
  background(230);
  grid();
  for (var i = 0; i < walls.length; i++) {
    walls[i].show();
  }

  if (goingSet) {
    fill(0, 0, 255);
    rect(goingX, goingY, scl, scl);
  }
  if (start) {
    fill(0, 255, 0);
    rect(startX, startY, scl, scl);
    for (var i = 0; i < paths.length; i++) {
      paths[i].show();
    }
    if (doingPhase == 0) {
      generateNew();
      for (var i = 0; i < paths.length; i++) {
        if (paths[i].n && !gotHit) {
          break;
        }
        else if (i == paths.length - 1) {
          doingPhase++;
          print("Next Phase");
          for (var a = 0; a < paths.length; a++) {
            if (paths[a].hit) {
              truePath = tracePath(a);
              paths = [];
              break;
            }
          }
        }
      }

    }
    else {
      for (var i = 0; i < truePath.length; i++) {
        push()
        stroke(0, 255, 0);
        strokeWeight(3);
        line(truePath[i].fX + (scl / 2), truePath[i].fY + (scl / 2), truePath[i].x + (scl / 2), truePath[i].y + (scl / 2));
        pop()
      }
    }
  }
  if (creatingBlock) {
    var dX = dist(startBlock.x, 0, endBlock.x, 0);
    var dY = dist(0, startBlock.y, 0, endBlock.y);
    push()
    fill(20, 20, 20, 175);
    if (startBlock.x < endBlock.x && startBlock.y < endBlock.y) {
      rect(startBlock.x, startBlock.y, dX, dY);
    }
    else if (startBlock.x > endBlock.x && startBlock.y > endBlock.y) {
      rect(endBlock.x, endBlock.y, dX, dY);
    }
    else if (startBlock.x < endBlock.x && startBlock.y > endBlock.y) {
      rect(startBlock.x, endBlock.y, dX, dY);
    }
    else if (startBlock.x > endBlock.x && startBlock.y < endBlock.y) {
      rect(endBlock.x, startBlock.y, dX, dY);
    }
    pop()
  }

}

function tracePath(id) {
  let tmpPath = [];
  let traceNum = id;
  tmpPath.push(paths[traceNum])
  while (true) {
    traceNum = paths[traceNum].preNum;
    if (traceNum == null) {
      break;
    }
    else {
      tmpPath.push(paths[traceNum])
    }
  }
  console.log("Found");
  return tmpPath;
}

function generateNew() {
  let length = paths.length;
  for (var i = 0; i < length; i++) {
    if (paths[i].hit) {
      gotHit = true;
    }
    if (paths[i].n) {
      paths[i].n = false;
      if (checkCollidePath(i, paths[i].x, paths[i].y + scl) && checkCollideWall(paths[i].x, paths[i].y + scl)) {
        paths.push(new Pathfinder(paths[i].x, paths[i].y + scl, paths[i].x, paths[i].y, paths.length, i));

      }
      if (checkCollidePath(i, paths[i].x + scl, paths[i].y) && checkCollideWall(paths[i].x + scl, paths[i].y)) {
        paths.push(new Pathfinder(paths[i].x + scl, paths[i].y, paths[i].x, paths[i].y, paths.length, i));
      }
      if (checkCollidePath(i, paths[i].x, paths[i].y - scl) && checkCollideWall(paths[i].x, paths[i].y - scl)) {
        paths.push(new Pathfinder(paths[i].x, paths[i].y - scl, paths[i].x, paths[i].y, paths.length, i));
      }
      if (checkCollidePath(i, paths[i].x - scl, paths[i].y) && checkCollideWall(paths[i].x - scl, paths[i].y)) {
        paths.push(new Pathfinder(paths[i].x - scl, paths[i].y, paths[i].x, paths[i].y, paths.length, i));
      }
    }
  }
}

function checkCollideWall(x, y) {
  for (var i = 0; i < walls.length; i++) {
    if (x >= walls[i].x && x < walls[i].x + walls[i].w && y >= walls[i].y && y < walls[i].y + walls[i].h) {
      return false;
    }
  }
  return true;
}

function checkCollidePath(id, x, y) {
  for (var i = 0; i < paths.length; i++) {
    if (i != id) {
      if (x == paths[i].x && y == paths[i].y) {
        return false;
      }
    }
  }
  return true;
}

function generateBoard() {
  for (var i = 0; i < width / 10; i++) {
    walls.push(new Wall(floor(random(1, width / scl)) * scl, floor(random(1, height / scl)) * scl, floor(random(1, size)) * scl, floor(random(1, size)) * scl));
  }
}

function mouseClicked() {
  if (mouseX < width && mouseY < height) {
    if (mode == 1) {
      if (!goingSet) {
        goingSet = true;
        let x = mouseX;
        let y = mouseY;
        goingX = floor(x / scl) * scl;
        goingY = floor(y / scl) * scl;
      }
      else if (!start) {
        console.log("Start");
        start = true;
        let x = mouseX;
        let y = mouseY;
        startX = floor(x / scl) * scl;
        startY = floor(y / scl) * scl;
        paths.push(new Pathfinder(startX, startY, startX, startY, 0, null));
      }
    }
  }
}

function mousePressed() {
  if (mouseX < width && mouseY < height) {
    if (mode == 0) {
      let x = floor(mouseX / scl) * scl;
      let y = floor(mouseY / scl) * scl;
      startBlock = createVector(x, y);
      endBlock = createVector(x, y);
      creatingBlock = true;
    }
  }
}

function mouseDragged() {
  if (mouseX < width && mouseY < height) {
    if (mode == 0) {
      let x = floor(mouseX / scl) * scl;
      let y = floor(mouseY / scl) * scl;
      endBlock = createVector(x, y);
    }
  }
}

function mouseReleased() {
  if (mouseX < width && mouseY < height) {
    if (mode == 0) {
      let x = floor(mouseX / scl) * scl;
      let y = floor(mouseY / scl) * scl;
      creatingBlock = false;
      var dX = dist(startBlock.x, 0, x, 0);
      var dY = dist(0, startBlock.y, 0, y);
      if (startBlock.x < endBlock.x && startBlock.y < endBlock.y) {
        walls.push(new Wall(startBlock.x, startBlock.y, dX, dY));
      }
      else if (startBlock.x > endBlock.x && startBlock.y > endBlock.y) {
        walls.push(new Wall(endBlock.x, endBlock.y, dX, dY));
      }
      else if (startBlock.x < endBlock.x && startBlock.y > endBlock.y) {
        walls.push(new Wall(startBlock.x, endBlock.y, dX, dY));
      }
      else if (startBlock.x > endBlock.x && startBlock.y < endBlock.y) {
        walls.push(new Wall(endBlock.x, startBlock.y, dX, dY));
      }

    }
  }
}

function grid() {
  stroke(0);
  for (var i = 0; i < width / scl; i++) {
    line(i * scl, 0, i * scl, height);
  }
  for (var i = 0; i < height / scl; i++) {
    line(0, i * scl, width, i * scl);
  }
}
