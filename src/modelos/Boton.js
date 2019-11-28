class Boton extends Modelo {


    constructor(rutaImagen, x, y, isRounded, radius) {
        super(rutaImagen, x, y);
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

    contienePunto(pX, pY) {
        if (this.isRounded) {
            if (false) {
                console.log("Click: (" + pX + ", " + pY + ")");
                console.log("    Button: (" + this.x + ", " + this.y + ")");
                console.log("    Distance: (" + Math.sqrt(Math.pow(pX - this.x, 2) + Math.pow(pY - this.y, 2)) + ")");
                console.log("    Radius: (" + this.radius + ")");
            }
            return Math.sqrt(Math.pow(pX - this.x, 2) + Math.pow(pY - this.y, 2)) < this.radius;
        } else {
            if (false) {
                console.log("Click: (" + pX + ", " + pY + ")");
                console.log("    Button: (" + this.x + ", " + this.y + ")");
            }
            if (pY >= this.y - this.alto / 2 &&
                pY <= this.y + this.alto / 2 &&
                pX <= this.x + this.ancho / 2 &&
                pX >= this.x - this.ancho / 2) {
                return true;
            }
        }
        return false;
    }

}
