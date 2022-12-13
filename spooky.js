
// =======================================CANVAS  CONPONENTS=======================================
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const cWidth = 960;
const cHeight = 720;

const elementSize = 96;
const halfElementSize = elementSize / 2;
const elementSizeAndAHalf = elementSize + halfElementSize;

const offset = {
    x: -1344,
    y: -288
}

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width = cWidth, canvas.height = cHeight);


// =======================================PLAYER  COMPONENTS=======================================
let moving = false;
let lastPlayerDirection = "s";
let playerSpeed = elementSize / 12;
let spriteFrame = 0;
let canMove = true;

// ======================================TEENAGER  COMPONENTS======================================
let teenagerMoving = false;
let lastTeenagerDirection = "s";
let teenagerSpeed = elementSize / 12;
let teenagerFrame = 0;
let teenagerCanMove = true;
let teenagerMoveCounter = 0;
let teenagerPossessed = false;

// ====================================GAME MECHANIC COMPONENTS====================================
let playing = true;
let downKeys = [];

// ======================================COLLISION COMPONENTS======================================
const boundaries = [];

const collisionArray = [];

for (let i = 0; i < collisions24.length; i+= 30){
    collisionArray.push(collisions24.slice(i, i + 30));
}

// =========================================ASSET  CLASSES=========================================

class Map{
    constructor(mapImg){
        this.image = new Image();
        this.image.src = mapImg;
    }

    draw(){
        c.drawImage(this.image, offset.x, offset.y);
    }
}

class PlayerObj{
    constructor(playerImg){
        this.image = new Image();
        this.image.src = playerImg;
    }

    draw(){
        c.drawImage(
            this.image,
            elementSize * spriteFrame,
            0,
            elementSize,
            elementSize, 
            cWidth / 2 - (elementSize/2),
            cHeight / 2 - (elementSize/2),
            elementSize,
            elementSize);
    }

}

class EnemyObj{
    constructor(enemyImg, xPos, yPos){
        this.image = new Image();
        this.image.src = enemyImg;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    draw(){
        c.drawImage(
            this.image,
            elementSize * spriteFrame,
            0,
            elementSize,
            elementSize, 
            this.xPos + offset.x,
            this.yPos + offset.y,
            elementSize,
            elementSize
        );
    }
}

// Class For Creating Barriers Sprites Cannot Pass
class BoundaryObj{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = elementSize;
        this.height = elementSize;
    }

    draw(){
        c.fillStyle = 'rgba(255, 0, 0, 0.5)';
        c.fillRect(
            this.x + offset.x, 
            this.y + offset.y, 
            this.width, 
            this.height);
    }
}

// ========================================OBJECT  CREATION========================================

let basicMap = new Map('./res/maps/basicMap24.png');

let player = new PlayerObj('./res/sprites/ghostie/ghostie24.png');

let teenagerCol = new BoundaryObj(20 * elementSize, 10 * elementSize);
let teenager = new EnemyObj('./res/sprites/teenager1/teenager1.png', teenagerCol.x, teenagerCol.y);

for (let i = 0; i < collisionArray.length; i++){
    for (let j = 0; j < collisionArray[i].length; j++){
        if (collisionArray[i][j]  == 1){
            boundaries.push(new BoundaryObj(j * elementSize, i * elementSize));
        }
    }
}


boundaries.push(teenagerCol);

let testBounds = [];
testBounds.push(new BoundaryObj(17 * elementSize, 5 * elementSize));
testBounds.push(new BoundaryObj(14 * elementSize, 6 * elementSize));

// ===========================================FUNCTIONS============================================

function keyPressed(e){
    if ("wasd".includes(e.key)){
        move(e);
    } else if (e.key == " "){
        action();
    }
}

function move(e){
    moving = true;
    lastPlayerDirection = e.key;
}

function stopMove(e){
    moving = false;
}

function action(){
    console.log(Math.abs(offset.x) + cWidth / 2 - elementSize / 2);
    if (lastPlayerDirection == "w"){
    }
}

function checkForCollision(bounds){
    for (let i = 0; i < bounds.length; i++){
        if (lastPlayerDirection == "a"){
            if(
                (cWidth / 2 - elementSize / 2 - elementSize) <= (bounds[i].x + offset.x) &&
                (cWidth / 2 + halfElementSize) > (bounds[i].x + offset.x) &&
                (cHeight / 2 - elementSize / 2 - elementSize) < (bounds[i].y + offset.y - 8) &&
                (cHeight / 2 + halfElementSize) > (bounds[i].y + offset.y)
                ){
                canMove = false;
            }
        } else if (lastPlayerDirection == "d"){
            if(
                (cWidth / 2 + halfElementSize) >= (bounds[i].x + offset.x) &&
                (cWidth / 2 - elementSize / 2 - elementSize) < (bounds[i].x + offset.x) &&
                (cHeight / 2 - elementSize / 2 - elementSize) < (bounds[i].y + offset.y - 8) &&
                (cHeight / 2 + halfElementSize) > (bounds[i].y + offset.y)
                ){
                canMove = false;
            }
        } else if (lastPlayerDirection == "w"){
            if (
                (cHeight / 2 - elementSizeAndAHalf) <= (bounds[i].y + offset.y) &&
                (cHeight / 2 + halfElementSize) > (bounds[i].y + offset.y) &&
                (cWidth / 2 - elementSizeAndAHalf) < (bounds[i].x + offset.x) &&
                (cWidth / 2 + halfElementSize) > (bounds[i].x + offset.x))
            {
                canMove = false;
            }
        } else if (lastPlayerDirection == "s"){
            if ((cHeight / 2 + halfElementSize + 8) > (bounds[i].y + offset.y) &&
                (cHeight / 2 - elementSizeAndAHalf + 8) < (bounds[i].y + offset.y) &&
                (cWidth / 2 - elementSizeAndAHalf) < (bounds[i].x + offset.x) &&
                (cWidth / 2 + halfElementSize) > (bounds[i].x + offset.x)
            ){
                canMove = false;
            }
        }
    }
    
}

function teenagerCollision(){
    if (lastTeenagerDirection == "w"){
        if(teenager.yPos < Math.abs(offset.x) + cWidth / 2 - elementSize / 2){
            teenagerCanMove = true;
        }
    }
}

function teenagerMove(){
    teenagerCollision();
    if (teenagerMoveCounter < 20 && teenagerCanMove){
        teenagerMoveCounter++;
        lastTeenagerDirection = "w";
        teenager.xPos += teenagerSpeed;
        teenagerCol.x += teenagerSpeed;
    } else if (teenagerMoveCounter < 40 && teenagerCanMove){
        teenagerMoveCounter++;
        lastTeenagerDirection = "d"
        teenager.yPos += teenagerSpeed;
        teenagerCol.y += teenagerSpeed;
    } else if (teenagerMoveCounter < 60 && teenagerCanMove){
        teenagerMoveCounter++;
        teenager.xPos -= teenagerSpeed;
        teenagerCol.x -= teenagerSpeed;
    } else if (teenagerCanMove){
        teenagerMoveCounter++;
        teenager.yPos -= teenagerSpeed;
        teenagerCol.y -= teenagerSpeed;
        if (teenagerMoveCounter == 80){
            teenagerMoveCounter = 0;
        }
    }
    teenagerCanMove = true;
}

function redraw(){
    checkForCollision(boundaries);
    //checkForCollision(testBounds);
    if (moving && canMove){
        switch (lastPlayerDirection){
            case 'w':
                offset.y += playerSpeed;
                spriteFrame = 1;
                break;
            case 'a':
                offset.x += playerSpeed;
                spriteFrame = 3;
                break;
            case 's':
                offset.y -= playerSpeed;
                spriteFrame = 0;
                break;
            case 'd':
                offset.x -= playerSpeed;
                spriteFrame = 2;
                break;
        }
    }
    basicMap.draw();
    player.draw();
    teenager.draw();
    //boundaries.forEach(boundary =>{
    //    boundary.draw();
    //a});
    //testBounds.forEach(bound =>{
    //    bound.draw();
    //})
    canMove = true;
    teenagerMove();
}

// ========================================EVENT  LISTENERS========================================
window.addEventListener('keydown', keyPressed);
window.addEventListener('keyup', stopMove);
window.setInterval(redraw, 35);