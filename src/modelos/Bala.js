class Bala extends Modelo {

    constructor(imagen, x, y, vx) {
        super(imagen, x, y);
        this.vx = vx;
    }

    actualizar() {
        this.x += this.vx;
    }
}
