class FondoSVG extends Modelo {

    constructor(rutaImagen, x, y, w, h) {
        super(rutaImagen, x, y);
        this.width = w;
        this.height = h;
    }

    dibujar() {
        contexto.drawImage(this.imagen,
            this.x - this.width,
            this.y - this.height, this.width, this.height);
    }

}
