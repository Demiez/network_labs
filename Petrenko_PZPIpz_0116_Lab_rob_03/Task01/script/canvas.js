const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d");

function Drawable(){
    Drawable.addInstance(this);
}

Drawable.prototype.draw = function(){};;

Drawable.instances = [];

Drawable.addInstance = function(item){
    Drawable.instances.push(item);
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

class TransformedLine extends Drawable {
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
        ctx.translate(90,90)
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

class TransformedRectangle extends Drawable {
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
        ctx.setTransform(1, 0, 0, 1, 60, 60);
        ctx.fillRect(this.x, this.y, this.height, this.width );
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

new Circle(60,60,25, "green");
new Rectangle(90, 90, 30, 60, "green");
new Line(120, 120, 10, 130, "red");
new Line(130, 130, 10, 50, "blue");
new Line(140, 130, 0, 50, "blue");
new Line(210, 130, -70, 1, "blue");

new TransformedRectangle(90, 90, 30, 60, "green");