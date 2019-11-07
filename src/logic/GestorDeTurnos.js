class GestorDeTurnos {

    constructor(gestorDeUnidades, playerOrder) {
        this.playerOrder = playerOrder;
        this.listPos = 0;
        this.jugadorActual = this.playerOrder[this.listPos];
        this.turnosCount = 0;
        this.gestorDeUnidades = gestorDeUnidades;
        this.gestorDaDados = new GestorDeDados();
    }

    changePlayer() {
        this.listPos++;
        if (this.listPos === this.playerOrder.length) {
            this.listPos = 0;
        }
        this.jugadorActual = this.playerOrder[this.listPos];
        this.turnosCount++;
    }

    play(attack, otherPlayer, dicesAttacker, dicesDefender) {
        // Suma inicial del turno para unidades a colocar en el tablero
        let playerPoints = this.jugadorActual.calculateTotalPoints();
        let playerTerritoriesCount = this.jugadorActual.getConqueredTerritoriesCount();
        let unitsToAdd = this.gestorDeUnidades.calculateUnitsToBeAdded(playerPoints, playerTerritoriesCount);

        // Si se ataca, se consume el turno
        if (attack) {
            let toSubstract = this.gestorDaDados.play(dicesAttacker, dicesDefender);
            this.jugadorActual.substractUnits(toSubstract[0]);
            this.otherPlayer.substractUnits(toSubstract[1]);
            if (this.jugadorActual.totalUnits <= 1) {
                console.log("Atacante pierde");
                this.changePlayer();
            } else if (this.otherPlayer.totalUnits <= 0) {
                console.log("Defensor pierde");
                this.jugadorActual.conquestProvince(otherPlayer.provinceDefended);
                this.changePlayer();
            }
        } else {
            // recolocación de unidades a provincias con comunicación directa
        }
    }
}
