class GestorDeTurnos {

    constructor(gestorDeTerritorios, gestorDeUnidades, playerOrder, cartelTurno, summary) {
        this.playerOrder = playerOrder;
        this.listPos = 0;
        this.jugadorActual = this.playerOrder[this.listPos];
        this.turnosCount = 0;
        this.gestorDeUnidades = gestorDeUnidades;
        this.gestorDeDados = new GestorDeDados();
        this.gestorDeTextos = new GestorDeTextos(summary);
        this.cartelTurno = cartelTurno;
        this.gestorDeTextos.writeTurnAction(this.jugadorActual.teamCode, "Your turn");
        this.cartelTurno.valor = this.jugadorActual.teamCode;
    }

    getCurrentPlayer() {
        return this.jugadorActual;
    }

    changePlayer() {
        this.listPos++;
        if (this.listPos === this.playerOrder.length) {
            this.listPos = 0;
        }
        this.jugadorActual = this.playerOrder[this.listPos];
        this.turnosCount++;
        this.cartelTurno.valor = this.jugadorActual.teamCode;
        this.gestorDeTextos.writeTurnAction(this.jugadorActual.teamCode, "Your turn");
    }

    play(attack, from, to, otherPlayer, dicesAttacker, dicesDefender) {
        // Suma inicial del turno para unidades a colocar en el tablero
        let playerPoints = this.jugadorActual.calculateTotalPoints();
        let playerTerritoriesCount = this.jugadorActual.getConqueredTerritoriesCount();
        let unitsToAdd = this.gestorDeUnidades.calculateUnitsToBeAdded(playerPoints, playerTerritoriesCount);

        // Bonus por tipo de clima
        let bonusAttacker = this.jugadorActual.climateBonus === from.climate ? 1 : 0;
        let bonusDefender = this.otherPlayer.climateBonus === to.climate ? 1 : 0;

        /* ⚠⚠⚠
           REVISAR ESTA LÓGICA, USAR LOS MÉTODOS DE GESTOR DE TERRITORIOS Y DEMÁS
                - Se podría quitar "otherPlayer" y sacarlo todo de "to" que es la
                  provinicia del otro jugador
                - Lo mismo con "this.jugadorActual" y "from"
           ⚠⚠⚠
         */

        // Si se ataca, se consume el turno
        if (attack) {
            let toSubstract = this.gestorDeDados.play(dicesAttacker, dicesDefender, bonusAttacker, bonusDefender);
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
            // farmeo, consume turno
            if (to.hasFarm[0] && to.owner === this.jugadorActual.code) {
                console.log("Farmeando...");
                this.jugadorActual.totalUnits += to.hasFarm[1];
                this.changePlayer();
            } else {
                // recolocación de unidades a provincias con comunicación directa
            }
        }
    }
}
