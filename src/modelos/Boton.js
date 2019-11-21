class Boton extends Modelo {


    constructor(rutaImagen, x, y, isRounded) {
        super(rutaImagen, x, y)
        this.pulsado = false;
        if(isRounded == undefined){
            isRounded = false;
        }
        this.isRounded = isRounded;
    }

    contienePunto(pX, pY) {
        if(this.isRounded){
            return Math.sqrt(Math.pow(pX - this.x,2) + Math.pow(pY - this.y, 2)) < this.ancho/2;
        }
        else{
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
