
// CANVAS CONPONENTS
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const cWidth = 960;
const cHeight = 720;

const elementSize = 96;

const offset = {
    x: -1344,
    y: -288
}

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width = cWidth, canvas.height = cHeight);


// PLAYER COMPONENTS
let moving = false;
let lastPlayerDirection = "s";
let playerSpeed = elementSize / 12;
let spriteFrame = 0;

// GAME MECHANIC COMPONENTS
let playing = true;
let downKeys = [];

// COLLISION COMPONENTS
const boundaries = [];

const collisionArray = [];

for (let i = 0; i < collisions.length; i+= 30){
    collisionArray.push(collisions.slice(i, i + 30));
}

// Asset Classes

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

// Object Creation

let basicMap = new Map('./res/maps/basicMap.png');

let player = new PlayerObj('./res/sprites/ghostie/ghostie.png');

for (let i = 0; i < collisionArray.length; i++){
    for (let j = 0; j < collisionArray[i].length; j++){
        if (collisionArray[i][j]  == 1){
            boundaries.push(new BoundaryObj(j * elementSize, i * elementSize));
        }
    }
}

// Function

function move(e){
    moving = true;
    lastPlayerDirection = e.key;
}

function stopMove(e){
    moving = false;
}

function redraw(){
    if (moving){
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
    })
}

// Event Listeners
window.addEventListener('keydown', move);
window.addEventListener('keyup', stopMove);
window.setInterval(redraw, 35);