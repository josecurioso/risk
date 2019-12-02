class Soldado extends Modelo {

    constructor(x, y, isLeft, jugador) {
        isLeft ?
            (super(jugador.soldado_izquierda, x, y),
                this.animDisparar = new Animacion(jugador.dispararIzquierda, 400, 50, 50, 50, 5, 8),
                this.animDerrota = new Animacion(jugador.derrotaIzquierda, 550, 50, 50, 50, 3, 11))
            : (super(jugador.soldado_derecha, x, y),
                this.animDisparar = new Animacion(jugador.dispararDerecha, 400, 50, 50, 50, 5, 8),
                this.animDerrota = new Animacion(jugador.derrotaDerecha, 550, 50, 50, 50, 3, 11));

        this.animacion = this.animDisparar;
        this.isLeft = isLeft;

        // Disparo
        this.disparos = [];
        this.disparo = 0;
        this.cadenciaDisparo = 30;
    }

    actualizar() {
        this.animacion.actualizar();
        this.disparos.forEach(d => {
            d.actualizar();
        });

        this.disparar();
    }

    dibujar() {
        this.animacion.dibujar(this.x, this.y);
        this.disparos.forEach(d => {
            d.dibujar();
        });
    }

    disparar() {
        this.disparo++;
        if (this.disparo === this.cadenciaDisparo) {
            let disparo = this.isLeft ? new Bala(imagenes.balaIzquierda, this.x - 2, this.y - 13, -3) : new Bala(imagenes.balaDerecha, this.x + 2, this.y - 13, 3);
            this.disparos.push(disparo);
            this.disparo = 0;
        }
    }

    morir() {
        this.animacion = this.animDerrota;
    }
}
