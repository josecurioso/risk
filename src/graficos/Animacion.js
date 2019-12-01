class Animacion {

    constructor(imagenSrc, imagenAncho, imagenAlto, modeloAncho, modeloAlto, velocidadRefresco, framesTotales, callback) {
        // Nuevo para animaciones finitas
        this.callback = callback;

        this.imagen = new Image();
        this.imagen.src = imagenSrc;

        this.modeloAncho = modeloAncho;
        this.modeloAlto = modeloAlto;
        this.velocidadRefresco = velocidadRefresco;
        this.framesTotales = framesTotales;

        this.frameActual = 0;
        this.frameAncho = imagenAncho / this.framesTotales;
        this.frameAlto = imagenAlto;

        this.rectanguloDibujo = {};
        this.rectanguloDibujo.x = 0;
        this.rectanguloDibujo.y = 0;
        this.rectanguloDibujo.ancho = this.frameAncho;
        this.rectanguloDibujo.alto = this.frameAlto;

        this.ultimaActualizacion = 0;

        this.debug = false;
    }

    actualizar() {
        this.debug ? console.log("ACTUALIZACION NUEVA ("+this.ultimaActualizacion+")") : undefined;
        this.ultimaActualizacion++;

        if (this.ultimaActualizacion > this.velocidadRefresco) {
            this.ultimaActualizacion = 0;
            // actualizar el frame
            this.frameActual++;
            this.debug ? console.log("   Sumado frame " + this.frameActual) : undefined;
            // Si llega al último frame evuelve al primero
            if (this.frameActual >= this.framesTotales) {
                // reiniciar, es infinita
                if (this.callback != null) {
                    // avisar de que acabo
                    this.frameActual = 0;
                    this.callback();
                } else {
                    // reiniciar, es infinita
                    this.frameActual = 0;
                    this.debug ? console.log("   Reset frame " + this.frameActual) : undefined;
                }

            }
        }
        // actualizar el rectangulo (siguiente frame)
        this.rectanguloDibujo.x = this.frameActual * this.frameAncho;


        this.debug ? console.log("   INFORMACION") : undefined;
        this.debug ? console.log("       rectanguloDibujo.x"+this.rectanguloDibujo.x) : undefined;
        this.debug ? console.log("       rectanguloDibujo.y"+this.rectanguloDibujo.y) : undefined;
        this.debug ? console.log("       rectanguloDibujo.ancho"+this.rectanguloDibujo.ancho) : undefined;
        this.debug ? console.log("       rectanguloDibujo.alto"+this.rectanguloDibujo.alto) : undefined;
        this.debug ? console.log("       modeloAncho"+this.modeloAncho) : undefined;
        this.debug ? console.log("       modeloAlto"+this.modeloAlto) : undefined;
    }

    dibujar(x, y) {
        this.debug ? console.log("   DIBUJANDO EN ("+x+", "+y+")") : undefined;
        contexto.drawImage(
            this.imagen,
            this.rectanguloDibujo.x,
            this.rectanguloDibujo.y,
            this.rectanguloDibujo.ancho,
            this.rectanguloDibujo.alto,
            x - this.modeloAncho / 2,
            y - this.modeloAlto / 2,
            this.modeloAncho,
            this.modeloAlto);
    }
}
