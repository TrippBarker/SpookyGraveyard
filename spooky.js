
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

for (let i = 0; i < collisionArray.length; i++){
    for (let j = 0; j < collisionArray[i].length; j++){
        if (collisionArray[i][j]  == 1){
            boundaries.push(new BoundaryObj(j * elementSize, i * elementSize));
        }
    }
}

let testBounds = [];
testBounds.push(new BoundaryObj(17 * elementSize, 5 * elementSize));
testBounds.push(new BoundaryObj(14 * elementSize, 6 * elementSize));

// ===========================================FUNCTIONS============================================

function move(e){
    moving = true;
    lastPlayerDirection = e.key;
}

function stopMove(e){
    moving = false;
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
    boundaries.forEach(boundary =>{
        boundary.draw();
    });
    //testBounds.forEach(bound =>{
    //    bound.draw();
    //})
    canMove = true;
}

// ========================================EVENT  LISTENERS========================================
window.addEventListener('keydown', move);
window.addEventListener('keyup', stopMove);
window.setInterval(redraw, 35);