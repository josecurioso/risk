class MenuLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.fondo =
            new Fondo(imagenes.menu_fondo, 600*0.5, 320*0.5);
        this.boton_empezar = new Boton(imagenes.boton_empezar, 600 * 0.5, 320 * 0.8);
        this.boton_add = new Boton(imagenes.boton_add, 600 * 0.58, 320 * 0.57, true);
        this.boton_remove = new Boton(imagenes.boton_remove, 600 * 0.7, 320 * 0.57, true);
        this.amountPlayers = new Texto(0, 600 * 0.32, 320 * 0.625, "50px Arial");
    }

    dibujar() {
        this.fondo.dibujar();
        this.boton_empezar.dibujar();
        this.boton_add.dibujar();
        this.boton_remove.dibujar();
        this.amountPlayers.dibujar();
    }

    calcularPulsaciones(pulsaciones) {
        this.boton_empezar.pulsado = false;
        this.boton_add.pulsado = false;
        this.boton_remove.pulsado = false;

        for (let i = 0; i < pulsaciones.length; i++) {
            if (this.boton_empezar.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                this.boton_empezar.pulsado = true;
                if (pulsaciones[i].tipo === tipoPulsacion.inicio) {
                    controles.continuar = true;
                }
            }
            if (this.boton_add.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                this.boton_add.pulsado = true;
                controles.addPlayer = true;
            }
            if (this.boton_remove.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                this.boton_remove.pulsado = true;
                controles.removePlayer = true;
            }
        }

        // No pulsado - Botón Disparo
        if (!this.boton_empezar.pulsado) {
            controles.continuar = false;
        }
        if (!this.boton_add.pulsado) {
            controles.addPlayer = false;
        }
        if (!this.boton_remove.pulsado) {
            controles.removePlayer = false;
        }
    }

    procesarControles() {
        // siguiente pantalla
        if (controles.continuar) {
            gameLayer = new GameLayer();
            //gameLayer.setPlayerAmount(this.amountPlayers.valor);
            layer = gameLayer;
            controles.continuar = false;
        }
        if (controles.addPlayer) {
            console.log("Add player");
            gameLayer = new GameLayer();
            this.amountPlayers.valor++;
            controles.addPlayer = false;
        }
        if (controles.removePlayer) {
            console.log("Remove player");
            gameLayer = new GameLayer();
            this.amountPlayers.valor--;
            if(this.amountPlayers.valor < 0)
                this.amountPlayers.valor = 0;
            controles.removePlayer = false;
        }
    }
}
