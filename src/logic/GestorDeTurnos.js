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
        this.gestorDeTextos.writeTurnAction(this.jugadorActual, "Your turn");
        this.updateCartel();
    }

    getCurrentPlayer() {
        return this.jugadorActual;
    }

    updateCartel() {
        this.cartelTurno.valor = this.jugadorActual.teamCode;
        this.cartelTurno.colorFont = this.jugadorActual.fillColor;
    }

    changePlayer() {
        this.listPos++;
        if (this.listPos === this.playerOrder.length) {
            this.listPos = 0;
        }
        this.jugadorActual = this.playerOrder[this.listPos];
        this.turnosCount++;
        this.updateCartel();
        this.gestorDeTextos.writeTurnAction(this.jugadorActual, "Your turn");
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

        this.gestorDeTextos.writeTurnAction(provinceA.owner, "Attacking " + provinceB.owner + " from " + provinceA.code + " to " + provinceB.code);

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
            this.gestorDeTextos.writeTurnAction(provinceA.owner, "Has lost!");
            this.changePlayer();
        } else if (provinceB.owner.totalUnits <= 0) {
            this.gestorDeTextos.writeTurnAction(provinceA.owner, "Has won!");
            this.jugadorActual.conquestProvince(provinceB);
            // Movimiento
            this.move(provinceA, provinceB, troopsToSend);
            this.changePlayer();
        }
    }

    move(provinceA, provinceB, troopsToSend) {
        this.gestorDeTextos.writeTurnAction(provinceA.owner, "Moving " + troopsToSend + "u from " + provinceA.code + " to " + provinceB.code);
        if(provinceA.units - troopsToSend <= 0) {
            provinceB.setUnits(provinceB.units + ((troopsToSend-provinceA.units)-1));
            provinceA.setUnits(1);
        }else {
            provinceA.setUnits(provinceA.units - troopsToSend);
            provinceB.setUnits(provinceB.units + troopsToSend);
        }
        //this.changePlayer();  No se cambia de turno al mover tropas pero se bloquea el ataque
    }

    farm(player, tile) {
        // Farm action
        this.gestorDeTextos.writeTurnAction(player, "Farming " + tile.province.hasFarm[1] + "... " + tile.province.hasFarm[2] + "u");
        this.jugadorActual.totalUnits += tile.province.hasFarm[2];
        tile.province.setUnits(tile.province.units + tile.province.hasFarm[2]);
        tile.province.hasFarm[0] = false;
        tile.province.locateFarm();
        this.changePlayer();
    }

    initialTurnDraw() {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        let pKeys = Object.keys(provincias);
        let ppp = Math.floor(pKeys.length / this.playerOrder.length);
        let reparto = [];
        for (let i = 0; i < this.playerOrder.length; i++) {
            reparto[i] = ppp;
        }
        console.log(reparto);

        let currentI = 0;
        while (reparto.reduce(reducer) !== 26) {
            reparto[currentI]++;
            currentI++;
            if (currentI >= this.playerOrder.length) {
                currentI = 0;
            }
        }

        for (let i = 0; i < reparto.length; i++) {
            let assigned = [];
            while (reparto[i] > 0) {
                let pToAssign = provincias[pKeys[Math.floor(Math.random() * pKeys.length)]];
                while (pToAssign.owner !== null) {
                    pToAssign = provincias[pKeys[Math.floor(Math.random() * pKeys.length)]];
                }
                pToAssign.owner = this.playerOrder[i];
                this.playerOrder[i].conqueredTerritories.push(pToAssign);
                assigned.push(pToAssign);
                reparto[i]--;
            }
            let aux = "";
            for (let i = 0; i < assigned.length; i++) {
                if (i + 1 !== assigned.length) {
                    aux += assigned[i].code + ",";
                } else {
                    aux += assigned[i].code;
                }
            }
            this.gestorDeTextos.writeTurnAction(this.playerOrder[i], "[" + aux + "]");
        }
    }
}
