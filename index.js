import Vector from './Vector.js';
import Rectangle from './Rectangle.js';

let canvas = document.createElement('canvas');
document.body.appendChild(canvas)
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;

let heldKeys = [];

document.addEventListener('keydown', (e) => {
    if (!heldKeys.includes(e.code)) {
        heldKeys.push(e.code)
    }
});
document.addEventListener('keyup', (e) => {
    heldKeys = heldKeys.filter(k => k != e.code);
});

window.onblur = () => { heldKeys = []; }

let meRect = new Rectangle({
    color: '#007F00',
    position: new Vector(0, 0),
    size: new Vector(canvas.height / 12, canvas.width / 15)
});
let otherRect = new Rectangle({
    color: 'red',
    position: new Vector(canvas.width / 2, canvas.height / 2),
    size: new Vector(canvas.width / 10, canvas.height / 10)
});

const frameRate = 60;
const speed = 0.2;
const attemptMove = (o) => {
    if(!new Rectangle({position: meRect.getPosition().add(o), size: meRect.getSize()}).intersects(otherRect)) {
        meRect.move(o);
    } else {
        alert('GTFO GREEN');
    }
}
const interval = 1000 / frameRate;
setInterval(() => {
    const offset = interval * speed;
    heldKeys.forEach((k) => {
        switch(k) {
            case 'KeyW':
                attemptMove(new Vector(0, offset * -1));
                break;
            case 'KeyS':
                attemptMove(new Vector(0, offset));
                break;
            case 'KeyA':
                attemptMove(new Vector(offset * -1, 0));
                break;
            case 'KeyD':
                attemptMove(new Vector(offset, 0));
                break;
        }
    });
    if(meRect.intersects(otherRect)) {
        console.log('inty')
    }
    let context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    meRect.render(context);
    otherRect.render(context);
}, interval);

