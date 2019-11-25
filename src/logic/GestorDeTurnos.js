class GestorDeTurnos {

    constructor(gestorDeTerritorios, gestorDeUnidades, gestorDeTextos, playerOrder, cartelTurno) {
        this.playerOrder = playerOrder;
        this.listPos = 0;
        this.jugadorActual = this.playerOrder[this.listPos];
        this.turnosCount = 0;
        this.gestorDeUnidades = gestorDeUnidades;
        this.gestorDeDados = new GestorDeDados();
        this.gestorDeTextos = gestorDeTextos;
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

        // Turn Base
        // Suma inicial del turno para unidades a colocar en el tablero
        let playerPoints = this.jugadorActual.calculateTotalPoints();
        let playerTerritoriesCount = this.jugadorActual.getConqueredTerritoriesCount();
        let unitsToAdd = this.gestorDeUnidades.calculateUnitsToBeAdded(playerPoints, playerTerritoriesCount);

        /* ⚠⚠⚠ TODO
            Falta colocar las unidades
           ⚠⚠⚠
         */

    }

    attack(provinceA, provinceB, troopsToSend) {
        /* ⚠⚠⚠ TODO
            Se pueden usar callbacks de la UI para mostrar el progreso
           ⚠⚠⚠
         */

        // Cálculo de los dados
        let diceA = 2;
        let diceB = 1;

        if(provinceA.units > 20)
            diceA = 3;
        if(provinceB.units > 20)
            diceB = 2;

        // Bonus por tipo de clima
        let bonusAttacker = this.jugadorActual.climateBonus === provinceA.climate ? 1 : 0;
        let bonusDefender = provinceB.owner.climateBonus === provinceB.climate ? 1 : 0;

        // Simular tirada de dados
        let toSubstract = this.gestorDeDados.play(diceA, diceB, bonusAttacker, bonusDefender);

        // Movimientos tropas
        this.jugadorActual.substractUnits(toSubstract[0]);
        provinceB.owner.substractUnits(toSubstract[1]);

        // Resultado
        if (this.jugadorActual.totalUnits <= 1) {
            console.log("Atacante pierde");
            this.changePlayer();
        } else if (provinceB.owner.totalUnits <= 0) {
            console.log("Defensor pierde");
            this.jugadorActual.conquestProvince(provinceB);
            // Movimiento
            if(provinceA.units > troopsToSend){
                provinceA.units = provinceA.units-troopsToSend;
                provinceB.units = troopsToSend;
            }
            this.changePlayer();
        }
    }

    move(provinceA, provinceB, troopsToSend) {
        provinceA.units -= troopsToSend;
        provinceB.units += troopsToSend;
        this.changePlayer();
    }

    farm(player, tile) {
        // Farm action
        console.log("Farmeando...");
        this.jugadorActual.totalUnits += tile.province.hasFarm[1];
        tile.province.units += tile.province.hasFarm[1];
        this.changePlayer();
    }
}
