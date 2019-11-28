class BotonSVG extends Modelo {


    constructor(rutaImagen, x, y, w, h, isRounded, radius) {
        super(rutaImagen, x, y);
        this.width = w;
        this.height = h;
        this.pulsado = false;
        if (isRounded == undefined) {
            isRounded = false;
        }
        this.isRounded = isRounded;
        this.radius = 58;
        if (radius != undefined) {
            this.radius = radius;
        }
    }

    dibujar() {
        contexto.drawImage(this.imagen,
            this.x - this.width,
            this.y - this.height, this.width, this.height);
    }

    contienePunto(pX, pY) {
        if (this.isRounded) {
            if (false) {
                console.log("Click: (" + pX + ", " + pY + ")");
                console.log("    Button: (" + this.x + ", " + this.y + ")");
                console.log("    Distance: (" + Math.sqrt(Math.pow(pX - (this.x - this.width / 2), 2) + Math.pow(pY - (this.y - this.height / 2), 2)) + ")");
                console.log("    Radius: (" + this.radius + ")");
            }
            return Math.sqrt(Math.pow(pX - (this.x - this.width / 2), 2) + Math.pow(pY - (this.y - this.height / 2), 2)) < this.radius;
        } else {
            if (false) {
                console.log("Click: (" + pX + ", " + pY + ")");
                console.log("    Button: (" + this.x + ", " + this.y + ")");
            }
            if (pY >= this.y - this.height && pY <= this.y &&
                pX <= this.x && pX >= this.x - this.width) {
                return true;
            }
        }
        return false;
    }

}
