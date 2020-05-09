const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d");

let current;
let inputs = [];


const tools = {
    graffiti: {
        mousemove(e){
            var x = e.clientX;
            var y = e.clientY;
            (e.buttons & 1) && new Circle(x,y, +size.value, color.value)
        }
    },
    rectangle : {
        mousedown(e) {
            current = new Rectangle(e.clientX,e.clientY, 1, 1, color.value)
        },
        mousemove(e) {
            if (!current) return;

            current.width = e.clientY - current.y
            current.height = e.clientX - current.x

            Drawable.drawAll()
        },
        mouseup(e) {
            current = null;
        }
    },
    circle: {
        mousedown(e) {
            current = new Circle(e.clientX,e.clientY, 1, color.value)
            inputs.push(current);
        },
        mousemove(e) {
            if (!current) return;

            current.radius = (current.distanceTo(e.clientX, e.clientY))
            Drawable.drawAll()
        },
        mouseup(e) {
            current = null;
        }
    },
    line: {
        mousedown(e) {
            current = new Line(e.clientX,e.clientY, 0, 0, color.value, +size.value)
        },
        mousemove(e) {
            if (!current) return;

            current.width = e.clientX - current.x
            current.height = e.clientY - current.y

            Drawable.drawAll()
        },
        mouseup(e) {
            current = null;
        }
    },
    select: {
        click(e) {
            let minDistance = 1000000;
            let distance;
            let target;
            console.log(Drawable.instances);
            for (let item of Drawable.instances) {
                distance = item.distanceTo(e.clientX, e.clientY);
                if (distance < minDistance) {
                    minDistance = distance;
                    Drawable.prototype.target = item;
                }
            }

            if (Drawable.prototype.target.__proto__.constructor.name == "Circle") {
                new AimCircle(Drawable.prototype.target.x,Drawable.prototype.target.y, Drawable.prototype.target.radius + 3, 'red')
            }
            if (Drawable.prototype.target.__proto__.constructor.name == "Line") {
                new AimLine(Drawable.prototype.target.x,Drawable.prototype.target.y, Drawable.prototype.target.width, Drawable.prototype.target.height, 'red', Drawable.prototype.target.lineWidth + 3)
            }
            if (Drawable.prototype.target.__proto__.constructor.name == "Rectangle") {
                new AimRectangle(Drawable.prototype.target.x-2,Drawable.prototype.target.y-2, Drawable.prototype.target.width +4, Drawable.prototype.target.height +4, 'red')
            }

            console.log(Drawable.prototype.target);
            console.log(minDistance);
            console.log(Drawable.instances)
        }
    }
}



function Drawable(){
    Drawable.addInstance(this);
}

const distance = (x1,y1,x2,y2) => ((x1-x2)**2 + (y1-y2)**2)**0.5;

Drawable.prototype.draw = function(){};;

Drawable.prototype.distanceTo = function(x,y){
    if (typeof this.x !== 'number' ||
        typeof this.y !== 'number'){
        return NaN
    }
    return distance (this.x, this.y, x,y)
};
Drawable.instances = [];
Drawable.addInstance = function(item){
    Drawable.instances.push(item);
}



Drawable.forAll = function(callback){
    for(var i = 0; i<Drawable.instances.length;i++){
        callback(Drawable.instances[i])
    }
}


Drawable.drawAll = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    Drawable.forAll(item => item.draw())
}

class Line extends Drawable {
    constructor(x, y, width, height, color, lineWidth) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lineWidth = lineWidth;

        this.draw();
    }
    draw(){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
    }
}


class Circle extends Drawable {
    constructor (x,y,radius,color){
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        this.draw();
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Rectangle extends Drawable {
    constructor(x, y, width, height, color) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.draw();
    }
    draw(){
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.height, this.width );
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class AimCircle extends Drawable {
    constructor (x,y,radius,color){
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        this.draw();
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}
class AimLine extends Drawable {
    constructor(x, y, width, height, color, lineWidth) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lineWidth = lineWidth;

        this.draw();
    }
    draw(){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
    }
}

class AimRectangle extends Drawable {
    constructor(x, y, width, height, color) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.draw();
    }
    draw(){
        console.log(this.color)
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.height, this.width);
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}



undo.onclick = function(){
    Drawable.instances.pop();
    Drawable.drawAll()
};

del.onclick = function(){
    console.log(Drawable.instances);
    for (let i = 0; i<Drawable.instances.length; i++) {
        if (Drawable.instances[i] === Drawable.prototype.target) {
            Drawable.instances.splice(i, 1);
        }
    }
    Drawable.instances.pop();
    Drawable.drawAll();
};

function superHandler(evt) {
    let t = tools[tool.value]
    if (typeof t[evt.type] === 'function') t[evt.type].call(this,evt)
}

canvas.onmousemove = superHandler;
canvas.onmouseup = superHandler;
canvas.onmousedown = superHandler;
canvas.onclick = superHandler;