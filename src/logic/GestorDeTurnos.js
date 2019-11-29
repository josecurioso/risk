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
        let playerTerritoriesCount = this.jugadorActual.getConqueredTerritoriesCount();
        let unitsToAdd = this.gestorDeUnidades.calculateUnitsToBeAdded(playerTerritoriesCount);

        console.log("P-TERR-COUNT: " + playerTerritoriesCount + " - U: " + unitsToAdd);

        // Colocar las unidades en provincia aleatoria
        let rdP = this.jugadorActual.conqueredTerritories[Math.floor(Math.random() * this.jugadorActual.getConqueredTerritoriesCount())];
        this.gestorDeTextos.writeTurnAction(this.jugadorActual, "Adding " + unitsToAdd + "u in province " + rdP.code);
        this.jugadorActual.incrementUnits(unitsToAdd, rdP);
    }

    attack(provinceA, provinceB, troopsToSend) {
        this.gestorDeTextos.writeTurnAction(provinceA.owner, "Attacking " + provinceB.owner.teamCode + " from " + provinceA.code + " to " + provinceB.code);

        // Cálculo de los dados
        let dicesAttk = this.calculateDicesForAttacker(provinceA.units);
        let dicesDef = this.calculateDicesForDefender(provinceB.units);

        // Bonus por tipo de clima
        let bonusAttacker = this.jugadorActual.climateBonus === provinceA.climate ? 1 : 0;
        let bonusDefender = provinceB.owner.climateBonus === provinceB.climate ? 1 : 0;

        // Simular tirada de dados
        let round = this.gestorDeDados.play(dicesAttk, dicesDef, bonusAttacker, bonusDefender);
        let toSubstract = round.get("lostUnits");
        let throwA = round.get("throwsAttacker");
        let throwD = round.get("throwsDefender");

        // Movimientos tropas
        let hasLost = false;
        if (provinceA.units - toSubstract[0] >= 1) {
            this.jugadorActual.substractUnits(toSubstract[0], provinceA);
        } else {
            hasLost = true;
        }
        provinceB.owner.substractUnits(toSubstract[1], provinceB);

        // Resultado
        if (hasLost) {
            this.gestorDeTextos.writeTurnAction(provinceA.owner, "No more units to attack from " + provinceA.code);
            return 1;
        } else if (provinceB.units <= 0) {
            this.gestorDeTextos.writeTurnAction(provinceA.owner, "You've conquered province " + provinceB.code);
            provinceB.owner.lossProvince(provinceB);
            this.jugadorActual.conquestProvince(provinceB);
            // Movimiento
            this.move(provinceA, provinceB, troopsToSend - toSubstract[0]);
            return 1;
        } else {
            this.gestorDeTextos.writeGameAction("Throw: Attk(" + throwA[0] + ", " + throwA[1] + ", " + throwA[2] + ") - Def(" + throwD[0] + ", " + throwD[1] + ")");
            this.gestorDeTextos.writeGameAction("Result: Attk(" + provinceA.code + ", -" + toSubstract[0] + "u) - Def(" + provinceB.code + ", -" + toSubstract[1] + "u)");
            return 2;
        }
    }

    move(provinceA, provinceB, troopsToSend) {
        this.gestorDeTextos.writeTurnAction(provinceA.owner, "Moving " + troopsToSend + "u from " + provinceA.code + " to " + provinceB.code);
        if (provinceA.units - troopsToSend <= 0) {
            provinceB.setUnits(provinceB.units + ((troopsToSend - provinceA.units) - 1));
            provinceA.setUnits(1);
        } else {
            provinceA.setUnits(provinceA.units - troopsToSend);
            provinceB.setUnits(provinceB.units + troopsToSend);
        }
        // this.changePlayer();  No se cambia de turno al mover tropas pero se bloquea el ataque
    }

    farm(player, tile) {
        // Farm action
        this.gestorDeTextos.writeTurnAction(player, "Farming " + tile.province.hasFarm[1] + "... " + tile.province.hasFarm[2] + "u");
        this.jugadorActual.incrementUnits(tile.province.hasFarm[2], tile.province);
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

        this.gestorDeTextos.writeGameAction("Province draw");

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

    calculateDicesForAttacker(units) {
        console.log("att-units-dice: " + units);
        if (units > 3) {
            return 3;
        } else if (units > 2) {
            return 2;
        } else {
            return 1;
        }
    }

    calculateDicesForDefender(units) {
        return units >= 2 ? 2 : 1;
    }
}
