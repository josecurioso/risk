class GestorDeTurnos {

    constructor(gestorDeTerritorios, gestorDeUnidades, gestorDeTextos, gestorDeEventos, playerOrder, cartelTurno) {
        this.playerOrder = playerOrder;
        this.listPos = 0;
        this.jugadorActual = this.playerOrder[this.listPos];
        this.turnosCount = 0;
        this.gestorDeUnidades = gestorDeUnidades;
        this.gestorDeDados = new GestorDeDados();
        this.gestorDeTextos = gestorDeTextos;
        this.gestorDeTerritorios = gestorDeTerritorios;
        this.gestorDeEventos = gestorDeEventos;
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
        this.gestorDeEventos.randomEvents(this.jugadorActual);

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

        this.gestorDeTextos.writeTurnAction(provinceA.owner.smallTeamCode, "Attacking " + provinceB.owner + " from " + provinceA.code + " to " + provinceB.code);

        // Cálculo de los dados
        let diceA = 2;
        let diceB = 1;

        if (provinceA.units > 20)
            diceA = 3;
        if (provinceB.units > 20)
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
            this.gestorDeTextos.writeTurnAction(provinceA.owner.smallTeamCode, "Has lost!");
            this.changePlayer();
        } else if (provinceB.owner.totalUnits <= 0) {
            this.gestorDeTextos.writeTurnAction(provinceA.owner.smallTeamCode, "Has won!");
            this.jugadorActual.conquestProvince(provinceB);
            // Movimiento
            if (provinceA.units > troopsToSend) {
                provinceA.units = provinceA.units - troopsToSend;
                provinceB.units = troopsToSend;
            }
            this.changePlayer();
        }
    }

    move(provinceA, provinceB, troopsToSend) {
        this.gestorDeTextos.writeTurnAction(provinceA.owner.smallTeamCode, "Moving " + troopsToSend + "u from " + provinceA.code + " to " + provinceB.code);
        provinceA.units -= troopsToSend;
        provinceB.units += troopsToSend;
        this.changePlayer();
    }

    farm(player, tile) {
        // Farm action
        this.gestorDeTextos.writeTurnAction(player.smallTeamCode, "Farming " + tile.province.hasFarm[1] + "... " + tile.province.hasFarm[2] + "u");
        this.jugadorActual.totalUnits += tile.province.hasFarm[1];
        tile.province.units += tile.province.hasFarm[1];
        tile.province.hasFarm[0] = false;
        tile.province.locateFarm();
        this.changePlayer();
    }

    initialTurnDraw() {
        let p = this.gestorDeTerritorios.provincias;
        let pKeys = Object.keys(p);
        let ppp = Math.round(pKeys.length / this.playerOrder.length);
        let odd = ppp % 2 !== 0;
        for (let i = 0; i < this.playerOrder.length; i++) {
            let assignedC = 0;
            let assigned = [];
            if (odd && i + 1 === this.playerOrder.length) {
                assignedC++;
            }
            while (assignedC < ppp) {
                let pToAssign = p[pKeys[Math.floor(Math.random() * pKeys.length)]];
                while (pToAssign.owner !== null) {
                    pToAssign = p[pKeys[Math.floor(Math.random() * pKeys.length)]];
                }
                pToAssign.owner = this.playerOrder[i].teamCode;
                assigned.push(pToAssign);
                assignedC++;
            }
            let aux = "";
            for(let i = 0; i < assigned.length; i++) {
                if(i + 1 !== assigned.length) {
                    aux += assigned[i].code + ",";
                } else {
                    aux += assigned[i].code;
                }
            }
            this.gestorDeTextos.writeTurnAction(this.playerOrder[i].smallTeamCode, "[" + aux + "]");
        }
    }
}
