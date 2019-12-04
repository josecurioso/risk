class GestorDeUnidades {

    constructor(continentes, provincias, minUnits) {
        this.continentes = continentes;
        this.provincias = provincias;
        this.totalProvincias = Object.keys(provincias).length;
        this.unitsRatioMap = this.calculateRatioOfUnitsPerAmmountOfProvincias(minUnits);
    }

    calculateContinentBonusForPlayer(player) {
        let playerP = player.conqueredTerritories;
        let continentsToAdd = [];
        for (let key in continentes) {
            if (continentes.hasOwnProperty(key)) {
                let count = playerP.filter(p => p.tiles[0].continente.code === key);
                if (continentes[key].provincias.length === count.length) {
                    continentsToAdd.push(key);
                }
            }
        }
        return continentsToAdd.reduce(function (accumulator, continent) {
            for (let key in continentes) {
                if (continentes.hasOwnProperty(key)) {
                    if (key === continent) {
                        return accumulator + continentes[key].bonus;
                    }
                }
            }
        }, 0);
    }

    calculateRatioOfUnitsPerAmmountOfProvincias(minUnits) {
        let unitsRatioMap = new Map();
        let max = this.totalProvincias;
        let min = Math.round(this.totalProvincias / 4);
        let step = 0;
        for (let i = 0; i < max; i++) {
            if (i <= min) {
                unitsRatioMap.set(i, minUnits);
            } else {
                if (step >= 2) {
                    step = 0;
                    minUnits++;
                }
                step++;
                unitsRatioMap.set(i, minUnits);
            }
        }
        return unitsRatioMap;
    }

    calculateUnitsToBeAdded(playerTerritories) {
        return this.unitsRatioMap.get(playerTerritories);
    }
}
