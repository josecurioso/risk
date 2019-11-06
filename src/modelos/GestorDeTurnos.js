class GestorDeTurnos {

    constructor(gestorDeUnidades) {
        this.jugadorActual = null;
        this.turnosCount = 0;
        this.gestorDeUnidades = gestorDeUnidades;
    }

    changePlayer(jugador) {
        this.jugadorActual = jugador;
        this.turnosCount++;
    }

    play() {
        let playerPoints = this.jugadorActual.calculateTotalPoints();
        let playerTerritoriesCount = this.jugadorActual.getConqueredTerritoriesCount();
        let unitsToAdd = this.gestorDeUnidades.calculateUnitsToBeAdded(playerPoints, playerTerritoriesCount);
    }
}
