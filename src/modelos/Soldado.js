class Soldado extends Modelo {

    constructor(x, y, isLeft) {
        isLeft ? (super(imagenes.soldado_izquierda, x, y), this.animDisparar = new Animacion(imagenes.dispararIzquierda, 400, 50, 6, 8), this.animDerrota = new Animacion(imagenes.derrotaIzquierda, 550, 50, 6, 11)) : (super(imagenes.soldado_derecha, x, y), this.animDisparar = new Animacion(imagenes.dispararDerecha, 400, 50, 6, 8), this.animDerrota = new Animacion(imagenes.derrotaDerecha, 550, 50, 6, 11));
        this.animacion = this.animDisparar;
        this.isLeft = isLeft;

        // Disparo
        this.disparos = [];
        this.disparo = 0;
    }

    actualizar() {
        this.animacion.actualizar();
        if(this.disparos.length > 0) {
            this.disparos.forEach(d => {
                d.actualizar();
                d.dibujar();
            });
        }
        this.disparo++;

        if (this.disparo === 4) {
            this.disparar();
        } else if (this.disparo === 7) {
            this.disparo = 0;
        }
    }

    dibujar() {
        this.animacion.dibujar(this.x, this.y);
    }

    disparar() {
        let disparo = this.isLeft ? new Bala(imagenes.balaIzquierda, this.x, this.y - 15, -3) : new Bala(imagenes.balaDerecha, this.x, this.y - 15, 3);
        this.disparos.push(disparo);
    }

    morir() {
        this.animacion = this.animDerrota;
    }
}
