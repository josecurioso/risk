class FondoSVG extends Modelo {

    constructor(rutaImagen, x, y, w, h) {
        super(rutaImagen, x, y);
        this.width = w;
        this.height = h;
    }

    dibujar() {
        contexto.drawImage(this.imagen,
        this.x - this.imagen.width / 2,
        this.y - this.imagen.height / 2, this.width, this.height);
    }

}
