class BattleLayer extends Layer {

    constructor() {
        super();
        this.iniciar();

        this.attackerTroops = null;
        this.defenderTroops = null;
        this.ratio = null;
    }

    iniciar() {
        // Animaciones
        this.dispararDerecha = new Animacion(imagenes.dispararDerecha, 400, 50, 6,8);
        this.dispararIzquierda = new Animacion(imagenes.dispararIzquierda, 400, 50, 6,8);
        this.derrotaDerecha = new Animacion(imagenes.derrotaDerecha, 550, 50, 6, 11);
        this.derrotaIzquierda = new Animacion(imagenes.derrotaIzquierda, 550, 50, 6, 11);
    }

    setBattleTroops(attackerTroops, defenderTroops) {
        this.attackerTroops = attackerTroops;
        this.defenderTroops = defenderTroops;
        this.ratio = this.attackerTroops / this.defenderTroops;
    }

    dibujar() {

    }
}
