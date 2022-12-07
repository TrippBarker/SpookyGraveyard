
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

}

class BoundaryObj{

}

// Object Creation

let basicMap = new Map('../res/maps/basicMap.png');
basicMap.draw();